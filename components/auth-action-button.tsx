'use client';

import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { NavigationMenuLink, navigationMenuTriggerStyle } from './ui/navigation-menu';
import { toast } from 'sonner';
import { useState } from 'react';

type Props = {
  isLoggedIn: boolean;
};

export default function AuthActionButton({ isLoggedIn }: Props) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  async function handleLogout() {
    setIsPending(true);
      try {
          const { error } = await authClient.signOut();

          if (error) {
              toast.error(error.message ?? `Log out failed! Please try again.`, { duration: 2000 });
              
              return;
          }

          toast.success(`Logged out successfully.`);
          router.push("/");
          router.refresh();
      } catch (error) {
          console.error(`Log out failed:`, error);
          toast.error(`Log out failed! Please try again.`, { duration: 2000 });
      } finally {
          setIsPending(false);
      }
  }

  if (isLoggedIn) {
    return <Button
              type="button"
              variant="default"
              onClick={handleLogout}
              disabled={isPending}
            > 
              {isPending ? `Logging out...` : `Log out`}
            </Button>
  } else {
    return (
      <NavigationMenuLink render={<Link href="/login" />} className={navigationMenuTriggerStyle()}>
        Login
      </NavigationMenuLink>
    );
  }
}
