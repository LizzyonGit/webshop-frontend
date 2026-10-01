'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavigationMenuLink, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { DrawerClose } from '@/components/ui/drawer';
import CartIcon from '@/components/cart-icon';

type Props = {
  isLoggedIn: boolean;
};

const linkClass = 'rounded-md px-3 py-3 text-base font-medium hover:bg-muted';

export default function AuthActionButtonMobile({ isLoggedIn }: Props) {
  const router = useRouter();

  async function handleLogout() {
    await authClient.signOut();

    router.push('/login');
    router.refresh();
  }

  if (isLoggedIn) {
    return <Button onClick={handleLogout}>Log out</Button>;
  } else {
    return (
      <DrawerClose render={<Link href="/cart" />} nativeButton={false} className={`${linkClass} flex items-center gap-3`}>
        Login
      </DrawerClose>

    );
  }
}
