'use client'
import React from 'react'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from './ui/navigation-menu'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs'

interface NavItemProps {
  href: string
  name: string
}

function NavItem({ href, name }: NavItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className='text-white/70 hover:text-white hover:underline transition-all duration-300 ease-in-out underline-offset-4'
        >
          {name}
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

function NavBar() {
  const { isSignedIn, user } = useUser()

  return (
    <nav className='p-4 bg-neutral-800 rounded-lg my-10'>
      <div className='flex items-center justify-between w-full'>
        {/* Left Navigation */}
        <div className='flex-1'>
          <NavigationMenu>
            <NavigationMenuList className='flex gap-6'>
              <NavItem href='/discover' name='Discover' />
              {isSignedIn && <NavItem href='/events' name='Your Events' />}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Logo/Company Name */}
        <div className='flex-1 flex justify-center'>
          <h1 className='text-2xl font-bold text-white tracking-wide select-none'>
            Minterly
          </h1>
        </div>

        {/* Right Navigation */}
        <div className='flex-1 flex items-center justify-end gap-6'>
          {isSignedIn && (
            <NavigationMenu>
              <NavigationMenuList>
                <NavItem href='/create-event' name='Create Event' />
              </NavigationMenuList>
            </NavigationMenu>
          )}

          {/* Authentication Section */}
          {isSignedIn ? (
            <UserButton
              appearance={{
                elements: {
                  avatarBox:
                    'w-10 h-10 transition-transform duration-200 hover:scale-105',
                  userButtonPopoverCard:
                    'bg-neutral-800 border border-white/10',
                  userButtonPopoverText: 'text-white',
                },
              }}
            />
          ) : (
            <div className='flex items-center gap-3'>
              <SignInButton mode='modal'>
                <button className='px-4 py-2 text-sm text-white/70 hover:text-white transition-colors duration-200 border border-white/20 rounded-lg hover:border-white/40'>
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode='modal'>
                <button className='px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg hover:from-cyan-400 hover:to-purple-400 transition-all duration-200'>
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
