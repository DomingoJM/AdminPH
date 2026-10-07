'use client';

import React from 'react';
import { MapPin, Building2, Globe } from 'lucide-react';
import { REGIONS, getCountryConfig } from '@/data/regions';
import { t } from '@/data/translations';

export default function RegionSelector({ lang, selectedRegion, selectedCountry, onRegionSelect, onCountrySelect }) {
  const handleRegionClick = (regionId) => {
    onRegionSelect(regionId);
    // Si es US, no hay sub-países, directamente seleccionado
    if (regionId === 'us') {
      onCountrySelect('us');
    } else {
      onCountrySelect(null);
    }
  };

  const regionIcons = {
    us: Building2,
    europe: Globe,
    latam: MapPin,
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          {t(lang, 'step1_title')}
        </h2>
        <p className="text-gray-500 text-base md:text-lg">
          {t(lang, 'step1_description')}
        </p>
      </div>

      {/* Selector de Región */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {REGIONS.map((region) => {
          const Icon = regionIcons[region.id] || Globe;
          const isSelected = selectedRegion === region.id;

          return (
            <button
              key={region.id}
              onClick={() => handleRegionClick(region.id)}
              className={`
                relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 transition-all duration-200
                hover:shadow-lg hover:scale-[1.02] cursor-pointer
                ${isSelected
                  ? 'border-emerald-500 bg-emerald-50 shadow-md'
                  : 'border-gray-200 bg-white hover:border-emerald-300'
                }
              `}
            >
              <span className="text-4xl mb-3">{region.flag}</span>
              <Icon className={`w-5 h-5 mb-1 ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`} />
              <span className={`font-semibold text-lg ${isSelected ? 'text-emerald-700' : 'text-gray-800'}`}>
                {t(lang, `region_${region.id}`)}
              </span>
              {isSelected && (
                <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selector de País (solo para Europa y LatAm) */}
      {selectedRegion && selectedRegion !== 'us' && (
        <div className="space-y-3 animate-fadeIn">
          <label className="block text-sm font-medium text-gray-700">
            {t(lang, 'country_select')}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {REGIONS.find((r) => r.id === selectedRegion)?.countries?.map((country) => {
              const isSelected = selectedCountry === country.id;

              return (
                <button
                  key={country.id}
                  onClick={() => onCountrySelect(country.id)}
                  className={`
                    flex items-center gap-2 p-3 rounded-xl border-2 transition-all duration-200
                    hover:shadow-md cursor-pointer text-left
                    ${isSelected
                      ? 'border-emerald-500 bg-emerald-50 shadow-sm'
                      : 'border-gray-200 bg-white hover:border-emerald-300'
                    }
                  `}
                >
                  <span className="text-2xl">{country.flag}</span>
                  <span className={`text-sm font-medium ${isSelected ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {country.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Preview de documentos requeridos para el país seleccionado */}
      {selectedCountry && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 animate-fadeIn">
          <p className="text-sm text-blue-800 font-medium mb-2">
            {t(lang, 'identity_doc_help')}
          </p>
          <div className="flex flex-wrap gap-2">
            {getCountryConfig(selectedCountry)?.identityDocs?.map((doc) => (
              <span
                key={doc.id}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
              >
                {doc.label[lang] || doc.label.es}
                {doc.required && <span className="ml-1 text-red-500">*</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
