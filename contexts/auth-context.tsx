'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { toast } from '@/hooks/use-toast'

type User = {
  id: string
  email: string
  full_name: string | null
  avatar_url: string | null
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true)
      
      try {
        const { data: { session } } = await supabase.auth.getSession()
        
        if (session?.user) {
          // Get user profile data
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          setUser({
            id: session.user.id,
            email: session.user.email!,
            full_name: profile?.full_name || null,
            avatar_url: profile?.avatar_url || null,
          })
        }
      } catch (error) {
        console.error('Error getting user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile data
          const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user.id)
            .single()
          
          setUser({
            id: session.user.id,
            email: session.user.email!,
            full_name: profile?.full_name || null,
            avatar_url: profile?.avatar_url || null,
          })
        } else if (event === 'SIGNED_OUT') {
          setUser(null)
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      })
      
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      toast({
        title: 'Error signing in',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      })
    }
  }

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) {
        throw error
      }

      if (data.user) {
        // Create user profile
        await supabase.from('users').insert({
          id: data.user.id,
          email: email,
          full_name: fullName,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      }

      toast({
        title: 'Account created!',
        description: 'Please check your email to confirm your account.',
      })
      
      router.push('/signin')
    } catch (error: any) {
      toast({
        title: 'Error creating account',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      })
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      
      toast({
        title: 'Signed out',
        description: 'You have been successfully signed out.',
      })
      
      router.push('/')
      router.refresh()
    } catch (error: any) {
      toast({
        title: 'Error signing out',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      })
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        throw error
      }

      toast({
        title: 'Password reset email sent',
        description: 'Please check your email for the password reset link.',
      })
    } catch (error: any) {
      toast({
        title: 'Error resetting password',
        description: error.message || 'An unexpected error occurred.',
        variant: 'destructive',
      })
    }
  }

  const value = {
    user,
    isLoading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
