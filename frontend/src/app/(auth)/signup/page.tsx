'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '@/lib/supabase/client'

const SignupPage = () => {
    


  return (
    <div>
        {/* Navbar */}
        <div className='flex justify-between items-center h-16 px-4 md:px-8'>
            <div className='flex justify-between gap-2'>
                <Image src="/logo.svg" alt="logo" width={32} height={32} />
                <p className='text-xl font-bold text-center text-text-main'>Coach OS</p>
            </div>
            <div>
                <nav className='flex justify-between gap-2 md:gap-8 text-text-main font-medium p-2 md:p-4'>
                    <Link href="/features">Features</Link>
                    <Link href="/pricing">Training Plans</Link>
                    <Link href="/about">Elite Portal</Link>
                    <Link href="/login" className='text-primary-blue'>Login</Link>
                </nav>
            </div>
        </div>
        {/* Hero Section */}
        <main className='flex flex-col items-center justify-center h-[calc(100vh-4rem)] w-full'>
            <div className='flex flex-col items-center justify-center gap-4'>
                <h1 className='font-bold text-center text-text-main text-[48px]'>Start Your Journey</h1>
                <p className='text-[18px] text-center text-text-muted'>Join the elite ranks of athletes on Coach OS.</p>
            </div>
        {/* Form */}
        <Card className='w-full max-w-md bg-card-elevated mt-4 pt-6'>
            <CardContent>
                <Auth 
                    supabaseClient={supabase}
                    appearance={{ theme: ThemeSupa }}
                    providers={['google']}
                    view="sign_up"
                    redirectTo="http://localhost:3001/auth/callback"
                />
            </CardContent>
        </Card> 
        </main>
    </div>
  )
}

export default SignupPage