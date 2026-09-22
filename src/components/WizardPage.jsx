import React, { useState } from 'react';
import WizardStep1 from './WizardStep1';
import WizardStep2 from './WizardStep2';
import WizardStep3 from './WizardStep3';
import WizardStep4 from './WizardStep4';

export default function WizardPage({
  propertyData,
  setPropertyData,
  roomData,
  setRoomData,
  styleData,
  setStyleData,
  goToDashboard
}) {
  const [currentStep, setCurrentStep] = useState(1);

  const stepLabels = [
    'Property Details',
    'House Requirements',
    'Style & Features',
    'AI Estimation'
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <main class="pt-28 pb-24 px-6 md:px-12 max-w-5xl mx-auto min-h-screen">
      {/* Top Header Indicator */}
      <section class="mb-8 bg-white/60 backdrop-blur-md p-4 rounded-2xl border border-[#c2c6d6]/30 shadow-sm">
        <div class="flex justify-between items-center mb-2">
          <span class="text-[#0058be] font-bold text-sm font-display">
            Step {currentStep}: {stepLabels[currentStep - 1]}
          </span>
          <span class="text-[#424754] text-xs font-bold">
            {currentStep} of 4
          </span>
        </div>
        <div class="h-2 w-full bg-[#eaedff] rounded-full overflow-hidden">
          <div
            class="h-full bg-[#0058be] transition-all duration-500 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <div class="flex justify-between mt-3 px-1">
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              type="button"
              disabled={step > currentStep && currentStep !== 4}
              onClick={() => step < currentStep && setCurrentStep(step)}
              class={`w-3 h-3 rounded-full transition-all ${
                step <= currentStep ? 'bg-[#0058be] scale-110' : 'bg-[#dae2fd]'
              }`}
            ></button>
          ))}
        </div>
      </section>

      {/* Step Render Area */}
      <div class="bg-white/70 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-[#c2c6d6]/30 shadow-lg min-h-[500px]">
        {currentStep === 1 && (
          <WizardStep1
            propertyData={propertyData}
            setPropertyData={setPropertyData}
          />
        )}
        {currentStep === 2 && (
          <WizardStep2
            roomData={roomData}
            setRoomData={setRoomData}
          />
        )}
        {currentStep === 3 && (
          <WizardStep3
            styleData={styleData}
            setStyleData={setStyleData}
            onGenerateEstimate={() => setCurrentStep(4)}
          />
        )}
        {currentStep === 4 && (
          <WizardStep4
            propertyData={propertyData}
            roomData={roomData}
            styleData={styleData}
            onFinishSimulation={goToDashboard}
          />
        )}
      </div>

      {/* Footer Navigation Bar (Visible on Steps 1 & 2) */}
      {currentStep < 3 && (
        <div class="fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-lg border-t border-[#c2c6d6]/30 px-6 md:px-12 py-4 z-40 shadow-lg">
          <div class="max-w-5xl mx-auto flex justify-between items-center">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={handleBack}
              class={`flex items-center gap-2 font-bold text-sm px-6 py-3 rounded-xl transition-all cursor-pointer ${
                currentStep === 1
                  ? 'opacity-40 pointer-events-none text-[#424754]'
                  : 'text-[#131b2e] hover:bg-[#eaedff]'
              }`}
            >
              <span class="material-symbols-outlined">arrow_back</span>
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              class="bg-[#0058be] text-white px-8 py-3.5 rounded-full font-bold text-sm shadow-lg flex items-center gap-3 hover:shadow-xl active:scale-95 transition-all cursor-pointer hover:bg-[#004395]"
            >
              Next Step
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
