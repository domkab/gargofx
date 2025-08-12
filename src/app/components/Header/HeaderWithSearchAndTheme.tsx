'use client';

import {
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Button, Navbar, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaMoon,
  FaSignInAlt,
  FaSun
} from 'react-icons/fa';
import Logo from '../Logo';

export default function HeaderWithSearch() {
  const path = usePathname();
  const { theme, setTheme } = useTheme();

  return (
    <Navbar className="border-b-2">
      <Logo />


      <div className="flex gap-2 md:order-2">
        <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>

        <SignedIn>
          <UserButton
            appearance={{
              baseTheme: theme === 'light' ? undefined : dark,
            }}
            userProfileUrl="/dashboard?tab=profile"
          />
        </SignedIn>

        <SignedOut>
          <Link href='sign-in'>
            <Button gradientDuoTone='redToYellow' outline>
              <span className="hidden md:inline">Sign In</span>
              <span className="inline md:hidden">
                <FaSignInAlt size={20} />
              </span>
            </Button>
          </Link>
        </SignedOut>
        <NavbarToggle />
      </div>

      {/* <NavbarCollapse>
        <Link href='/'>
          <NavbarLink active={path === '/'} as={'div'}>
            Home
          </NavbarLink>
        </Link>

        <Link href='/about'>
          <NavbarLink active={path === '/about'} as={'div'}>
            About
          </NavbarLink>
        </Link>

        <Link href='/search'>
          <NavbarLink active={path === '/search'} as={'div'}>
            Search
          </NavbarLink>
        </Link>
      </NavbarCollapse> */}
    </Navbar>
  );
}
