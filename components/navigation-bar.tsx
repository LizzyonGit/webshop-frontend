import Image from 'next/image';
import Link from 'next/link';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import AuthActionButton from '@/components/auth-action-button';
import MobileMenu from '@/components/mobile-menu';
import CartIcon from '@/components/cart-icon';

export default async function NavigationBar() {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({ headers: requestHeaders });
  const isLoggedIn = !!session;

  const cartCount = 0; // TODO: replace with the real cart item count

  return (
    <div className="container max-w-7xl mx-auto px-2 pbe-2 pbs-4">
      <NavigationMenu className="w-full max-w-none border-be-3 pbe-2">
        <NavigationMenuList className="w-full justify-between">
          <NavigationMenuItem className="flex w-full items-center justify-between">
            <NavigationMenuLink render={<Link href="/" />} className={navigationMenuTriggerStyle()}>
              <Image src="/sky-market-transparent.png" alt="Sky Market logo" width={200} height={100} priority className="h-auto w-40 object-contain" loading="eager" />
            </NavigationMenuLink>

            {/* Desktop links */}
            <div className="hidden items-center gap-2 md:flex">
              {/* home */}
              <NavigationMenuLink render={<Link href="/" />} className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>

              {/* contact */}
              <NavigationMenuLink render={<Link href="/contact" />} className={navigationMenuTriggerStyle()}>
                Contact
              </NavigationMenuLink>

              {/* User dashboard */}
              <NavigationMenuLink render={<Link href="/dashboard" />} className={navigationMenuTriggerStyle()}>
                Dashboard
              </NavigationMenuLink>

              {/* cart */}
              <NavigationMenuLink render={<Link href="/cart" />} className={navigationMenuTriggerStyle()}>
                <CartIcon />
              </NavigationMenuLink>

              {/* login button */}
              <AuthActionButton isLoggedIn={isLoggedIn} />
            </div>

            {/* Mobile hamburger + drawer */}
            <MobileMenu isLoggedIn={isLoggedIn} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
