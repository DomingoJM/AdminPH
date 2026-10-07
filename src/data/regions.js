/**
 * regions.js
 * Configuración de regiones, países y documentos de identidad para MiKasApp
 * Soporte: Estados Unidos, Europa y América Latina
 */

export const REGIONS = [
  {
    id: 'us',
    name: 'Estados Unidos',
    flag: '🇺🇸',
    languages: ['es', 'en'],
    currency: 'USD',
    identityDocs: [
      {
        id: 'ssn',
        label: {
          es: 'Número de Seguro Social (SSN)',
          en: 'Social Security Number (SSN)',
          pt: 'Número de Seguro Social (SSN)',
        },
        placeholder: {
          es: '000-00-0000',
          en: '000-00-0000',
          pt: '000-00-0000',
        },
        mask: '999-99-9999',
        required: false,
        helpText: {
          es: 'Si no tienes SSN, puedes usar tu ITIN',
          en: 'If you don\'t have an SSN, you can use your ITIN',
          pt: 'Se você não tem SSN, pode usar seu ITIN',
        },
      },
      {
        id: 'itin',
        label: {
          es: 'Número de Identificación Personal del Contribuyente (ITIN)',
          en: 'Individual Taxpayer Identification Number (ITIN)',
          pt: 'Número de Identificação de Contribuinte (ITIN)',
        },
        placeholder: {
          es: '9XX-XX-XXXX',
          en: '9XX-XX-XXXX',
          pt: '9XX-XX-XXXX',
        },
        mask: '999-99-9999',
        required: false,
        helpText: {
          es: 'Para residentes sin estatus migratorio regularizado',
          en: 'For residents without regularized immigration status',
          pt: 'Para residentes sem status migratório regularizado',
        },
      },
    ],
    incomeTypes: [
      { id: 'formal', label: { es: 'Empleo formal (W-2)', en: 'Formal employment (W-2)', pt: 'Emprego formal (W-2)' } },
      { id: 'informal', label: { es: 'Empleo informal / efectivo', en: 'Informal / cash employment', pt: 'Emprego informal / dinheiro' } },
      { id: 'self_employed', label: { es: 'Trabajador independiente (1099)', en: 'Self-employed (1099)', pt: 'Trabalhador autônomo (1099)' } },
      { id: 'remittances', label: { es: 'Recibo remesas del exterior', en: 'Receive remittances from abroad', pt: 'Recebo remessas do exterior' } },
      { id: 'mixed', label: { es: 'Ingresos mixtos', en: 'Mixed income', pt: 'Renda mista' } },
    ],
    housingPrograms: [
      { id: 'fha', name: 'FHA Loan', description: { es: 'Préstamo FHA - solo 3.5% de inicial', en: 'FHA Loan - only 3.5% down', pt: 'Empréstimo FHA - apenas 3.5% de entrada' } },
      { id: 'usda', name: 'USDA Loan', description: { es: 'Préstamo USDA - 0% de inicial en zonas rurales', en: 'USDA Loan - 0% down in rural areas', pt: 'Empréstimo USDA - 0% de entrada em áreas rurais' } },
      { id: 'va', name: 'VA Loan', description: { es: 'Préstamo VA - para veteranos, 0% inicial', en: 'VA Loan - for veterans, 0% down', pt: 'Empréstimo VA - para veteranos, 0% de entrada' } },
      { id: 'first_time', name: 'First-Time Homebuyer', description: { es: 'Programas para compradores de primera vez', en: 'First-time homebuyer programs', pt: 'Programas para compradores de primeira vez' } },
    ],
    heroImage: '/images/hero-us.jpg',
    mortgageRate: { min: 6.5, max: 7.5 },
  },
  {
    id: 'europe',
    name: 'Europa',
    flag: '🇪🇺',
    languages: ['es', 'en', 'pt'],
    currency: 'EUR',
    countries: [
      {
        id: 'es',
        name: 'España',
        flag: '🇪🇸',
        identityDocs: [
          {
            id: 'nie',
            label: { es: 'NIE (Número de Identidad de Extranjero)', en: 'NIE (Foreigner Identity Number)', pt: 'NIE (Número de Identidade de Estrangeiro)' },
            placeholder: { es: 'X0000000X', en: 'X0000000X', pt: 'X0000000X' },
            required: true,
            helpText: {
              es: 'Documento obligatorio para extranjeros en España',
              en: 'Required document for foreigners in Spain',
              pt: 'Documento obrigatório para estrangeiros na Espanha',
            },
          },
          {
            id: 'dni',
            label: { es: 'DNI (si tienes nacionalidad española)', en: 'DNI (if you have Spanish nationality)', pt: 'DNI (se você tem nacionalidade espanhola)' },
            placeholder: { es: '00000000X', en: '00000000X', pt: '00000000X' },
            required: false,
            helpText: {
              es: 'Solo si ya tienes la ciudadanía española',
              en: 'Only if you already have Spanish citizenship',
              pt: 'Somente se você já tem cidadania espanhola',
            },
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Contrato laboral', en: 'Employment contract', pt: 'Contrato de trabalho' } },
          { id: 'informal', label: { es: 'Trabajo sin contrato', en: 'Work without contract', pt: 'Trabalho sem contrato' } },
          { id: 'self_employed', label: { es: 'Autónomo', en: 'Self-employed', pt: 'Autônomo' } },
          { id: 'remittances', label: { es: 'Recibo remesas', en: 'Receive remittances', pt: 'Recebo remessas' } },
        ],
        housingPrograms: [
          { id: 'vpo', name: 'VPO', description: { es: 'Vivienda de Protección Oficial', en: 'Officially Protected Housing', pt: 'Habitação de Proteção Oficial' } },
          { id: 'ico', name: 'ICO', description: { es: 'Líneas ICO para vivienda', en: 'ICO housing lines', pt: 'Linhas ICO para habitação' } },
        ],
        heroImage: '/images/hero-spain.jpg',
        mortgageRate: { min: 2.5, max: 4.0 },
      },
      {
        id: 'pt',
        name: 'Portugal',
        flag: '🇵🇹',
        identityDocs: [
          {
            id: 'nif',
            label: { es: 'NIF (Número de Identificación Fiscal)', en: 'NIF (Tax Identification Number)', pt: 'NIF (Número de Identificação Fiscal)' },
            placeholder: { es: '000000000', en: '000000000', pt: '000000000' },
            required: true,
            helpText: {
              es: 'Número fiscal obligatorio en Portugal',
              en: 'Required tax number in Portugal',
              pt: 'Número fiscal obrigatório em Portugal',
            },
          },
          {
            id: 'cc_pt',
            label: { es: 'Cartão de Cidadão', en: 'Citizen Card', pt: 'Cartão de Cidadão' },
            placeholder: { es: '00000000 0 X000', en: '00000000 0 X000', pt: '00000000 0 X000' },
            required: false,
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Contrato de trabajo', en: 'Employment contract', pt: 'Contrato de trabalho' } },
          { id: 'informal', label: { es: 'Trabajo informal', en: 'Informal work', pt: 'Trabalho informal' } },
          { id: 'self_employed', label: { es: 'Trabajador independiente', en: 'Self-employed', pt: 'Trabalhador independente' } },
          { id: 'remittances', label: { es: 'Recibo remesas', en: 'Receive remittances', pt: 'Recebo remessas' } },
        ],
        housingPrograms: [
          { id: 'pt_porto', name: 'Programa Porto', description: { es: 'Ayuda a la compra de vivienda en Portugal', en: 'Home purchase assistance in Portugal', pt: 'Apoio à compra de habitação em Portugal' } },
        ],
        heroImage: '/images/hero-portugal.jpg',
        mortgageRate: { min: 3.0, max: 4.5 },
      },
      {
        id: 'it',
        name: 'Italia',
        flag: '🇮🇹',
        identityDocs: [
          {
            id: 'codice_fiscale',
            label: { es: 'Codice Fiscale', en: 'Italian Fiscal Code', pt: 'Código Fiscal Italiano' },
            placeholder: { es: 'RSSMRA85M01H501Z', en: 'RSSMRA85M01H501Z', pt: 'RSSMRA85M01H501Z' },
            required: true,
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Contrato de trabajo', en: 'Employment contract', pt: 'Contrato de trabalho' } },
          { id: 'informal', label: { es: 'Trabajo informal', en: 'Informal work', pt: 'Trabalho informal' } },
          { id: 'self_employed', label: { es: 'Trabajador autónomo', en: 'Self-employed', pt: 'Trabalhador autônomo' } },
        ],
        housingPrograms: [],
        heroImage: '/images/hero-italy.jpg',
        mortgageRate: { min: 3.0, max: 4.5 },
      },
      {
        id: 'de',
        name: 'Alemania',
        flag: '🇩🇪',
        identityDocs: [
          {
            id: 'steuer_id',
            label: { es: 'Steuer-ID (Número de identificación fiscal)', en: 'Steuer-ID (Tax ID)', pt: 'Steuer-ID (Número de identificação fiscal)' },
            placeholder: { es: '12 345 678 901', en: '12 345 678 901', pt: '12 345 678 901' },
            required: true,
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Contrato de trabajo', en: 'Employment contract', pt: 'Contrato de trabalho' } },
          { id: 'self_employed', label: { es: 'Trabajador autónomo', en: 'Self-employed', pt: 'Trabalhador autônomo' } },
        ],
        housingPrograms: [],
        heroImage: '/images/hero-germany.jpg',
        mortgageRate: { min: 3.5, max: 4.5 },
      },
    ],
    heroImage: '/images/hero-europe.jpg',
    mortgageRate: { min: 2.5, max: 4.5 },
  },
  {
    id: 'latam',
    name: 'América Latina',
    flag: '🌎',
    languages: ['es', 'pt'],
    currency: null, // Varía por país
    countries: [
      {
        id: 'mx',
        name: 'México',
        flag: '🇲🇽',
        currency: 'MXN',
        identityDocs: [
          {
            id: 'curp',
            label: { es: 'CURP (Clave Única de Registro de Población)', en: 'CURP (Unique Population Registry Code)', pt: 'CURP (Código Único de Registro de População)' },
            placeholder: { es: 'XXXX000000XXXXXX00', en: 'XXXX000000XXXXXX00', pt: 'XXXX000000XXXXXX00' },
            required: true,
            helpText: {
              es: 'Documento obligatorio para trámites en México',
              en: 'Required document for procedures in Mexico',
              pt: 'Documento obrigatório para procedimentos no México',
            },
          },
          {
            id: 'rfc',
            label: { es: 'RFC (Registro Federal de Contribuyentes)', en: 'RFC (Federal Taxpayer Registry)', pt: 'RFC (Registro Federal de Contribuintes)' },
            placeholder: { es: 'XAXX010101000', en: 'XAXX010101000', pt: 'XAXX010101000' },
            required: false,
            helpText: {
              es: 'Necesario para procesos de crédito',
              en: 'Needed for credit processes',
              pt: 'Necessário para processos de crédito',
            },
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Empleo formal (IMSS)', en: 'Formal employment (IMSS)', pt: 'Emprego formal (IMSS)' } },
          { id: 'informal', label: { es: 'Empleo informal', en: 'Informal employment', pt: 'Emprego informal' } },
          { id: 'self_employed', label: { es: 'Trabajador independiente', en: 'Self-employed', pt: 'Trabalhador autônomo' } },
          { id: 'remittances', label: { es: 'Recibo remesas de EE.UU.', en: 'Receive remittances from US', pt: 'Recebo remessas dos EUA' } },
          { id: 'mixed', label: { es: 'Ingresos mixtos', en: 'Mixed income', pt: 'Renda mista' } },
        ],
        housingPrograms: [
          { id: 'infonavit', name: 'INFONAVIT', description: { es: 'Crédito INFONAVIT para trabajadores formales', en: 'INFONAVIT credit for formal workers', pt: 'Crédito INFONAVIT para trabalhadores formais' } },
          { id: 'fovissste', name: 'FOVISSSTE', description: { es: 'Crédito para trabajadores del Estado', en: 'Credit for government workers', pt: 'Crédito para servidores públicos' } },
          { id: 'cofinavit', name: 'Cofinavit', description: { es: 'Crédito conjunto INFONAVIT + banco', en: 'Joint INFONAVIT + bank credit', pt: 'Crédito conjunto INFONAVIT + banco' } },
        ],
        heroImage: '/images/hero-mexico.jpg',
        mortgageRate: { min: 9.0, max: 12.0 },
      },
      {
        id: 'co',
        name: 'Colombia',
        flag: '🇨🇴',
        currency: 'COP',
        identityDocs: [
          {
            id: 'cc',
            label: { es: 'Cédula de Ciudadanía', en: 'Citizenship Card (CC)', pt: 'Cédula de Cidadania' },
            placeholder: { es: '1.000.000.000', en: '1.000.000.000', pt: '1.000.000.000' },
            required: true,
          },
          {
            id: 'ce',
            label: { es: 'Cédula de Extranjería', en: 'Foreigner Card (CE)', pt: 'Cédula de Estrangeiro' },
            placeholder: { es: 'CE 00000000', en: 'CE 00000000', pt: 'CE 00000000' },
            required: false,
            helpText: {
              es: 'Si eres extranjero residente en Colombia',
              en: 'If you are a foreign resident in Colombia',
              pt: 'Se você é estrangeiro residente na Colômbia',
            },
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Empleo formal (contrato)', en: 'Formal employment (contract)', pt: 'Emprego formal (contrato)' } },
          { id: 'informal', label: { es: 'Empleo informal', en: 'Informal employment', pt: 'Emprego informal' } },
          { id: 'self_employed', label: { es: 'Trabajador independiente', en: 'Self-employed', pt: 'Trabalhador autônomo' } },
          { id: 'remittances', label: { es: 'Recibo remesas', en: 'Receive remittances', pt: 'Recebo remessas' } },
        ],
        housingPrograms: [
          { id: 'fsv', name: 'Fondo de Solidaridad Vivienda', description: { es: 'Subsidio de vivienda de interés social', en: 'Social housing subsidy', pt: 'Subsídio de habitação de interesse social' } },
          { id: 'cajaval', name: 'Cajas de Compensación', description: { es: 'Subsidio de vivienda vía Cajas', en: 'Housing subsidy via Cajas', pt: 'Subsídio de habitação via Cajas' } },
        ],
        heroImage: '/images/hero-colombia.jpg',
        mortgageRate: { min: 11.0, max: 15.0 },
      },
      {
        id: 'br',
        name: 'Brasil',
        flag: '🇧🇷',
        currency: 'BRL',
        identityDocs: [
          {
            id: 'cpf',
            label: { es: 'CPF (Cadastro de Pessoa Física)', en: 'CPF (Individual Taxpayer Registry)', pt: 'CPF (Cadastro de Pessoa Física)' },
            placeholder: { es: '000.000.000-00', en: '000.000.000-00', pt: '000.000.000-00' },
            mask: '999.999.999-99',
            required: true,
            helpText: {
              es: 'Documento fiscal obligatorio en Brasil',
              en: 'Required tax document in Brazil',
              pt: 'Documento fiscal obrigatório no Brasil',
            },
          },
          {
            id: 'rg',
            label: { es: 'RG (Registro General)', en: 'RG (ID Card)', pt: 'RG (Registro Geral)' },
            placeholder: { es: '00.000.000-0', en: '00.000.000-0', pt: '00.000.000-0' },
            required: false,
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'CLT (contrato formal)', en: 'CLT (formal contract)', pt: 'CLT (contrato formal)' } },
          { id: 'informal', label: { es: 'Trabajo informal', en: 'Informal work', pt: 'Trabalho informal' } },
          { id: 'self_employed', label: { es: 'MEI / Autónomo', en: 'MEI / Self-employed', pt: 'MEI / Autônomo' } },
          { id: 'remittances', label: { es: 'Recibo remesas', en: 'Receive remittances', pt: 'Recebo remessas' } },
        ],
        housingPrograms: [
          { id: 'minha_casa', name: 'Minha Casa Minha Vida', description: { es: 'Programa federal de vivienda', en: 'Federal housing program', pt: 'Programa federal de habitação' } },
          { id: 'fgts', name: 'FGTS', description: { es: 'Fondo de garantía para vivienda', en: 'Housing guarantee fund', pt: 'Fundo de garantia para habitação' } },
        ],
        heroImage: '/images/hero-brazil.jpg',
        mortgageRate: { min: 9.5, max: 13.0 },
      },
      {
        id: 'cl',
        name: 'Chile',
        flag: '🇨🇱',
        currency: 'CLP',
        identityDocs: [
          {
            id: 'rut',
            label: { es: 'RUT (Rol Único Tributario)', en: 'RUT (Unique Tax Role)', pt: 'RUT (Rol Único Tributário)' },
            placeholder: { es: '00.000.000-X', en: '00.000.000-X', pt: '00.000.000-X' },
            required: true,
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Contrato formal', en: 'Formal contract', pt: 'Contrato formal' } },
          { id: 'informal', label: { es: 'Trabajo informal', en: 'Informal work', pt: 'Trabalho informal' } },
          { id: 'self_employed', label: { es: 'Trabajador independiente', en: 'Self-employed', pt: 'Trabalhador autônomo' } },
        ],
        housingPrograms: [
          { id: 'ds1', name: 'DS1', description: { es: 'Subsidio habitacional DS1', en: 'DS1 housing subsidy', pt: 'Subsídio habitacional DS1' } },
        ],
        heroImage: '/images/hero-chile.jpg',
        mortgageRate: { min: 4.0, max: 6.0 },
      },
      {
        id: 'ar',
        name: 'Argentina',
        flag: '🇦🇷',
        currency: 'ARS',
        identityDocs: [
          {
            id: 'dni_ar',
            label: { es: 'DNI (Documento Nacional de Identidad)', en: 'DNI (National Identity Document)', pt: 'DNI (Documento Nacional de Identidade)' },
            placeholder: { es: '00.000.000', en: '00.000.000', pt: '00.000.000' },
            required: true,
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'En blanco', en: 'Formal employment', pt: 'Emprego formal' } },
          { id: 'informal', label: { es: 'En negro', en: 'Informal employment', pt: 'Emprego informal' } },
          { id: 'self_employed', label: { es: 'Monotributista / Autónomo', en: 'Self-employed', pt: 'Monotributista / Autônomo' } },
          { id: 'remittances', label: { es: 'Recibo remesas', en: 'Receive remittances', pt: 'Recebo remessas' } },
        ],
        housingPrograms: [
          { id: 'procrear', name: 'Procrear', description: { es: 'Programa nacional de vivienda', en: 'National housing program', pt: 'Programa nacional de habitação' } },
        ],
        heroImage: '/images/hero-argentina.jpg',
        mortgageRate: { min: 15.0, max: 25.0 },
      },
      {
        id: 'pe',
        name: 'Perú',
        flag: '🇵🇪',
        currency: 'PEN',
        identityDocs: [
          {
            id: 'dni_pe',
            label: { es: 'DNI (Documento Nacional de Identidad)', en: 'DNI (National Identity Document)', pt: 'DNI (Documento Nacional de Identidade)' },
            placeholder: { es: '00000000', en: '00000000', pt: '00000000' },
            required: true,
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Empleo formal', en: 'Formal employment', pt: 'Emprego formal' } },
          { id: 'informal', label: { es: 'Empleo informal', en: 'Informal employment', pt: 'Emprego informal' } },
          { id: 'self_employed', label: { es: 'Trabajador independiente', en: 'Self-employed', pt: 'Trabalhador autônomo' } },
          { id: 'remittances', label: { es: 'Recibo remesas', en: 'Receive remittances', pt: 'Recebo remessas' } },
        ],
        housingPrograms: [
          { id: 'mivivienda', name: 'MiVivienda', description: { es: 'Programa MiVivienda', en: 'MiVivienda program', pt: 'Programa MiVivienda' } },
        ],
        heroImage: '/images/hero-peru.jpg',
        mortgageRate: { min: 8.0, max: 12.0 },
      },
      {
        id: 'ec',
        name: 'Ecuador',
        flag: '🇪🇨',
        currency: 'USD',
        identityDocs: [
          {
            id: 'cedula_ec',
            label: { es: 'Cédula de Ciudadanía', en: 'Citizenship Card', pt: 'Cédula de Cidadania' },
            placeholder: { es: '0000000000', en: '0000000000', pt: '0000000000' },
            required: true,
          },
        ],
        incomeTypes: [
          { id: 'formal', label: { es: 'Empleo formal', en: 'Formal employment', pt: 'Emprego formal' } },
          { id: 'informal', label: { es: 'Empleo informal', en: 'Informal employment', pt: 'Emprego informal' } },
          { id: 'self_employed', label: { es: 'Trabajador independiente', en: 'Self-employed', pt: 'Trabalhador autônomo' } },
          { id: 'remittances', label: { es: 'Recibo remesas', en: 'Receive remittances', pt: 'Recebo remessas' } },
        ],
        housingPrograms: [],
        heroImage: '/images/hero-ecuador.jpg',
        mortgageRate: { min: 8.0, max: 11.0 },
      },
    ],
    heroImage: '/images/hero-latam.jpg',
    mortgageRate: null,
  },
];

/**
 * Obtener la configuración de un país específico
 */
export function getCountryConfig(countryId) {
  for (const region of REGIONS) {
    if (region.id === countryId) return region; // US no tiene countries
    if (region.countries) {
      const country = region.countries.find((c) => c.id === countryId);
      if (country) return country;
    }
  }
  return null;
}

/**
 * Obtener la región a la que pertenece un país
 */
export function getRegionForCountry(countryId) {
  for (const region of REGIONS) {
    if (region.id === countryId) return region;
    if (region.countries) {
      const found = region.countries.find((c) => c.id === countryId);
      if (found) return region;
    }
  }
  return null;
}

/**
 * Obtener todos los países disponibles (aplanados)
 */
export function getAllCountries() {
  const countries = [];
  for (const region of REGIONS) {
    if (region.countries) {
      for (const country of region.countries) {
        countries.push({ ...country, regionId: region.id, regionName: region.name });
      }
    } else {
      countries.push({
        id: region.id,
        name: region.name,
        flag: region.flag,
        currency: region.currency,
        regionId: region.id,
        regionName: region.name,
      });
    }
  }
  return countries;
}

/**
 * Obtener tipos de ingreso para un país
 */
export function getIncomeTypes(countryId) {
  const config = getCountryConfig(countryId);
  return config?.incomeTypes || [];
}

/**
 * Obtener programas de vivienda para un país
 */
export function getHousingPrograms(countryId) {
  const config = getCountryConfig(countryId);
  return config?.housingPrograms || [];
}

/**
 * Obtener documentos de identidad requeridos para un país
 */
export function getIdentityDocs(countryId) {
  const config = getCountryConfig(countryId);
  return config?.identityDocs || [];
}
