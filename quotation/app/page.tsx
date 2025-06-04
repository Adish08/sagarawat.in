"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { getApps, initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { firebaseConfig } from "../firebaseConfig";
import { Outfit } from "next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Initialize Outfit font
const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
});

// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const allowedEmails = ["adish.sag@gmail.com"]; // Add more allowed emails here
        if (user.email && allowedEmails.includes(user.email)) {
          router.push('/quotation'); // Redirect to main app page
        } else {
          // If user is logged in but not authorized, sign them out and keep them on login page
          // Or show a message, but don't redirect to main app
          auth.signOut();
          setIsLoading(false); // Allow rendering login page
        }
      } else {
        setIsLoading(false); // No user, allow rendering login page
      }
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  function handleGoogleLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const allowedEmails = ["adish.sag@gmail.com"]; // Add more allowed emails here
        if (user.email && allowedEmails.includes(user.email)) {
          // Redirection is handled by onAuthStateChanged
          console.log("Login successful, user:", user);
        } else {
          alert("You are not authorized to access this application.");
          auth.signOut();
        }
      })
      .catch((error) => {
        console.error("Login error:", error);
        alert(`Login failed: ${error.message}`);
      });
  }

  function handleDemoMode() {
    // Set demo mode flag in session storage
    sessionStorage.setItem('demoMode', 'true');
    // Set demo expiration time (3 minutes from now)
    const expirationTime = Date.now() + 3 * 60 * 1000; // 3 minutes
    sessionStorage.setItem('demoExpiration', expirationTime.toString());
    // Redirect to quotation page
    router.push('/quotation?demo=true');
  }

  if (isLoading) {
    return <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">Loading...</div>; // Or a proper loading spinner
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <Image
            src="/placeholder.svg?width=300&height=100" // Replace with your actual header image
            alt="Sagarawat Electricals Header"
            width={300}
            height={100}
            className="mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold">Sagarawat Electricals</CardTitle>
          <CardDescription>Legrand Quotation Tool</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button 
            className={`w-full bg-orange-500 hover:bg-orange-600 text-white py-3 text-lg flex items-center justify-center gap-2 ${outfit.className}`} 
            onClick={handleGoogleLogin}
          >
            <FontAwesomeIcon icon={faGoogle} className="text-white" size="lg" /> Continue with Google
          </Button>
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Want to see a demo?{" "}
              <button 
                onClick={handleDemoMode}
                className="font-medium text-orange-600 hover:text-orange-500 focus:outline-none"
              >
                Start demo mode
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
