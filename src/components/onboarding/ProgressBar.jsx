'use client';

import React from 'react';
import { t } from '@/data/translations';

const STEPS = [
  { id: 'region', label_key: 'step1_title', icon: '🌎' },
  { id: 'identity', label_key: 'step2_title', icon: '🪪' },
  { id: 'income', label_key: 'step3_title', icon: '💰' },
  { id: 'goals', label_key: 'step4_title', icon: '🏠' },
];

export default function ProgressBar({ lang, currentStep }) {
  return (
    <div className="w-full">
      {/* Barra de progreso visual */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-medium text-gray-500">
          {t(lang, 'progress_step', { current: currentStep + 1, total: STEPS.length })}
        </span>
        <span className="text-xs font-medium text-emerald-600">
          {Math.round(((currentStep + 1) / STEPS.length) * 100)}%
        </span>
      </div>

      {/* Barra de fondo */}
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      {/* Indicadores de paso */}
      <div className="flex justify-between mt-3">
        {STEPS.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center"
            >
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all duration-300
                  ${isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                      ? 'bg-emerald-100 text-emerald-700 ring-2 ring-emerald-500'
                      : 'bg-gray-100 text-gray-400'
                  }
                `}
              >
                {isCompleted ? '✓' : step.icon}
              </div>
              <span
                className={`
                  text-[10px] mt-1 hidden sm:block max-w-[60px] text-center leading-tight
                  ${isCurrent ? 'text-emerald-700 font-medium' : 'text-gray-400'}
                `}
              >
                {t(lang, step.label_key).split(' ').slice(0, 2).join(' ')}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
