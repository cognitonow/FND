"use client";

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        <title>Google</title>
        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.3 1.98-4.32 1.98-3.36 0-6.21-2.82-6.21-6.18s2.85-6.18 6.21-6.18c1.8 0 3.06.72 4.2 1.86l2.64-2.58C18.04 2.62 15.68 1.5 12.48 1.5c-5.46 0-9.92 4.46-9.92 9.92s4.46 9.92 9.92 9.92c5.22 0 9.52-4.18 9.52-9.78 0-.6-.05-1.18-.16-1.72h-9.36z"/>
    </svg>
)

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleGoogleSignIn() {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/admin/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "An unexpected error occurred.",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">FND.ME Admin</CardTitle>
          <CardDescription>Sign in to access the dashboard</CardDescription>
        </CardHeader>
        <CardContent>
            <Button 
                className="w-full" 
                variant="outline"
                onClick={handleGoogleSignIn} 
                disabled={isLoading}
            >
                {isLoading ? (
                    "Signing In..."
                ) : (
                    <>
                        <GoogleIcon className="mr-2 h-4 w-4" />
                        Sign In with Google
                    </>
                )}
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
