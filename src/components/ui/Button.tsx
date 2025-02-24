'use client';

type props = {
  className?: string;
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
  iconRight?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: 'primary' | 'secondary' | 'icon' | 'outline' | 'small';
  disabled?: boolean;
};

function Button({
  onClick,
  className,
  label,
  icon,
  iconRight,
  type = 'primary',
  disabled = false,
}: props) {
  const BTN_TYPE = {
    icon: 'bg-btn-secondary h-9 px-4 hover:bg-gray-500',
    primary: 'px-6 hover:bg-gray-700 hover:text-white',
    small: 'px-3 hover:bg-gray-700 hover:text-white text-xs',
    secondary:
      'px-4 bg-btn-secondary hover:bg-gray-700 disabled:cursor-not-allowed disabled:hover:bg-btn-secondary text-gray-400 hover:text-gray-400',
    outline:
      'bg-primary hover:border-white text-white font-bold !rounded-3xl border w-[110px] after:w-[110px] after:h-10 after:rounded-3xl after:mt-2 after:ml-1 after:-z-10 after:absolute after:border',
  };
  return (
    <button
      className={`${className} ${BTN_TYPE[type]} hover:border-transparent text-sm h-10 rounded-xl flex items-center justify-center gap-3`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {label}
      {iconRight}
    </button>
  );
}

export default Button;
