"use client";

import { useCheckout } from "./hooks/useCheckout";
import { CheckoutProgress } from "./components/CheckoutProgress";
import { CartReviewStep } from "./components/CartReviewStep";
import { ShippingInfoStep } from "./components/ShippingInfoStep";
import { PaymentStep } from "./components/PaymentStep";

const CheckoutPage = () => {
  const {
    user,
    cart,
    getCartTotal,
    currentStep,
    orderData,
    saveInfo,
    mounted,
    paymentMethod,
    isUploading,
    paystackPublicKey,
    handleInputChange,
    handleNextStep,
    handlePrevStep,
    setSaveInfo,
    setPaymentMethod,
    handlePaystackSuccess,
    handlePaystackClose,
    handleFileUpload,
    handleBankTransferContinue,
  } = useCheckout();

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutProgress currentStep={currentStep} />

        <div className="bg-white rounded-lg shadow-md p-6">
          {currentStep === 1 && (
            <CartReviewStep
              user={user}
              cart={cart}
              getCartTotal={getCartTotal}
              handleNextStep={handleNextStep}
            />
          )}

          {currentStep === 2 && (
            <ShippingInfoStep
              orderData={orderData}
              handleInputChange={handleInputChange}
              saveInfo={saveInfo}
              setSaveInfo={setSaveInfo}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
            />
          )}

          {currentStep === 3 && (
            <PaymentStep
              user={user}
              getCartTotal={getCartTotal}
              orderData={orderData}
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
              isUploading={isUploading}
              paystackPublicKey={paystackPublicKey}
              handlePaystackSuccess={handlePaystackSuccess}
              handlePaystackClose={handlePaystackClose}
              handleFileUpload={handleFileUpload}
              handleBankTransferContinue={handleBankTransferContinue}
              handlePrevStep={handlePrevStep}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
