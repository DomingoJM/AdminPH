/**
 * translations.js
 * Traducciones para MiKasApp - Español, English, Português
 */

export const translations = {
  es: {
    // General
    app_name: 'MiKasApp',
    app_tagline: 'Tu camino a una vivienda propia',
    loading: 'Cargando...',

    // Navbar
    nav_home: 'Inicio',
    nav_about: 'Nosotros',
    nav_contact: 'Contacto',

    // Language
    lang_es: 'Español',
    lang_en: 'English',
    lang_pt: 'Português',

    // Onboarding - Step 1: Region Selection
    onboarding_title: 'Cuéntanos de dónde nos visitas',
    onboarding_subtitle: 'Personalizaremos tu experiencia según tu ubicación',
    step1_title: '¿Dónde vives?',
    step1_description: 'Selecciona tu país de residencia para ofrecerte opciones adaptadas a tu realidad',
    region_us: 'Estados Unidos',
    region_europe: 'Europa',
    region_latam: 'América Latina',
    country_select: 'Selecciona tu país',
    country_placeholder: 'Elige tu país de residencia',
    btn_next: 'Siguiente',
    btn_back: 'Anterior',
    btn_continue: 'Continuar',
    btn_start: 'Comenzar',

    // Onboarding - Step 2: Identity
    step2_title: 'Tu identidad',
    step2_description: 'Necesitamos verificar tu identidad según los documentos disponibles en tu país',
    full_name: 'Nombre completo',
    full_name_placeholder: 'Ej: María García López',
    email: 'Correo electrónico',
    email_placeholder: 'tu@correo.com',
    phone: 'Teléfono',
    phone_placeholder: '+1 (555) 000-0000',
    identity_doc: 'Documento de identidad',
    identity_doc_help: 'Los documentos requeridos varían según tu país',
    optional: 'Opcional',
    required: 'Obligatorio',

    // Onboarding - Step 3: Income
    step3_title: 'Tus ingresos',
    step3_description: 'En MiKasApp creemos que todos merecen acceso a vivienda, sin importar el tipo de ingreso',
    income_type: '¿Cómo generas tus ingresos principalmente?',
    income_type_placeholder: 'Selecciona tu tipo de ingreso',
    monthly_income: 'Ingreso mensual aproximado',
    monthly_income_placeholder: 'Ej: 3,000',
    informal_info_title: '¿Trabajas de forma informal?',
    informal_info_text: 'No te preocupes. En MiKasApp evaluamos más que un recibo de nómina. Nuestro KasScore considera tu historial de pagos de servicios, remesas, alquileres y más para construir tu perfil crediticio.',
    income_currency: 'Moneda',
    remittance_amount: '¿Recibes remesas? ¿Cuánto aprox. al mes?',
    remittance_placeholder: 'Ej: 500',

    // Onboarding - Step 4: Goals
    step4_title: 'Tu meta de vivienda',
    step4_description: 'Cuéntanos qué buscas para encontrarte las mejores opciones',
    housing_goal: '¿Cuál es tu objetivo principal?',
    goal_buy: 'Comprar mi primera vivienda',
    goal_improve: 'Mejorar la vivienda que tengo',
    goal_rent: 'Encontrar una renta accesible',
    goal_build: 'Construir mi vivienda',
    goal_invest: 'Invertir en propiedad',
    timeline: '¿En qué plazo planeas lograrlo?',
    timeline_6m: 'Menos de 6 meses',
    timeline_1y: '6 meses - 1 año',
    timeline_2y: '1 - 2 años',
    timeline_3y: '2 - 3 años',
    timeline_exploring: 'Solo explorando opciones',
    down_payment: '¿Cuánto tienes ahorrado para inicial?',
    down_payment_placeholder: 'Ej: 5,000',
    programs_interest: '¿Te interesan los programas de subsidio/ayuda?',
    programs_yes: 'Sí, quiero conocerlos',
    programs_maybe: 'Tal vez más adelante',
    programs_no: 'No por ahora',

    // Onboarding - Completion
    step_complete_title: '¡Bienvenido a MiKasApp!',
    step_complete_subtitle: 'Tu perfil está listo. Así es como te vemos:',
    kasscore_title: 'Tu KasScore preliminar',
    kasscore_description: 'Basado en la información que nos diste, esta es tu puntuación preliminar. Se actualizará conforme agregues más datos.',
    kasscore_info: 'El KasScore es una alternativa al crédito tradicional que considera tus ingresos informales, historial de remesas, pagos de servicios y más.',
    profile_summary: 'Resumen de tu perfil',
    profile_country: 'País',
    profile_income: 'Tipo de ingreso',
    profile_goal: 'Meta',
    profile_timeline: 'Plazo',
    profile_programs: 'Programas disponibles',
    btn_go_dashboard: 'Ir a mi panel',
    btn_add_documents: 'Agregar documentos',

    // KasScore
    kasscore_low: 'Inicial',
    kasscore_medium: 'En crecimiento',
    kasscore_high: 'Sólido',
    kasscore_excellent: 'Excelente',
    kasscore_improve: 'Tips para mejorar tu KasScore',
    kasscore_tip_1: 'Registra tus pagos de servicios públicos',
    kasscore_tip_2: 'Conecta tu cuenta de remesas',
    kasscore_tip_3: 'Agrega referencias de pagos de alquiler',
    kasscore_tip_4: 'Sube comprobantes de ingresos recurrentes',

    // Progress
    progress_step: 'Paso {current} de {total}',

    // Validation
    validation_required: 'Este campo es obligatorio',
    validation_email: 'Ingresa un correo electrónico válido',
    validation_phone: 'Ingresa un número de teléfono válido',
    validation_min_length: 'Mínimo {min} caracteres',

    // Footer
    footer_privacy: 'Tu información está protegida y solo se usa para personalizar tu experiencia',
    footer_terms: 'Términos y condiciones',
    footer_privacy_policy: 'Política de privacidad',
  },

  en: {
    // General
    app_name: 'MiKasApp',
    app_tagline: 'Your path to homeownership',
    loading: 'Loading...',

    // Navbar
    nav_home: 'Home',
    nav_about: 'About',
    nav_contact: 'Contact',

    // Language
    lang_es: 'Español',
    lang_en: 'English',
    lang_pt: 'Português',

    // Onboarding - Step 1: Region Selection
    onboarding_title: 'Tell us where you\'re visiting from',
    onboarding_subtitle: 'We\'ll customize your experience based on your location',
    step1_title: 'Where do you live?',
    step1_description: 'Select your country of residence so we can offer options adapted to your reality',
    region_us: 'United States',
    region_europe: 'Europe',
    region_latam: 'Latin America',
    country_select: 'Select your country',
    country_placeholder: 'Choose your country of residence',
    btn_next: 'Next',
    btn_back: 'Back',
    btn_continue: 'Continue',
    btn_start: 'Start',

    // Onboarding - Step 2: Identity
    step2_title: 'Your identity',
    step2_description: 'We need to verify your identity based on the documents available in your country',
    full_name: 'Full name',
    full_name_placeholder: 'E.g.: María García López',
    email: 'Email',
    email_placeholder: 'your@email.com',
    phone: 'Phone',
    phone_placeholder: '+1 (555) 000-0000',
    identity_doc: 'Identity document',
    identity_doc_help: 'Required documents vary by country',
    optional: 'Optional',
    required: 'Required',

    // Onboarding - Step 3: Income
    step3_title: 'Your income',
    step3_description: 'At MiKasApp we believe everyone deserves access to housing, regardless of income type',
    income_type: 'How do you primarily earn your income?',
    income_type_placeholder: 'Select your income type',
    monthly_income: 'Approximate monthly income',
    monthly_income_placeholder: 'E.g.: 3,000',
    informal_info_title: 'Do you work informally?',
    informal_info_text: 'Don\'t worry. At MiKasApp we evaluate more than a payroll receipt. Our KasScore considers your utility payment history, remittances, rent payments and more to build your credit profile.',
    income_currency: 'Currency',
    remittance_amount: 'Do you receive remittances? How much approx. per month?',
    remittance_placeholder: 'E.g.: 500',

    // Onboarding - Step 4: Goals
    step4_title: 'Your housing goal',
    step4_description: 'Tell us what you\'re looking for so we can find the best options for you',
    housing_goal: 'What is your main goal?',
    goal_buy: 'Buy my first home',
    goal_improve: 'Improve my current home',
    goal_rent: 'Find affordable rent',
    goal_build: 'Build my home',
    goal_invest: 'Invest in property',
    timeline: 'What is your timeline?',
    timeline_6m: 'Less than 6 months',
    timeline_1y: '6 months - 1 year',
    timeline_2y: '1 - 2 years',
    timeline_3y: '2 - 3 years',
    timeline_exploring: 'Just exploring options',
    down_payment: 'How much do you have saved for down payment?',
    down_payment_placeholder: 'E.g.: 5,000',
    programs_interest: 'Are you interested in subsidy/assistance programs?',
    programs_yes: 'Yes, I want to learn about them',
    programs_maybe: 'Maybe later',
    programs_no: 'Not now',

    // Onboarding - Completion
    step_complete_title: 'Welcome to MiKasApp!',
    step_complete_subtitle: 'Your profile is ready. Here\'s how we see you:',
    kasscore_title: 'Your preliminary KasScore',
    kasscore_description: 'Based on the information you provided, this is your preliminary score. It will update as you add more data.',
    kasscore_info: 'KasScore is an alternative to traditional credit that considers your informal income, remittance history, utility payments and more.',
    profile_summary: 'Profile summary',
    profile_country: 'Country',
    profile_income: 'Income type',
    profile_goal: 'Goal',
    profile_timeline: 'Timeline',
    profile_programs: 'Available programs',
    btn_go_dashboard: 'Go to my dashboard',
    btn_add_documents: 'Add documents',

    // KasScore
    kasscore_low: 'Initial',
    kasscore_medium: 'Growing',
    kasscore_high: 'Solid',
    kasscore_excellent: 'Excellent',
    kasscore_improve: 'Tips to improve your KasScore',
    kasscore_tip_1: 'Register your utility payments',
    kasscore_tip_2: 'Connect your remittance account',
    kasscore_tip_3: 'Add rent payment references',
    kasscore_tip_4: 'Upload proof of recurring income',

    // Progress
    progress_step: 'Step {current} of {total}',

    // Validation
    validation_required: 'This field is required',
    validation_email: 'Please enter a valid email',
    validation_phone: 'Please enter a valid phone number',
    validation_min_length: 'Minimum {min} characters',

    // Footer
    footer_privacy: 'Your information is protected and only used to personalize your experience',
    footer_terms: 'Terms & conditions',
    footer_privacy_policy: 'Privacy policy',
  },

  pt: {
    // General
    app_name: 'MiKasApp',
    app_tagline: 'Seu caminho para a casa própria',
    loading: 'Carregando...',

    // Navbar
    nav_home: 'Início',
    nav_about: 'Sobre',
    nav_contact: 'Contato',

    // Language
    lang_es: 'Español',
    lang_en: 'English',
    lang_pt: 'Português',

    // Onboarding - Step 1: Region Selection
    onboarding_title: 'Conte-nos de onde você nos visita',
    onboarding_subtitle: 'Personalizaremos sua experiência com base na sua localização',
    step1_title: 'Onde você mora?',
    step1_description: 'Selecione seu país de residência para oferecermos opções adaptadas à sua realidade',
    region_us: 'Estados Unidos',
    region_europe: 'Europa',
    region_latam: 'América Latina',
    country_select: 'Selecione seu país',
    country_placeholder: 'Escolha seu país de residência',
    btn_next: 'Próximo',
    btn_back: 'Voltar',
    btn_continue: 'Continuar',
    btn_start: 'Começar',

    // Onboarding - Step 2: Identity
    step2_title: 'Sua identidade',
    step2_description: 'Precisamos verificar sua identidade com base nos documentos disponíveis no seu país',
    full_name: 'Nome completo',
    full_name_placeholder: 'Ex: Maria Garcia Lopez',
    email: 'E-mail',
    email_placeholder: 'seu@email.com',
    phone: 'Telefone',
    phone_placeholder: '+55 (11) 00000-0000',
    identity_doc: 'Documento de identidade',
    identity_doc_help: 'Os documentos exigidos variam por país',
    optional: 'Opcional',
    required: 'Obrigatório',

    // Onboarding - Step 3: Income
    step3_title: 'Sua renda',
    step3_description: 'Na MiKasApp acreditamos que todos merecem acesso à moradia, independentemente do tipo de renda',
    income_type: 'Como você ganha sua renda principalmente?',
    income_type_placeholder: 'Selecione seu tipo de renda',
    monthly_income: 'Renda mensal aproximada',
    monthly_income_placeholder: 'Ex: 3.000',
    informal_info_title: 'Você trabalha de forma informal?',
    informal_info_text: 'Não se preocupe. Na MiKasApp avaliamos mais que um contracheque. Nosso KasScore considera seu histórico de pagamentos de contas, remessas, aluguéis e mais para construir seu perfil de crédito.',
    income_currency: 'Moeda',
    remittance_amount: 'Você recebe remessas? Quanto aprox. por mês?',
    remittance_placeholder: 'Ex: 500',

    // Onboarding - Step 4: Goals
    step4_title: 'Sua meta de moradia',
    step4_description: 'Conte-nos o que você procura para encontrarmos as melhores opções',
    housing_goal: 'Qual é seu objetivo principal?',
    goal_buy: 'Comprar minha primeira casa',
    goal_improve: 'Melhorar a casa que tenho',
    goal_rent: 'Encontrar um aluguel acessível',
    goal_build: 'Construir minha casa',
    goal_invest: 'Investir em imóvel',
    timeline: 'Em que prazo você planeja conseguir?',
    timeline_6m: 'Menos de 6 meses',
    timeline_1y: '6 meses - 1 ano',
    timeline_2y: '1 - 2 anos',
    timeline_3y: '2 - 3 anos',
    timeline_exploring: 'Apenas explorando opções',
    down_payment: 'Quanto você tem guardado para entrada?',
    down_payment_placeholder: 'Ex: 5.000',
    programs_interest: 'Você tem interesse em programas de subsídio/assistência?',
    programs_yes: 'Sim, quero conhecê-los',
    programs_maybe: 'Talvez mais tarde',
    programs_no: 'Agora não',

    // Onboarding - Completion
    step_complete_title: 'Bem-vindo à MiKasApp!',
    step_complete_subtitle: 'Seu perfil está pronto. É assim que o vemos:',
    kasscore_title: 'Seu KasScore preliminar',
    kasscore_description: 'Com base nas informações que você nos deu, esta é sua pontuação preliminar. Ela será atualizada conforme você adicionar mais dados.',
    kasscore_info: 'O KasScore é uma alternativa ao crédito tradicional que considera sua renda informal, histórico de remessas, pagamentos de contas e mais.',
    profile_summary: 'Resumo do perfil',
    profile_country: 'País',
    profile_income: 'Tipo de renda',
    profile_goal: 'Meta',
    profile_timeline: 'Prazo',
    profile_programs: 'Programas disponíveis',
    btn_go_dashboard: 'Ir para meu painel',
    btn_add_documents: 'Adicionar documentos',

    // KasScore
    kasscore_low: 'Inicial',
    kasscore_medium: 'Crescendo',
    kasscore_high: 'Sólido',
    kasscore_excellent: 'Excelente',
    kasscore_improve: 'Dicas para melhorar seu KasScore',
    kasscore_tip_1: 'Registre seus pagamentos de contas de serviços',
    kasscore_tip_2: 'Conecte sua conta de remessas',
    kasscore_tip_3: 'Adicione referências de pagamentos de aluguel',
    kasscore_tip_4: 'Envie comprovantes de renda recorrente',

    // Progress
    progress_step: 'Passo {current} de {total}',

    // Validation
    validation_required: 'Este campo é obrigatório',
    validation_email: 'Insira um e-mail válido',
    validation_phone: 'Insira um número de telefone válido',
    validation_min_length: 'Mínimo de {min} caracteres',

    // Footer
    footer_privacy: 'Suas informações estão protegidas e só são usadas para personalizar sua experiência',
    footer_terms: 'Termos e condições',
    footer_privacy_policy: 'Política de privacidade',
  },
};

/**
 * Obtener traducción por clave e idioma
 * @param {string} lang - Código de idioma ('es', 'en', 'pt')
 * @param {string} key - Clave de traducción
 * @param {object} params - Parámetros de reemplazo (ej: { current: 1, total: 4 })
 * @returns {string}
 */
export function t(lang, key, params = {}) {
  const text = translations[lang]?.[key] || translations.es[key] || key;
  return Object.entries(params).reduce(
    (acc, [k, v]) => acc.replace(`{${k}}`, v),
    text
  );
}

export default translations;
