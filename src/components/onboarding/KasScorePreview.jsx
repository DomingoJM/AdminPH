'use client';

import React, { useMemo } from 'react';
import { Gauge, Lightbulb, ArrowRight } from 'lucide-react';
import { getCountryConfig, getHousingPrograms } from '@/data/regions';
import { t } from '@/data/translations';

/**
 * KasScorePreview - Muestra el score crediticio alternativo preliminar
 * 
 * El KasScore es el motor de crédito alternativo que evalúa:
 * - Tipo de ingreso (formal/informal/mixto)
 * - Historial de remesas
 * - Pagos de servicios
 * - Referencias de alquiler
 * - Ahorro disponible
 */
export default function KasScorePreview({ lang, selectedCountry, formData }) {
  const countryConfig = getCountryConfig(selectedCountry);
  const housingPrograms = getHousingPrograms(selectedCountry);

  // Calcular KasScore preliminar (0-850, similar a FICO para familiaridad)
  const kasScore = useMemo(() => {
    let score = 450; // Base mínimo

    // Bonus por tipo de ingreso
    if (formData.incomeType === 'formal') score += 120;
    else if (formData.incomeType === 'self_employed') score += 80;
    else if (formData.incomeType === 'mixed') score += 100;
    else if (formData.incomeType === 'informal') score += 60;
    else if (formData.incomeType === 'remittances') score += 90;

    // Bonus por ingreso mensual declarado
    if (formData.monthlyIncome) {
      const income = parseFloat(formData.monthlyIncome.replace(/[^0-9.]/g, ''));
      if (income > 0) score += 50;
      if (income > 2000) score += 30;
      if (income > 5000) score += 20;
    }

    // Bonus por remesas (factor diferenciador para latinos)
    if (formData.remittanceAmount) {
      const rem = parseFloat(formData.remittanceAmount.replace(/[^0-9.]/g, ''));
      if (rem > 0) score += 40;
      if (rem > 500) score += 20;
    }

    // Bonus por tener documento de identidad
    const identityDocs = countryConfig?.identityDocs || [];
    for (const doc of identityDocs) {
      if (formData[doc.id]) score += 20;
    }

    // Bonus por meta clara
    if (formData.housingGoal) score += 20;

    // Bonus por ahorro
    if (formData.downPayment) {
      const saved = parseFloat(formData.downPayment.replace(/[^0-9.]/g, ''));
      if (saved > 0) score += 30;
      if (saved > 5000) score += 20;
    }

    // Cap en 850
    return Math.min(score, 850);
  }, [formData, countryConfig]);

  // Determinar categoría y color
  const getScoreCategory = (score) => {
    if (score >= 750) return { key: 'excellent', color: '#10B981', bg: 'bg-emerald-500', textColor: 'text-emerald-700' };
    if (score >= 650) return { key: 'high', color: '#3B82F6', bg: 'bg-blue-500', textColor: 'text-blue-700' };
    if (score >= 550) return { key: 'medium', color: '#F59E0B', bg: 'bg-amber-500', textColor: 'text-amber-700' };
    return { key: 'low', color: '#EF4444', bg: 'bg-red-400', textColor: 'text-red-700' };
  };

  const category = getScoreCategory(kasScore);
  const scorePercentage = ((kasScore - 300) / 550) * 100; // Rango FICO: 300-850

  // Tips para mejorar
  const improvementTips = [];
  if (!formData.phone) improvementTips.push(t(lang, 'kasscore_tip_1'));
  if (!formData.remittanceAmount && ['remittances', 'mixed'].includes(formData.incomeType)) {
    improvementTips.push(t(lang, 'kasscore_tip_2'));
  }
  if (formData.incomeType === 'informal') improvementTips.push(t(lang, 'kasscore_tip_3'));
  improvementTips.push(t(lang, 'kasscore_tip_4'));

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {t(lang, 'step_complete_title')}
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          {t(lang, 'step_complete_subtitle')}
        </p>
      </div>

      {/* KasScore Gauge */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Gauge className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-800">{t(lang, 'kasscore_title')}</h3>
        </div>

        {/* Score visual */}
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-40 h-40">
            {/* Semi-circle gauge */}
            <svg viewBox="0 0 200 120" className="w-full">
              {/* Background arc */}
              <path
                d="M 20 110 A 80 80 0 0 1 180 110"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="16"
                strokeLinecap="round"
              />
              {/* Score arc */}
              <path
                d="M 20 110 A 80 80 0 0 1 180 110"
                fill="none"
                stroke={category.color}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${scorePercentage * 2.51} 251`}
              />
            </svg>
            {/* Score number */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
              <span className="text-3xl font-bold" style={{ color: category.color }}>
                {kasScore}
              </span>
              <span className={`text-sm font-medium ${category.textColor}`}>
                {t(lang, `kasscore_${category.key}`)}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {t(lang, 'kasscore_description')}
          </p>
        </div>

        {/* Info box */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
          <p className="text-xs text-blue-700 leading-relaxed">
            {t(lang, 'kasscore_info')}
          </p>
        </div>
      </div>

      {/* Resumen del perfil */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-4">{t(lang, 'profile_summary')}</h3>
        <div className="grid grid-cols-2 gap-4">
          <ProfileItem
            label={t(lang, 'profile_country')}
            value={`${countryConfig?.flag || ''} ${countryConfig?.name || ''}`}
          />
          <ProfileItem
            label={t(lang, 'profile_income')}
            value={formData.incomeType
              ? t(lang, `income_type`) !== `income_type`
                ? getCountryConfig(selectedCountry)?.incomeTypes?.find(i => i.id === formData.incomeType)?.label?.[lang]
                : formData.incomeType
              : '-'
            }
          />
          <ProfileItem
            label={t(lang, 'profile_goal')}
            value={formData.housingGoal ? t(lang, `goal_${formData.housingGoal}`) : '-'}
          />
          <ProfileItem
            label={t(lang, 'profile_timeline')}
            value={formData.timeline ? t(lang, `timeline_${formData.timeline}`) : '-'}
          />
        </div>

        {/* Programas disponibles */}
        {housingPrograms.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-600 mb-2">
              {t(lang, 'profile_programs')} ({housingPrograms.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {housingPrograms.map((program) => (
                <span
                  key={program.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700"
                >
                  {program.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Tips para mejorar */}
      {improvementTips.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h4 className="font-semibold text-amber-800">{t(lang, 'kasscore_improve')}</h4>
          </div>
          <ul className="space-y-2">
            {improvementTips.slice(0, 3).map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-amber-700">{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}
