'use client';

import Link from 'next/link';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';
import AuthActionButtonMobile from '@/components/auth-action-button-mobile';
import Image from 'next/image';
import CartIconWrapper from './cart-icon-wrapper';

const linkClass = 'rounded-md px-3 py-3 text-base font-medium hover:bg-muted';

export default function MobileMenu({ isLoggedIn, }: { isLoggedIn: boolean; }) {
  return (
    <Drawer swipeDirection="right">
      <DrawerTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu" />}>
        <Menu className="size-6" />
      </DrawerTrigger>

      <DrawerContent>
        {/* Close button, top-right */}
        <DrawerClose render={<Button variant="ghost" size="icon" className="absolute right-3 top-3" aria-label="Close menu" />}>
          <X className="size-5" />
        </DrawerClose>

        <DrawerHeader>
          <DrawerTitle>Menu</DrawerTitle>
        </DrawerHeader>

        <nav className="flex flex-col gap-1 p-4 pb-8">
          <DrawerClose render={<Link href="/" />} nativeButton={false} className={linkClass}>
            Home
          </DrawerClose>

          <DrawerClose render={<Link href="/contact" />} nativeButton={false} className={linkClass}>
            Contact
          </DrawerClose>

          <DrawerClose render={<Link href="/cart" />} nativeButton={false} className={`${linkClass} flex items-center gap-3`}>
            <CartIconWrapper className="size-5" />
          </DrawerClose>

          <AuthActionButtonMobile isLoggedIn={isLoggedIn} />

        </nav>
      </DrawerContent>
    </Drawer>
  );
}
