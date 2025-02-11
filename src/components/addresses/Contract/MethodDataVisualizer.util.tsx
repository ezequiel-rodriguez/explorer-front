import {
  InteractiveMethod,
  RSKFunctionFragment,
} from '@/common/utils/contractInteractions';
import CIMAccordion from '@/components/ui/CIMAccordion';

export default function MethodDataVisualizer({
  method,
  children,
}: {
  method: RSKFunctionFragment;
  children?: React.ReactNode;
}) {
  const Title = () => {
    return (
      <div className="flex gap-1">
        <span className="text-green-500">Method data</span>
        <span>({method.name})</span>
      </div>
    );
  };

  return (
    <CIMAccordion title={<Title />}>
      <div className="p-2">
        <p>Name: {method.name}</p>
        <p>Type: {method.type}</p>
        <p>State Mutability: {method.stateMutability}</p>
        {method.inputs.length && (
          <div>
            <p>Inputs ({method.inputs.length}):</p>
            {method.inputs.map((input, i: number) => (
              <div key={i} className="flex gap-1">
                <span>--- {i + 1}.</span>
                <span className="text-green-500">{input.name}</span>
                <span>| type: {input.type}</span>
                {/* {input.indexed && <span>| indexed: {input.indexed}</span>} // Perhaps this is only for Event Fragments (90% sure) */}
                {input.internalType && (
                  <span>| internalType: {input.internalType}</span>
                )}
              </div>
            ))}
          </div>
        )}
        {method.outputs.length && (
          <div>
            <p className="text-xl">Outputs ({method.outputs.length})</p>
            {method.outputs.map((output: { type: string }, i: number) => (
              <div key={i}>
                <p>
                  --- {i + 1}. {output.type}
                </p>
              </div>
            ))}
          </div>
        )}
        {children}
      </div>
    </CIMAccordion>
  );
}

export function InteractiveMethodDataVisualizer({
  interactiveMethod,
  className,
}: {
  interactiveMethod: InteractiveMethod;
  className?: string;
}) {
  const { method, signatureData, state } = interactiveMethod;
  return (
    <div className={className}>
      <CIMAccordion title={`Interactive data (${method.name})`}>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white mb-2">
            Signature Data
          </h3>
          <div className="mb-4">
            <p className="text-sm text-gray-300">
              <span className="font-bold text-gray-400">Name:</span>{' '}
              {signatureData.name}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-bold text-gray-400">Params:</span>{' '}
              {signatureData.params.join(', ')}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-bold text-gray-400">Signature:</span>{' '}
              {signatureData.signature}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-bold text-gray-400">Selector:</span>{' '}
              {signatureData.selector}
            </p>
          </div>

          <h3 className="text-lg font-semibold text-white mb-2">State</h3>
          <div className="mb-4">
            <h4 className="text-md font-bold text-gray-400 mb-1">
              {' '}
              === Inputs ==={' '}
            </h4>
            <div className="space-y-2">
              {state.inputs.length === 0 && (
                <p className="text-sm text-gray-300">(none)</p>
              )}
              {state.inputs.map((input, index) => (
                <p key={index} className="text-sm text-gray-300">
                  <span className="text-gray-400">
                    {method.inputs[index].name || `Input ${index + 1}`}:
                  </span>{' '}
                  {input}
                </p>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-bold text-gray-400 mb-1">
              {' '}
              === Outputs ==={' '}
            </h4>
            <div className="space-y-2">
              {state.outputs.length === 0 && (
                <p className="text-sm text-gray-300">(none)</p>
              )}
              {state.outputs.map((output, index) => (
                <p key={index} className="text-sm text-gray-300">
                  <span className="text-gray-400">
                    {method.outputs[index].name || `Output ${index + 1}`}:
                  </span>{' '}
                  {output}
                </p>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-md font-semibold text-gray-400 mb-1">
              {' '}
              === Message ==={' '}
            </h4>
            <p className="text-sm text-gray-300">
              <span className="font-bold text-gray-400">Content:</span>{' '}
              {state.message.content}
            </p>
            <p className="text-sm text-gray-300">
              <span className="font-bold text-gray-400">Style:</span>{' '}
              {state.message.style}
            </p>
          </div>
        </div>
      </CIMAccordion>
    </div>
  );
}
