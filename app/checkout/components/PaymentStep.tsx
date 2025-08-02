"use client";

import { motion } from "framer-motion";
import { FC } from "react";
import { PaystackButton } from "react-paystack";

interface PaymentStepProps {
  paymentMethod: "paystack" | null;
  setPaymentMethod: (method: "paystack" | null) => void;
  handlePrevStep: () => void;
  user: any;
  getCartTotal: (userId: string) => number;
  orderData: any;
  paystackPublicKey: string;
  handlePaystackSuccess: (reference: any) => void;
  handlePaystackClose: () => void;
}

const PaymentStep: FC<PaymentStepProps> = ({
  paymentMethod,
  setPaymentMethod,
  handlePrevStep,
  user,
  getCartTotal,
  orderData,
  paystackPublicKey,
  handlePaystackSuccess,
  handlePaystackClose,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-6">Payment</h2>

      <div className="space-y-4">
        <button
          onClick={() => setPaymentMethod("paystack")}
          className={`w-full p-4 border rounded-lg text-left ${
            paymentMethod === "paystack"
              ? "border-blue-600 ring-2 ring-blue-600"
              : "border-gray-300"
          }`}
        >
          <h3 className="font-semibold">Pay with Paystack</h3>
          <p className="text-sm text-gray-600">
            Pay securely with your card.
          </p>
        </button>
      </div>

      {paymentMethod === "paystack" && (
        <div className="mt-6 text-center">
          <PaystackButton
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            publicKey={paystackPublicKey}
            amount={user ? getCartTotal(user.id) * 100 : 0}
            email={orderData.customer_email}
            text="Pay Now"
            onSuccess={handlePaystackSuccess}
            onClose={handlePaystackClose}
          />
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        <button
          onClick={handlePrevStep}
          className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          Back
        </button>
      </div>
    </motion.div>
  );
};

export default PaymentStep;
