'use client';

import React from 'react';
import { DollarSign, TrendingUp, Send, Info } from 'lucide-react';
import { getCountryConfig, getIncomeTypes } from '@/data/regions';
import { t } from '@/data/translations';

export default function IncomeVerification({ lang, selectedCountry, formData, onChange }) {
  const countryConfig = getCountryConfig(selectedCountry);
  const incomeTypes = getIncomeTypes(selectedCountry);
  const currency = countryConfig?.currency || 'USD';

  // Detectar si el ingreso es informal/remesas para mostrar mensaje especial
  const isInformal = ['informal', 'mixed', 'remittances'].includes(formData.incomeType);

  // Detectar si recibe remesas para mostrar campo adicional
  const showsRemittance = ['remittances', 'mixed'].includes(formData.incomeType);

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {t(lang, 'step3_title')}
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          {t(lang, 'step3_description')}
        </p>
      </div>

      <div className="space-y-5">
        {/* Tipo de ingreso */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            {t(lang, 'income_type')}
            <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.incomeType || ''}
            onChange={(e) => handleChange('incomeType', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 bg-white appearance-none cursor-pointer"
          >
            <option value="">{t(lang, 'income_type_placeholder')}</option>
            {incomeTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.label[lang] || type.label.es}
              </option>
            ))}
          </select>
        </div>

        {/* Ingreso mensual */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <DollarSign className="w-4 h-4 text-emerald-600" />
            {t(lang, 'monthly_income')} ({currency})
          </label>
          <input
            type="text"
            value={formData.monthlyIncome || ''}
            onChange={(e) => handleChange('monthlyIncome', e.target.value)}
            placeholder={t(lang, 'monthly_income_placeholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Campo de remesas (condicional) */}
        {showsRemittance && (
          <div className="space-y-1.5 animate-fadeIn">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Send className="w-4 h-4 text-emerald-600" />
              {t(lang, 'remittance_amount')} ({currency})
            </label>
            <input
              type="text"
              value={formData.remittanceAmount || ''}
              onChange={(e) => handleChange('remittanceAmount', e.target.value)}
              placeholder={t(lang, 'remittance_placeholder')}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
            />
          </div>
        )}

        {/* Mensaje informativo para ingresos informales */}
        {isInformal && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 animate-fadeIn">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-semibold text-amber-800">
                  {t(lang, 'informal_info_title')}
                </h4>
                <p className="text-sm text-amber-700 leading-relaxed">
                  {t(lang, 'informal_info_text')}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Preview KasScore: indicador visual de cómo ayuda cada tipo de ingreso */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-500 mb-3 font-medium">Tu KasScore puede considerar:</p>
          <div className="grid grid-cols-1 gap-2">
            <KasScoreFactor
              active={!!formData.incomeType}
              label={lang === 'pt' ? 'Tipo de renda registrado' : lang === 'en' ? 'Income type registered' : 'Tipo de ingreso registrado'}
            />
            <KasScoreFactor
              active={!!formData.monthlyIncome}
              label={lang === 'pt' ? 'Renda mensal declarada' : lang === 'en' ? 'Monthly income declared' : 'Ingreso mensual declarado'}
            />
            <KasScoreFactor
              active={showsRemittance && !!formData.remittanceAmount}
              label={lang === 'pt' ? 'Histórico de remessas' : lang === 'en' ? 'Remittance history' : 'Historial de remesas'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function KasScoreFactor({ active, label }) {
  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-emerald-500' : 'bg-gray-300'}`} />
      <span className={`text-xs ${active ? 'text-emerald-700 font-medium' : 'text-gray-400'}`}>
        {label}
      </span>
    </div>
  );
}
