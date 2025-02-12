import { usePathname } from 'next/navigation';
import Button from '../ui/Button';
import SearchInput from './search/SearchInput';
import RskLogo from './RskLogo';
import { ExternalLinkIcon } from '@/common/icons';

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-between items-center">
      <RskLogo className="flex md:hidden" />
      {pathname !== '/' && <SearchInput />}
      <div className="ml-auto">
        <Button
          className="flex-row-reverse"
          label="TESTNET"
          type="outline"
          icon={<ExternalLinkIcon />}
        />
      </div>
    </nav>
  );
}

export default Navbar;
