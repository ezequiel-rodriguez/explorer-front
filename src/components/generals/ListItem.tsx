import { InfoIcon } from '@/common/icons';
import ToolTip from '../ui/ToolTip';

type props = {
  title: string;
  info?: string;
  value?: React.ReactNode | string;
  className?: string;
  type?: 'tooltip' | 'normal' | 'simple';
  text?: string;
  trim?: number;
};
function ListItem({
  title,
  value,
  className,
  type = 'normal',
  text,
  trim = 0,
}: props) {
  if (!value) return;
  return (
    <div
      className={`sm:flex items-center w-full ${type === 'simple' ? 'py-1' : 'py-3'}`}
    >
      <div className="w-full sm:w-3/12 flex items-center gap-2">
        {type !== 'simple' && (
          <div>
            <InfoIcon />
          </div>
        )}
        {title}
      </div>
      <div
        className={`w-full sm:w-9/12 text-white-100 break-words ${className}`}
      >
        {type === 'tooltip' ? (
          <ToolTip
            className="!px-0"
            text={(value as string) || text}
            trim={trim}
          />
        ) : (
          value
        )}
      </div>
    </div>
  );
}

export default ListItem;
