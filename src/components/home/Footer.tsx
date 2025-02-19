import { DiscordIcon, GithubIcon, XIcon } from '@/common/icons';
import Link from 'next/link';

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full grid md:flex justify-between items-center p-6 bg-primary relative z-40 border-t border-t-line text-sm">
      <div className="order-2 mt-3 md:order-1">
        <div className="flex gap-2 items-center">
          <span>Built by</span>
          <span className="text-lg font-bold">RootstockLabs</span>
        </div>
        <div className="text-xs text-gray-400">
          Copyright &copy; {year} RoostockLabs. All rights reserved.
        </div>
      </div>
      <div className="flex gap-4 flex-wrap mt-3 order-1 md:order-2">
        <Link
          className="hover:underline"
          href="https://rootstock.io/"
          target="_blank"
        >
          About RootstockLabs
        </Link>
        <Link
          className="hover:underline"
          href="https://rootstock.io/contact/"
          target="_blank"
        >
          Help
        </Link>
        <Link
          className="hover:underline"
          href="https://rootstock.io/terms-conditions/"
          target="_blank"
        >
          Terms & Conditions
        </Link>
        <Link
          className="hover:underline"
          href="https://dev.rootstock.io/"
          target="_blank"
        >
          Documentation
        </Link>
      </div>
      <div className="flex gap-4 mt-6 order-3">
        <Link href="https://twitter.com/rootstock_io" target="_blank">
          <XIcon />
        </Link>
        <Link href="https://github.com/rsksmart" target="_blank">
          <GithubIcon />
        </Link>
        <Link href="https://discord.com/invite/rootstock" target="_blank">
          <DiscordIcon />
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
