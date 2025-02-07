import { Fragment } from 'react';
import ToolTip from './ToolTip';

type Props = {
  address: string;
  title: string;
  trim?: number;
  colorClassAddress?: string;
  //TODO custom more props as badges, etc
};

export default function SectionHeader({
  address,
  trim,
  title,
  colorClassAddress,
  //TODO custom more props as badges, etc
}: Props) {
  return (
    <Fragment>
      <h1 className="flex gap-3 items-center text-4xl mt-[40px]">
        {title.toUpperCase()}
      </h1>
      <div className="text-white-400 mt-6 text-lg">
        {'Contract addess'}
        <span className="ml-1">
          <ToolTip
            className={`${colorClassAddress}`}
            text={address}
            trim={trim ?? 0}
          />
        </span>
      </div>
    </Fragment>
  );
}
