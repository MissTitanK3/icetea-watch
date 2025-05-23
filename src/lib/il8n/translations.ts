// Translation strings for supported languages
export type TranslationKey =
  | 'homeTitle'
  | 'reportTitle'
  | 'privacyTagline'
  | 'startReport'
  | 'viewHeatmap'
  | 'supportProject'
  | 'home'
  | 'locationPrompt'
  | 'uploadMedia'
  | 'next'
  | 'back'
  | 'optionalNote'
  | 'gpsError'
  | 'quickExit'
  | 'warning'
  | 'visibleReports'
  | 'noReports'
  | 'agencies'
  | 'reported'
  | 'timeAgo'
  | 'reportWizard'
  | 'whoDidYouSee'
  | 'tapAllThatApply'
  | 'other'
  | 'placeholderAgencyExample'
  | 'tapMapOrGPS'
  | 'submit'
  | 'zoomOutForSafety'
  | 'haveMedia'
  | 'mediaFundingNotice'
  | 'whyUpload'
  | 'mediaPrivacyNote'
  | 'finish'
  | 'liveReportPreview'
  | 'otherAgency'
  | 'noneSelected'
  | 'location'
  | 'media'
  | 'notSet'
  | 'noFileUploaded'
  | 'findMe'
  | 'locationDenied'
  | 'copyToClipboard'
  | 'copiedToClipboard'
  | 'kyrTitle'
  | 'kyrIntro'
  | 'languageSupportInvite'
  | 'translationTemplate'
  | 'includesReference'
  | 'existingTranslations'
  | 'kyrSection1Title'
  | 'kyrSection1Bullet1'
  | 'kyrSection1Bullet2'
  | 'kyrSection1Bullet3'
  | 'kyrSection1Bullet4'
  | 'kyrSection1Bullet5'
  | 'kyrSection2Title'
  | 'kyrSection2Intro'
  | 'kyrSection2Bullet1'
  | 'kyrSection2Bullet2'
  | 'kyrSection2Bullet3'
  | 'kyrSection2Bullet4'
  | 'kyrSection2Bullet5'
  | 'kyrSection2Bullet6'
  | 'kyrSection2Bullet7'
  | 'kyrSection2Bullet8'
  | 'kyrSection2Bullet9'
  | 'kyrSection2Note1'
  | 'kyrSection2Note2'
  | 'requestLanguageSupport'
  | 'agency.ICE'
  | 'agency.Police'
  | 'agency.Sheriff'
  | 'agency.Border Patrol'
  | 'agency.Immigration Court'
  | 'agency.Unmarked'
  | 'agency.Military'
  | 'agency.Detention Facility';

