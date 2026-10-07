import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'mikasapp_onboarding';

const INITIAL_STATE = {
  currentStep: 0,
  lang: 'es',
  selectedRegion: null,
  selectedCountry: null,
  isComplete: false,
  formData: {
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
  },
};

export function useOnboarding() {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setState(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  const updateFormData = useCallback((updates) => {
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, ...updates },
    }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => {
      if (prev.currentStep < 3) return { ...prev, currentStep: prev.currentStep + 1 };
      return { ...prev, isComplete: true };
    });
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => {
      if (prev.isComplete) return { ...prev, isComplete: false };
      if (prev.currentStep > 0) return { ...prev, currentStep: prev.currentStep - 1 };
      return prev;
    });
  }, []);

  const setLang = useCallback((lang) => {
    setState((prev) => ({ ...prev, lang }));
  }, []);

  const setRegion = useCallback((region) => {
    setState((prev) => ({
      ...prev,
      selectedRegion: region,
      selectedCountry: region === 'us' ? 'us' : null,
    }));
  }, []);

  const setCountry = useCallback((country) => {
    setState((prev) => ({ ...prev, selectedCountry: country }));
  }, []);

  const canProceed = useCallback(() => {
    switch (state.currentStep) {
      case 0: return !!state.selectedCountry;
      case 1: return !!(state.formData.fullName && state.formData.email);
      case 2: return !!state.formData.incomeType;
      case 3: return !!state.formData.housingGoal;
      default: return true;
    }
  }, [state.currentStep, state.selectedCountry, state.formData]);

  return {
    ...state,
    updateFormData,
    nextStep,
    prevStep,
    setLang,
    setRegion,
    setCountry,
    canProceed,
  };
}

export default useOnboarding;