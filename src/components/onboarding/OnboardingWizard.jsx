'use client';

import React, { useState, useCallback } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Globe } from 'lucide-react';
import ProgressBar from './ProgressBar';
import RegionSelector from './RegionSelector';
import IdentityForm from './IdentityForm';
import IncomeVerification from './IncomeVerification';
import GoalsStep from './GoalsStep';
import KasScorePreview from './KasScorePreview';
import { t } from '@/data/translations';

const TOTAL_STEPS = 4; // region, identity, income, goals (+ completion screen)

export default function OnboardingWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [lang, setLang] = useState('es');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  // Datos del formulario unificados
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    incomeType: '',
    monthlyIncome: '',
    remittanceAmount: '',
    housingGoal: '',
    timeline: '',
    downPayment: '',
    programsInterest: '',
  });

  // Validación por paso
  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 0: // Region
        return !!selectedCountry;
      case 1: // Identity
        return !!(formData.fullName && formData.email);
      case 2: // Income
        return !!formData.incomeType;
      case 3: // Goals
        return !!formData.housingGoal;
      default:
        return true;
    }
  }, [currentStep, selectedCountry, formData]);

  const handleNext = () => {
    if (!canProceed()) return;

    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleBack = () => {
    if (isComplete) {
      setIsComplete(false);
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleRegionSelect = (regionId) => {
    setSelectedRegion(regionId);
  };

  const handleCountrySelect = (countryId) => {
    setSelectedCountry(countryId);
  };

  const handleFormChange = (newData) => {
    setFormData(newData);
  };

  // Toggle de idioma
  const toggleLang = () => {
    const langOrder = ['es', 'en', 'pt'];
    const currentIndex = langOrder.indexOf(lang);
    const nextIndex = (currentIndex + 1) % langOrder.length;
    setLang(langOrder[nextIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex flex-col">
      {/* Header con selector de idioma */}
      <header className="w-full px-4 py-3 flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">K</span>
          </div>
          <span className="font-bold text-gray-800">{t(lang, 'app_name')}</span>
        </div>

        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 hover:border-emerald-300 transition-all text-sm text-gray-600 hover:text-emerald-600 cursor-pointer"
        >
          <Globe className="w-4 h-4" />
          <span>{t(lang, `lang_${lang}`)}</span>
        </button>
      </header>

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-2xl">
          {/* Barra de progreso */}
          {!isComplete && (
            <div className="mb-8">
              <ProgressBar lang={lang} currentStep={currentStep} />
            </div>
          )}

          {/* Tarjeta principal */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-10">
            {/* Paso actual */}
            {!isComplete ? (
              <>
                {currentStep === 0 && (
                  <RegionSelector
                    lang={lang}
                    selectedRegion={selectedRegion}
                    selectedCountry={selectedCountry}
                    onRegionSelect={handleRegionSelect}
                    onCountrySelect={handleCountrySelect}
                  />
                )}
                {currentStep === 1 && (
                  <IdentityForm
                    lang={lang}
                    selectedCountry={selectedCountry}
                    formData={formData}
                    onChange={handleFormChange}
                  />
                )}
                {currentStep === 2 && (
                  <IncomeVerification
                    lang={lang}
                    selectedCountry={selectedCountry}
                    formData={formData}
                    onChange={handleFormChange}
                  />
                )}
                {currentStep === 3 && (
                  <GoalsStep
                    lang={lang}
                    selectedCountry={selectedCountry}
                    formData={formData}
                    onChange={handleFormChange}
                  />
                )}
              </>
            ) : (
              <KasScorePreview
                lang={lang}
                selectedCountry={selectedCountry}
                formData={formData}
              />
            )}

            {/* Botones de navegación */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-100">
              <button
                onClick={handleBack}
                disabled={currentStep === 0 && !isComplete}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer
                  ${currentStep === 0 && !isComplete
                    ? 'text-gray-300 cursor-not-allowed'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }
                `}
              >
                <ArrowLeft className="w-4 h-4" />
                {t(lang, 'btn_back')}
              </button>

              {!isComplete ? (
                <button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className={`
                    flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer
                    ${canProceed()
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }
                  `}
                >
                  {t(lang, 'btn_next')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex gap-3">
                  <button
                    className="px-5 py-2.5 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-all cursor-pointer"
                  >
                    {t(lang, 'btn_add_documents')}
                  </button>
                  <button
                    className="px-6 py-2.5 rounded-xl text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {t(lang, 'btn_go_dashboard')}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-400">
              {t(lang, 'footer_privacy')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