export const TRANSLATIONS: Record<string, Record<TranslationKey, string>> = {
  en: {
    // Homepage
    homeTitle: '🧊 ICE Tea Watch',
    privacyTagline: 'Privacy-safe community reporting for ICE and law enforcement activity.',
    startReport: 'Start Report',
    viewHeatmap: 'View Heatmap',
    supportProject: 'Support The Project (ko-fi)',
    requestLanguageSupport: 'Request Language Support',

    // Heatmap
    reportTitle: 'Community Report Heatmap',
    'agency.ICE': 'ICE',
    'agency.Police': 'Police',
    'agency.Sheriff': 'Sheriff',
    'agency.Border Patrol': 'Border Patrol',
    'agency.Immigration Court': 'Immigration Court',
    'agency.Detention Facility': 'Detention Facility',
    'agency.Unmarked': 'Unmarked',
    'agency.Military': 'Military',

    // Heatlayer
    visibleReports: 'Visible Reports',
    noReports: 'No reports in current view.',
    agencies: 'Agencies:',
    reported: 'Reported:',
    timeAgo: ' ago',
    findMe: 'Where am I?',
    locationDenied: 'Location access was denied or is unavailable.',

    // Wizard
    reportWizard: 'Report Wizard',
    whoDidYouSee: 'Who did you see?',
    tapAllThatApply: 'Tap all that apply.',
    other: 'Other:',
    placeholderAgencyExample: 'e.g., Federal Marshals, Private Contractor',
    tapMapOrGPS: 'Tap the map or allow GPS.',
    submit: 'Submit',
    zoomOutForSafety: 'For safety, zoom out if this location is too specific.',
    haveMedia: 'Do you have photo or video?',
    mediaFundingNotice: 'When we get community funding, we will be able to add photo and video submissions.',
    whyUpload: 'Why upload?',
    mediaPrivacyNote:
      'Media is never shown publicly. Only verified community partners can review reports. EXIF data is stripped.',
    optionalNote: 'Optional, but helps with credibility.',

    // FormPreview
    liveReportPreview: 'Live Report Preview',
    otherAgency: 'Other Agency:',
    noneSelected: 'None selected',
    location: 'Location:',
    media: 'Meldia:',
    notSet: 'Not Set',
    noFileUploaded: 'No file uploaded',

    locationPrompt: 'Where did it happen?',
    uploadMedia: 'Upload media',
    gpsError: 'No GPS detected. Please enter an address.',

    // General
    next: 'Continue',
    back: 'Back',
    home: 'Home',
    quickExit: 'Quick Exit',
    warning: '⚠️ Do not geotag individuals. This map is for broad community awareness only.',
    finish: 'Finish',
    copyToClipboard: 'Copy To Clipboard',
    copiedToClipboard: 'Copied To Clipboard!',

    // Know your rights
    kyrTitle: 'Know Your Rights',
    kyrIntro:
      'All individuals in the United States have rights, regardless of immigration status. The following information can help you protect yourself and your family, and defend your rights.',

    kyrSection1Title: '1. Create a safety plan',
    kyrSection1Bullet1: 'Identify your emergency contacts and memorize their phone numbers.',
    kyrSection1Bullet2: 'Provide your child’s school or day care with an emergency contact to pick up your child.',
    kyrSection1Bullet3:
      'Provide written authorization for your emergency contact to make medical and legal decisions for your child.',
    kyrSection1Bullet4:
      'Tell your loved ones that if you are detained by ICE, they can try to find you using ICE’s detainee locator: https://locator.ice.gov/odls/#/search',
    kyrSection1Bullet5: 'Learn about guardianship options if you are a parent in Illinois or Indiana (PDF guides).',

    kyrSection2Title: '2. Defend your rights',
    kyrSection2Intro:
      'All persons in the United States have constitutional protections, including the right to remain silent. During any interaction with law enforcement:',
    kyrSection2Bullet1:
      'Stay calm. Do not run, argue, resist, or fight the officer. Keep your hands visible. Notify them before reaching for anything.',
    kyrSection2Bullet2: 'Do not lie about your immigration status or provide false documents.',
    kyrSection2Bullet3:
      'At a traffic stop, ask whether the officer is from ICE or CBP. Immigration officers sometimes call themselves “police.”',
    kyrSection2Bullet4:
      'If you are documented: Carry proof of status (e.g., green card or work permit) if you are over 18.',
    kyrSection2Bullet5:
      'If you are undocumented: You can remain silent. Do not answer questions about your immigration status.',
    kyrSection2Bullet6: 'If someone knocks on your door: Don’t open it. ICE needs a judge-signed warrant to enter.',
    kyrSection2Bullet7: 'If outdoors and ICE is nearby: Move indoors if possible.',
    kyrSection2Bullet8: 'If you are a citizen and feel safe: Record or document the event without interfering.',
    kyrSection2Bullet9: 'Do not post unverified alerts or put yourself in harm’s way.',

    kyrSection2Note1: 'ICE “warrants” are not signed by judges. They do not give agents permission to enter your home.',
    kyrSection2Note2:
      'Teach children not to open the door. Officers cannot enter without consent unless they have a proper warrant.',

    // Request Language Support
    languageSupportInvite:
      "If your language isn't supported yet, you're welcome to help translate! Use the template below and email it to:",
    translationTemplate: 'Translation Template',
    existingTranslations: 'Existing Translations',
    includesReference: 'This includes English and Spanish for reference.',
  },
  es: {
    // Homepage
    homeTitle: '🧊 Vigilancia ICE Tea',
    privacyTagline: 'Reportes comunitarios seguros y privados sobre ICE y actividad policial.',
    startReport: 'Iniciar reporte',
    viewHeatmap: 'Ver mapa de calor',
    supportProject: 'Apoya el proyecto (ko-fi)',
    requestLanguageSupport: 'Solicitar soporte de idioma',

    // Heatmap
    reportTitle: 'Mapa de Reportes Comunitarios',
    'agency.ICE': 'ICE',
    'agency.Police': 'Policía',
    'agency.Sheriff': 'Alguacil',
    'agency.Border Patrol': 'Patrulla Fronteriza',
    'agency.Immigration Court': 'Tribunal de Inmigración',
    'agency.Detention Facility': 'Centro de Detención',
    'agency.Unmarked': 'Sin identificar',
    'agency.Military': 'Militar',

    // Heatlayer
    visibleReports: 'Reportes visibles',
    noReports: 'No hay reportes en la vista actual.',
    agencies: 'Agencias:',
    reported: 'Reportado:',
    timeAgo: ' hace',
    findMe: '¿Dónde estoy?',
    locationDenied: 'El acceso a la ubicación fue denegado o no está disponible.',

    // Wizard
    reportWizard: 'Asistente de Reporte',
    whoDidYouSee: '¿A quién viste?',
    tapAllThatApply: 'Toca todas las que correspondan.',
    other: 'Otro:',
    placeholderAgencyExample: 'p. ej., Alguaciles Federales, Contratista Privado',
    tapMapOrGPS: 'Toca el mapa o permite el GPS.',
    submit: 'Enviar',
    zoomOutForSafety: 'Por seguridad, aleja el mapa si esta ubicación es demasiado específica.',
    haveMedia: '¿Tienes foto o video?',
    mediaFundingNotice: 'Cuando recibamos financiación comunitaria, podremos añadir envíos de fotos y videos.',
    whyUpload: '¿Por qué subir?',
    mediaPrivacyNote:
      'Los archivos nunca se muestran públicamente. Solo socios comunitarios verificados pueden revisar los reportes. Los datos EXIF se eliminan.',
    optionalNote: 'Opcional, pero mejora la credibilidad.',

    // FormPreview
    liveReportPreview: 'Vista previa del reporte en vivo',
    otherAgency: 'Otra agencia:',
    noneSelected: 'Ninguno seleccionado',
    location: 'Ubicación:',
    media: 'Archivo:',
    notSet: 'No establecido',
    noFileUploaded: 'No se subió ningún archivo',

    locationPrompt: '¿Dónde ocurrió?',
    uploadMedia: 'Subir archivo',
    gpsError: 'No se detectó GPS. Ingresa una dirección manual.',

    // General
    home: 'Inicio',
    next: 'Continuar',
    back: 'Atrás',
    quickExit: 'Salida rápida',
    finish: 'Finalizar',
    warning: '⚠️ No geolocalices a individuos. Este mapa es solo para conciencia comunitaria.',
    copyToClipboard: 'Copiar al portapapeles',
    copiedToClipboard: '¡Copiado al portapapeles!',

    // Know your rights
    kyrTitle: 'Conozca sus derechos',
    kyrIntro:
      'Todas las personas en los Estados Unidos tienen derechos, sin importar su estatus migratorio. Esta información puede ayudarle a protegerse y proteger a su familia.',

    kyrSection1Title: '1. Cree un plan de seguridad',
    kyrSection1Bullet1: 'Identifique sus contactos de emergencia y memorice sus números.',
    kyrSection1Bullet2: 'Proporcione a la escuela o guardería de su hijo/a un contacto de emergencia para recogerlo/a.',
    kyrSection1Bullet3:
      'Autorice por escrito a su contacto de emergencia para tomar decisiones médicas y legales por su hijo/a.',
    kyrSection1Bullet4:
      'Diga a sus seres queridos que, si lo detiene ICE, pueden intentar encontrarlo usando este localizador: https://locator.ice.gov/odls/#/search',
    kyrSection1Bullet5: 'Lea más sobre tutela legal para inmigrantes en Illinois e Indiana (PDF).',

    kyrSection2Title: '2. Defienda sus derechos',
    kyrSection2Intro:
      'Todas las personas en EE. UU. tienen protecciones constitucionales, incluido el derecho a guardar silencio. Durante cualquier interacción con autoridades:',
    kyrSection2Bullet1:
      'Mantenga la calma. No corra, discuta ni pelee. Mantenga sus manos visibles y anuncie cualquier movimiento.',
    kyrSection2Bullet2: 'No mienta sobre su estatus migratorio ni entregue documentos falsos.',
    kyrSection2Bullet3:
      'En un control de tránsito, pregunte si el oficial es de ICE o CBP. A veces se hacen pasar por "policía".',
    kyrSection2Bullet4: 'Si tiene estatus legal: Lleve siempre prueba de su estatus si es mayor de 18 años.',
    kyrSection2Bullet5:
      'Si no tiene papeles: Puede guardar silencio. No está obligado a responder preguntas sobre su estatus.',
    kyrSection2Bullet6: 'Si tocan su puerta: No la abra. ICE necesita una orden firmada por un juez para entrar.',
    kyrSection2Bullet7: 'Si está afuera y ve a ICE: Muévase a un lugar seguro bajo techo.',
    kyrSection2Bullet8: 'Si es ciudadano y se siente seguro: Grabe o anote lo que observe sin interferir.',
    kyrSection2Bullet9: 'No publique información no verificada ni se arriesgue innecesariamente.',

    kyrSection2Note1: 'Las "órdenes" de ICE no están firmadas por jueces y no permiten entrar a su casa.',
    kyrSection2Note2:
      'Enseñe a sus hijos a no abrir la puerta. Los agentes no pueden entrar sin su consentimiento o una orden judicial válida.',

    // Request Language Support
    languageSupportInvite:
      'Si tu idioma aún no está disponible, ¡puedes ayudar a traducir! Usa la plantilla a continuación y envíala por correo a:',
    translationTemplate: 'Plantilla de traducción',
    existingTranslations: 'Traducciones existentes',
    includesReference: 'Esto incluye inglés y español como referencia.',
  },
  // Add more languages as needed
};

export type SupportedLang = keyof typeof TRANSLATIONS;
