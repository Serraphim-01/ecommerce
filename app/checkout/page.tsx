'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, CreditCard, MapPin, User } from 'lucide-react';
import { useStore } from '@/store/useStore';
import PaymentUpload from '@/components/PaymentUpload';
import { createOrder, uploadPaymentReceipt } from '@/lib/supabase';

const CheckoutPage = () => {
  const router = useRouter();
  const { cart, getCartTotal, clearCart } = useStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [orderData, setOrderData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    shipping_address: '',
    city: '',
    state: '',
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && cart.length === 0) {
      router.push('/cart');
    }
  }, [cart, router, mounted]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      setIsUploading(true);
      
      // Create order first
      const orderData = {
        ...orderData,
        items: cart,
        total_amount: getCartTotal(),
        status: 'pending',
      } as const;
      
      const order = await createOrder(orderData);

      // Upload payment receipt
      const receiptUrl = await uploadPaymentReceipt(file, order.id);
      
      // Update order status to payment_review
      await updateOrderStatus(order.id, 'payment_review');

      // Clear cart and redirect
      clearCart();
      router.push(`/orders/${order.id}`);
    } catch (error) {
      console.error('Error creating order:', error);
      // You might want to show a toast notification here
    } finally {
      setIsUploading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Cart Review', icon: CheckCircle },
    { number: 2, title: 'Shipping Info', icon: MapPin },
    { number: 3, title: 'Payment', icon: CreditCard },
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      Step {step.number}
                    </p>
                    <p className={`text-xs ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-200 mx-4">
                      <div
                        className={`h-full ${
                          isCompleted ? 'bg-green-600' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {/* Step 1: Cart Review */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Review Your Order</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">
                        Size: {item.size} | Color: {item.color} | Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      ₦{(item.product.price * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>₦{getCartTotal().toLocaleString()}</span>
                </div>
              </div>
              
              <button
                onClick={handleNextStep}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue to Shipping
              </button>
            </motion.div>
          )}

          {/* Step 2: Shipping Information */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Shipping Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="customer_name"
                    value={orderData.customer_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="customer_email"
                    value={orderData.customer_email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="customer_phone"
                    value={orderData.customer_phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={orderData.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State *
                  </label>
                  <select
                    name="state"
                    value={orderData.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select State</option>
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Kano">Kano</option>
                    <option value="Rivers">Rivers</option>
                    <option value="Ogun">Ogun</option>
                    <option value="Kaduna">Kaduna</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shipping Address *
                  </label>
                  <textarea
                    name="shipping_address"
                    value={orderData.shipping_address}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={!orderData.customer_name || !orderData.customer_email || !orderData.customer_phone || !orderData.shipping_address}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue to Payment
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Payment</h2>
              
              <PaymentUpload
                onFileUpload={handleFileUpload}
                isUploading={isUploading}
              />
              
              <div className="mt-6 flex space-x-4">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Back
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;