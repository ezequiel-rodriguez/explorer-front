interface AddressTooltipProps {
  address: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function AddressTooltip ({ address, position = 'top' }: AddressTooltipProps) {
  const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;

  const tooltipPositionClasses = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative flex items-center group">
      <span className="cursor-pointer text-sm">{shortAddress}</span>
      <div
        className={`absolute whitespace-nowrap bg-gray-700 text-[#b9b9b9] text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in ${tooltipPositionClasses[position]}`}
      >
        {address}
      </div>
    </div>
  );
};