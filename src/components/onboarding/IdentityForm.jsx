'use client';

import React from 'react';
import { User, Mail, Phone, FileText, Info } from 'lucide-react';
import { getCountryConfig, getIdentityDocs } from '@/data/regions';
import { t } from '@/data/translations';

export default function IdentityForm({ lang, selectedCountry, formData, onChange }) {
  const countryConfig = getCountryConfig(selectedCountry);
  const identityDocs = getIdentityDocs(selectedCountry);
  const currency = countryConfig?.currency || 'USD';

  const handleChange = (field, value) => {
    onChange({ ...formData, [field]: value });
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {t(lang, 'step2_title')}
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          {t(lang, 'step2_description')}
        </p>
        {countryConfig && (
          <div className="flex items-center justify-center gap-2 mt-2">
            <span className="text-2xl">{countryConfig.flag}</span>
            <span className="text-sm text-gray-500">{countryConfig.name}</span>
          </div>
        )}
      </div>

      <div className="space-y-5">
        {/* Nombre completo */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <User className="w-4 h-4 text-emerald-600" />
            {t(lang, 'full_name')}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder={t(lang, 'full_name_placeholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Correo electrónico */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Mail className="w-4 h-4 text-emerald-600" />
            {t(lang, 'email')}
            <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder={t(lang, 'email_placeholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Teléfono */}
        <div className="space-y-1.5">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Phone className="w-4 h-4 text-emerald-600" />
            {t(lang, 'phone')}
          </label>
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder={t(lang, 'phone_placeholder')}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Documentos de identidad dinámicos según país */}
        {identityDocs.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <h3 className="text-sm font-medium text-gray-700">
                {t(lang, 'identity_doc')}
              </h3>
            </div>

            {identityDocs.map((doc) => (
              <div key={doc.id} className="space-y-1.5">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  {doc.label[lang] || doc.label.es}
                  {doc.required ? (
                    <span className="text-red-500">*</span>
                  ) : (
                    <span className="text-xs text-gray-400">({t(lang, 'optional')})</span>
                  )}
                </label>
                <input
                  type="text"
                  value={formData[doc.id] || ''}
                  onChange={(e) => handleChange(doc.id, e.target.value)}
                  placeholder={doc.placeholder?.[lang] || doc.placeholder?.es || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
                />
                {doc.helpText && (
                  <div className="flex items-start gap-2 mt-1">
                    <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-600">
                      {doc.helpText[lang] || doc.helpText.es}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
