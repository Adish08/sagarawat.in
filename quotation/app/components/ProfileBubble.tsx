'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getAuth, User } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '../../firebaseConfig';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Dynamically import AvatarImage to prevent hydration issues
const AvatarImage = dynamic(
  () => import('@/components/ui/avatar').then(mod => mod.AvatarImage),
  { ssr: false }
);

interface ProfileData {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

export function ProfileBubble() {
  const [mounted, setMounted] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Initialize Firebase if not already initialized
    let app;
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    
    const auth = getAuth(app);
    
    const unsubscribe = auth.onAuthStateChanged((user: User | null) => {
      if (user) {
        const providerData = user.providerData.find(
          (provider) => provider.providerId === 'google.com'
        );
        
        setProfileData({
          displayName: user.displayName || user.email?.split('@')[0] || 'User',
          email: user.email,
          photoURL: user.photoURL || providerData?.photoURL || null
        });
      } else {
        setProfileData(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Don't render anything on the server or if not mounted
  if (typeof window === 'undefined' || !mounted) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <div className="h-10 w-10 rounded-full bg-gray-200" />
      </div>
    );
  }

  // If no user is logged in, don't render anything
  if (!profileData) {
    return null;
  }

  const handleSignOut = async () => {
    try {
      const auth = getAuth();
      await auth.signOut();
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
            <Avatar className="h-10 w-10">
              {profileData?.photoURL ? (
                <AvatarImage 
                  src={profileData.photoURL} 
                  alt={profileData.displayName || 'User'}
                  referrerPolicy="no-referrer"
                />
              ) : (
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {getInitials(profileData?.displayName || '')}
                </AvatarFallback>
              )}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-sm font-medium leading-none">{profileData.displayName || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">{profileData.email || ''}</p>
          </div>
          <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
