'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useSignupPage } from './hooks/useSignupPage';
import { SignupForm } from './components/SignupForm';

const SignupPage = () => {
  const { redirectTo } = useSignupPage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div>
          <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">E</span>
          </div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              href={`/auth/login${redirectTo !== '/' ? `?redirect=${redirectTo}` : ''}`}
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              sign in to your existing account
            </Link>
          </p>
        </div>

        <SignupForm />
      </motion.div>
    </div>
  );
};

export default SignupPage;