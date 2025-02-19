import { ROUTER } from '@/common/constants';

const routeStyles = {
  [ROUTER.HOME]: {
    color: 'brand-orange',
  },
  [ROUTER.BLOCKS.INDEX]: {
    color: 'brand-green',
  },
  [ROUTER.TXS.INDEX]: {
    color: 'brand-purple',
  },
  [ROUTER.ITXS.INDEX]: {
    color: 'brand-purple',
  },
  [ROUTER.ADDRESSES.INDEX]: {
    color: 'brand-pink',
  },
  [ROUTER.TOKENS.INDEX]: {
    color: 'brand-cyan',
  },
  [ROUTER.EVENTS.INDEX]: {
    color: 'brand-purple',
  },
};

const defaultColor = 'white-100';

/**
 * Returns a list of Tailwind classes based on the current route.
 *
 * @param {string} pathname - The current browser path.
 * @param {string[]} types - List of Tailwind class prefixes to apply (e.g., ['text', 'bg', 'border']).
 * @returns {string} - Generated classes, e.g., "text-brand-orange bg-brand-orange border-brand-orange".
 */
export function getRouteStyles(pathname: string, types: string[]) {
  const orderedRoutes = Object.keys(routeStyles).sort(
    (a, b) => b.length - a.length,
  );
  const matchedRoute = orderedRoutes.find((route) =>
    pathname.startsWith(route),
  );

  const color = matchedRoute ? routeStyles[matchedRoute].color : defaultColor;

  return types.map((type) => `${type}-${color}`).join(' ');
}
