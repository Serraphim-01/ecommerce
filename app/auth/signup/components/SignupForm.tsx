"use client";

import Link from 'next/link';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useSignupPage } from '../hooks/useSignupPage';

export const SignupForm = () => {
  const {
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
  } = useSignupPage();

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1 relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full pl-10 pr-3 py-3 border ${
                errors.email ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.password}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full pl-10 pr-10 py-3 border ${
                errors.password ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Create a password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`appearance-none relative block w-full pl-10 pr-10 py-3 border ${
                errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
              } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
          )}
        </div>
        <div className="flex items-center">
          <input
            id="is_admin"
            name="is_admin"
            type="checkbox"
            checked={formData.is_admin}
            onChange={handleInputChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="is_admin" className="ml-2 block text-sm text-gray-900">
            Sign up as an admin
          </label>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 w-4 h-4" />
            </>
          )}
        </button>
      </div>

      <div className="text-xs text-gray-500 text-center">
        By creating an account, you agree to our{' '}
        <Link href="/terms" className="text-blue-600 hover:text-blue-500">
          Terms of Service
        </Link>{' '}
        and{' '}
        <Link href="/privacy" className="text-blue-600 hover:text-blue-500">
          Privacy Policy
        </Link>
      </div>
    </form>
  );
};
