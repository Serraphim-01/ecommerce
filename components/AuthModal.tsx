'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { LoginForm } from './auth/LoginForm';
import { SignupForm } from './auth/SignupForm';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
  redirectTo?: string;
}

const AuthModal = ({ isOpen, onClose, initialMode = 'login', redirectTo = '/' }: AuthModalProps) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const switchMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6"
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  className="bg-white rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={onClose}
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="w-full">
                  <div className="text-center mb-6">
                    <div className="mx-auto h-12 w-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <span className="text-white font-bold text-xl">E</span>
                    </div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                      <button
                        type="button"
                        onClick={switchMode}
                        className="font-medium text-blue-600 hover:text-blue-500"
                      >
                        {mode === 'login' ? 'Sign up' : 'Sign in'}
                      </button>
                    </p>
                  </div>

                  {mode === 'login' ? (
                    <LoginForm onClose={onClose} redirectTo={redirectTo} />
                  ) : (
                    <SignupForm onClose={onClose} redirectTo={redirectTo} />
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;