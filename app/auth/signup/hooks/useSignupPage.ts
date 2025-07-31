"use client";

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { getAdminCount } from '@/lib/supabase/users';
import { useToast } from '@/hooks/use-toast';

export const useSignupPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    is_admin: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const redirectTo = searchParams.get('redirect') || '/';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      if (formData.is_admin) {
        const adminCount = await getAdminCount();
        if (adminCount >= 2) {
          toast({
            title: 'Signup Failed',
            description: 'The maximum number of admins has been reached.',
            variant: 'destructive',
          });
          return;
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            is_admin: formData.is_admin,
          },
        },
      });

      if (error) {
        toast({
          title: 'Signup Failed',
          description: error.message,
          variant: 'destructive',
        });
        return;
      }

      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            is_admin: formData.is_admin,
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }

        toast({
          title: 'Account Created!',
          description: 'Welcome to ElegantShop! You can now start shopping.',
        });

        router.push(redirectTo);
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        title: 'Signup Failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    showPassword,
    showConfirmPassword,
    loading,
    errors,
    redirectTo,
    handleInputChange,
    handleSubmit,
    setShowPassword,
    setShowConfirmPassword,
  };
};
