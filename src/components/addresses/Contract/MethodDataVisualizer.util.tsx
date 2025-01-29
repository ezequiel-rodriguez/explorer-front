import CIMAccordion from "@/components/ui/CIMAccordion"
import { ParamType } from "ethers";
import { FunctionFragment, FragmentType } from "ethers"

// Rootstock fragment formatting

// Include internalType prop
interface ExtendedInput extends ParamType {
  internalType?: string;
}

// Include "receive" fragment type
type ExtendedFragmentType = FragmentType | 'receive';

// Rootstock Function Fragment
export interface RSKFunctionFragment extends Omit<FunctionFragment, 'type'> {
  inputs: ExtendedInput[];
  type: ExtendedFragmentType;
}

export default function MethodDataVisualizer ({ method }: { method: RSKFunctionFragment }) {
  const Title = () => {
    return (
      <div className='flex gap-1'>
        <span className='text-green-500'>Method data</span>
        <span>({method.name})</span>
      </div>
    )
  }

  return (
    <CIMAccordion title={<Title />}>
      <div className='p-2'>
        <p>Name: {method.name}</p>
        <p>Type: {method.type}</p>
        <p>State Mutability: {method.stateMutability}</p>
        {
          method.inputs.length && (
            <div>
              <p>Inputs ({method.inputs.length}):</p>
              {
                method.inputs.map((input, i: number) => (
                  <div key={i} className="flex gap-1">
                    <span>--- {i + 1}.</span>
                    <span className="text-green-500">{input.name}</span>
                    <span>| type: {input.type}</span>
                    {/* {input.indexed && <span>| indexed: {input.indexed}</span>} // Perhaps this is only for Event Fragments (90% sure) */}
                    {input.internalType && <span>| internalType: {input.internalType}</span>}
                  </div>
                ))
              }
            </div>
          )
        }
        {
          method.outputs.length && (
            <div>
              <p className='text-xl'>Outputs ({method.outputs.length})</p>
              {
                method.outputs.map((output: { type: string }, i: number) => (
                  <div key={i}>
                    <p>--- {i + 1}. {output.type}</p>
                  </div>
                ))
              }
            </div>
          )
        }
      </div>
    </CIMAccordion>
  )
}