'use client';

import Card from '@/components/ui/Card';
import { DropDownOption } from '@/components/ui/FormDropdown';
import { useEffect, useState } from 'react';

import { VerificationMethods } from '@/constants/verificationConstants';
import { IBuildStructure } from '@/common/interfaces/ISolc';
import { fetchData, fetchDataExt } from '@/services/api';
import { ROUTER } from '@/common/constants';
import GeneralDetailsSection from '@/components/verify/GeneralDetailsSection';
import AdvancedDetailsSection from '@/components/verify/AdvancedDetailsSection';
import ConstructorArgumentsSection from '@/components/verify/ConstructorArgumentsSection';
import ContractLibrariesSection from '@/components/verify/ContractLibrariesSection';
import Button from '@/components/ui/Button';
import {
  BuilderRequestParams,
  isFilenameValid,
  submitRequest,
  validateForm,
} from '@/components/verify/VerifierProcessor';
import { useAddressDataContext } from '@/context/AddressContext';
import { IVerificationResponse } from '@/common/interfaces/IVerificationResponse';
import VerificationModal from '@/components/verify/VerificationModal';

export type Errors = {
  contractName: string;
  files: string;
  optimizationValue: string;
};

export default function Page() {
  const { address } = useAddressDataContext();
  const [isNightly, setIsNightly] = useState(false);
  const [optimizationOn, setOptimizationOn] = useState(false);
  const [abiEncoded, setAbiEncoded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contractName, setContractName] = useState<string>('');
  const [optimizationValue, setOptimizationValue] = useState<string>('');
  const [constructorArgs, setConstructorArgs] = useState<string>('');
  const [files, setFiles] = useState<File[] | undefined>([]);
  const [responseVerification, setResponseVerification] = useState<
    IVerificationResponse | undefined
  >(undefined);
  const [filteredCompilers, setFilteredCompilers] = useState<DropDownOption[]>(
    []
  );
  const [availableEvmVersions, setAvailableEvmVersions] = useState<
    DropDownOption[]
  >([]);
  const [verifMethod, setVerifMethod] = useState<DropDownOption>(
    VerificationMethods[0]
  );
  const [compilerVersion, setCompilerVersion] = useState<
    DropDownOption | undefined
  >(undefined);
  const [evmVersion, setEVMVersion] = useState<DropDownOption | undefined>(
    undefined
  );
  const [solcVersions, setSolcVersions] = useState<IBuildStructure | undefined>(
    undefined
  );
  const [errors, setErrors] = useState<Errors>({
    contractName: '',
    files: '',
    optimizationValue: '',
  });
  const [libraries, setLibraries] = useState<
    { libraryName: string; libraryAddress: string }[]
  >([
    {
      libraryName: '',
      libraryAddress: '',
    },
  ]);

  useEffect(() => {
    fetchSolcVersions();
    fetchEVMVersions();
  }, []);
  useEffect(() => {
    setFiles(undefined);
    setErrors({
      contractName: '',
      files: '',
      optimizationValue: '',
    });
  }, [verifMethod]);
  useEffect(() => {
    if (files && files.length > 0 && contractName !== '') {
      const isValid = isFilenameValid(contractName, files);
      if (!isValid) {
        setErrors((prev) => ({
          ...prev,
          contractName: 'File(s) name must match the contract name.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, contractName: '' }));
      }
    }
  }, [files]);

  const fetchSolcVersions = async (): Promise<IBuildStructure | undefined> => {
    try {
      const response = await fetchDataExt<IBuildStructure>(
        `${ROUTER.VERIFY.GET_SOLC}`
      );
      const data = response;
      if (response) {
        setSolcVersions(data as IBuildStructure);
      }
    } catch (error) {
      console.log('error', error);
      return undefined;
    }
  };
  const fetchEVMVersions = async (): Promise<string[] | undefined> => {
    try {
      const response = await fetchData<string[]>(`${ROUTER.VERIFY.GET_EVM}`);
      const data = response as unknown as string[];
      const formatedData = data.map((item) => ({ key: item, title: item }));
      setEVMVersion(formatedData[0]);
      setAvailableEvmVersions(formatedData);
    } catch (error) {
      console.log('error', error);
      return undefined;
    }
  };
  useEffect(() => {
    if (solcVersions?.releases) {
      if (isNightly) {
        const sortedBuilds = [...solcVersions.builds].sort((a, b) => {
          const parseVersion = (version: string) =>
            version.split('.').map(Number);

          const [majorA, minorA, patchA] = parseVersion(a.version);
          const [majorB, minorB, patchB] = parseVersion(b.version);

          if (majorA !== majorB) return majorB - majorA;
          if (minorA !== minorB) return minorB - minorA;
          return (patchB || 0) - (patchA || 0);
        });

        const filteredCompilers = sortedBuilds.map((build, index) => ({
          key: `${build.version}-${build.build}${index}`,
          title: `${build.version}-${build.build}`,
        }));
        setFilteredCompilers(filteredCompilers);
        setCompilerVersion(filteredCompilers[0]);
        return;
      }
      const limitVersion = process.env.NEXT_PUBLIC_LTS_SOL_VERSION || '0.8.24';
      const filteredCompilers = filterReleasesByVersion(
        solcVersions?.releases,
        limitVersion
      );
      setFilteredCompilers(filteredCompilers);
      setCompilerVersion(filteredCompilers[0]);
    }
  }, [solcVersions, isNightly]);
  const filterReleasesByVersion = (
    releases: { [key: string]: string },
    versionLimit: string
  ): DropDownOption[] => {
    const isVersionLessThan = (v1: string, v2: string): boolean => {
      const [major1, minor1, patch1] = v1.split('.').map(Number);
      const [major2, minor2, patch2] = v2.split('.').map(Number);

      if (major1 !== major2) return major1 < major2;
      if (minor1 !== minor2) return minor1 < minor2;
      return (patch1 || 0) < (patch2 || 0);
    };

    return Object.entries(releases)
      .filter(([version]) => isVersionLessThan(version, versionLimit))
      .map(([key]) => ({ key, title: key }));
  };

  //Handle library section
  const handleAddLibrary = () => {
    setLibraries([...libraries, { libraryName: '', libraryAddress: '' }]);
  };

  const handleRemoveLibrary = (index: number) => {
    setLibraries(libraries.filter((_, i) => i !== index));
  };

  const handleLibraryChange = (
    index: number,
    field: 'libraryName' | 'libraryAddress',
    value: string
  ) => {
    const updatedLibraries = [...libraries];
    updatedLibraries[index][field] = value;
    setLibraries(updatedLibraries);
  };

  const handleFilenameChange = (fileName: string) => {
    if (files && files.length > 0) {
      const isValid = isFilenameValid(fileName, files);
      if (!isValid) {
        setErrors((prev) => ({
          ...prev,
          contractName: 'File(s) name must match the contract name.',
        }));
      } else {
        setErrors((prev) => ({ ...prev, contractName: '' }));
      }
    }
    setContractName(fileName);
  };

  //Submit verification section
  const handleSubmitVerification = async () => {
    try {
      const errors = await validateForm({
        contractName,
        files: files,
        optimizationOn,
        optimizationValue,
        verifMethod,
      });
      setErrors(errors);
      if (Object.values(errors).some((error) => error !== '') || !files) {
        return;
      }
      setIsLoading(true);
      setIsModalOpen(true);
      const builderRequestParams: BuilderRequestParams = {
        address: address!.address,
        optimizationOn,
        optimizationValue,
        evmVersion: evmVersion?.key,
        contractName,
        compilerVersion: compilerVersion?.key ?? '',
        files,
        libraries,
        constructorArgs,
        abiEncoded,
        verifMethod,
      };
      const response = await submitRequest(builderRequestParams);
      console.log('response', response);
      setResponseVerification(response);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-2 items-center flex flex-col">
      <div className="p-4 rounded-lg w-4/5">
        <Card className="bg-secondary flex flex-col">
          <GeneralDetailsSection
            isNightly={isNightly}
            setIsNightly={setIsNightly}
            contractName={contractName}
            setContractName={handleFilenameChange}
            filteredCompilers={filteredCompilers}
            verifMethod={verifMethod}
            setVerifMethod={setVerifMethod}
            compilerVersion={compilerVersion}
            setCompilerVersion={setCompilerVersion}
            errorContractName={errors.contractName}
            errorFiles={errors.files}
            files={files}
            setFiles={setFiles}
          />
          {verifMethod === VerificationMethods[0] && (
            <AdvancedDetailsSection
              optimizationOn={optimizationOn}
              setOptimizationOn={setOptimizationOn}
              optimizationValue={optimizationValue}
              setOptimizationValue={setOptimizationValue}
              availableEvmVersions={availableEvmVersions}
              evmVersion={evmVersion}
              setEVMVersion={setEVMVersion}
              errorMessage={errors.optimizationValue}
            />
          )}
          <ConstructorArgumentsSection
            constructorArgs={constructorArgs}
            setConstructorArgs={setConstructorArgs}
            abiEncoded={abiEncoded}
            setAbiEncoded={setAbiEncoded}
          />
          {verifMethod === VerificationMethods[0] && (
            <ContractLibrariesSection
              libraries={libraries}
              handleAddLibrary={handleAddLibrary}
              handleRemoveLibrary={handleRemoveLibrary}
              handleLibraryChange={handleLibraryChange}
            />
          )}
          <div className="flex justify-end mt-4">
            <Button
              label={'Verify Contract'}
              onClick={handleSubmitVerification}
              type="brand"
            />
          </div>
        </Card>
        {isModalOpen && (
          <VerificationModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            responseVerification={responseVerification}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
