'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavigationMenuLink, navigationMenuTriggerStyle } from './ui/navigation-menu';

type Props = {
  isLoggedIn: boolean;
};

export default function AuthActionButton({ isLoggedIn }: Props) {
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
      <NavigationMenuLink render={<Link href="/login" />} className={navigationMenuTriggerStyle()}>
        Login
      </NavigationMenuLink>
    );
  }
}
