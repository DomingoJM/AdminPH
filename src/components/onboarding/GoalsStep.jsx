'use client';

import React from 'react';
import { Home, Clock, PiggyBank, Landmark } from 'lucide-react';
import { getHousingPrograms } from '@/data/regions';
import { t } from '@/data/translations';

const HOUSING_GOALS = [
  { id: 'buy', icon: '🏠' },
  { id: 'improve', icon: '🔨' },
  { id: 'rent', icon: '🔑' },
  { id: 'build', icon: '🏗️' },
  { id: 'invest', icon: '📈' },
];

const TIMELINES = [
  { id: '6m' },
  { id: '1y' },
  { id: '2y' },
  { id: '3y' },
  { id: 'exploring' },
];

export default function GoalsStep({ lang, selectedCountry, formData, onChange }) {
  const housingPrograms = getHousingPrograms(selectedCountry);

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {t(lang, 'step4_title')}
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          {t(lang, 'step4_description')}
        </p>
      </div>

      <div className="space-y-6">
        {/* Meta de vivienda */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Home className="w-4 h-4 text-emerald-600" />
            {t(lang, 'housing_goal')}
            <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {HOUSING_GOALS.map((goal) => {
              const isSelected = formData.housingGoal === goal.id;
              return (
                <button
                  key={goal.id}
                  onClick={() => handleChange('housingGoal', goal.id)}
                  className={`
                    flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer text-left
                    ${isSelected
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-emerald-300'
                    }
                  `}
                >
                  <span className="text-2xl">{goal.icon}</span>
                  <span className={`text-sm font-medium ${isSelected ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {t(lang, `goal_${goal.id}`)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Plazo */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Clock className="w-4 h-4 text-emerald-600" />
            {t(lang, 'timeline')}
          </label>
          <div className="flex flex-wrap gap-2">
            {TIMELINES.map((tl) => {
              const isSelected = formData.timeline === tl.id;
              return (
                <button
                  key={tl.id}
                  onClick={() => handleChange('timeline', tl.id)}
                  className={`
                    px-4 py-2 rounded-full border-2 transition-all duration-200 cursor-pointer text-sm font-medium
                    ${isSelected
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                    }
                  `}
                >
                  {t(lang, `timeline_${tl.id}`)}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ahorro para inicial */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <PiggyBank className="w-4 h-4 text-emerald-600" />
            {t(lang, 'down_payment')}
          </label>
          <input
            type="text"
            value={formData.downPayment || ''}
            onChange={(e) => handleChange('downPayment', e.target.value)}
            placeholder={t(lang, 'down_payment_placeholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Programas de subsidio/ayuda */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Landmark className="w-4 h-4 text-emerald-600" />
            {t(lang, 'programs_interest')}
          </label>
          <div className="flex flex-wrap gap-2">
            {['yes', 'maybe', 'no'].map((option) => {
              const isSelected = formData.programsInterest === option;
              return (
                <button
                  key={option}
                  onClick={() => handleChange('programsInterest', option)}
                  className={`
                    px-4 py-2 rounded-full border-2 transition-all duration-200 cursor-pointer text-sm font-medium
                    ${isSelected
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-emerald-300'
                    }
                  `}
                >
                  {t(lang, `programs_${option}`)}
                </button>
              );
            })}
          </div>

          {/* Preview de programas disponibles */}
          {formData.programsInterest === 'yes' && housingPrograms.length > 0 && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 animate-fadeIn">
              <p className="text-sm text-emerald-800 font-medium mb-2">
                {t(lang, 'profile_programs')}:
              </p>
              <div className="space-y-2">
                {housingPrograms.map((program) => (
                  <div key={program.id} className="flex items-start gap-2">
                    <Landmark className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-emerald-800">{program.name}</p>
                      <p className="text-xs text-emerald-600">
                        {program.description[lang] || program.description.es}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
