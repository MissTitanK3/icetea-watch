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
  | 'agency.ICE'
  | 'agency.Police'
  | 'agency.Sheriff'
  | 'agency.Border Patrol'
  | 'agency.Immigration Court'
  | 'agency.Detention Facility';

export const TRANSLATIONS: Record<string, Record<TranslationKey, string>> = {
  en: {
    // Homepage
    homeTitle: '🧊 ICE Tea Watch',
    privacyTagline: 'Privacy-safe community reporting for ICE and law enforcement activity.',
    startReport: 'Start Report',
    viewHeatmap: 'View Heatmap',
    supportProject: 'Support The Project (ko-fi)',

    // Heatmap
    reportTitle: 'Community Report Heatmap',
    'agency.ICE': 'ICE',
    'agency.Police': 'Police',
    'agency.Sheriff': 'Sheriff',
    'agency.Border Patrol': 'Border Patrol',
    'agency.Immigration Court': 'Immigration Court',
    'agency.Detention Facility': 'Detention Facility',
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
  },
  es: {
    // Homepage
    homeTitle: '🧊 Vigilancia ICE Tea',
    privacyTagline: 'Reportes comunitarios seguros y privados sobre ICE y actividad policial.',
    startReport: 'Iniciar reporte',
    viewHeatmap: 'Ver mapa de calor',
    supportProject: 'Apoya el proyecto (ko-fi)',
    // Heatmap
    reportTitle: 'Mapa de Reportes Comunitarios',
    'agency.ICE': 'ICE',
    'agency.Police': 'Policía',
    'agency.Sheriff': 'Alguacil',
    'agency.Border Patrol': 'Patrulla Fronteriza',
    'agency.Immigration Court': 'Tribunal de Inmigración',
    'agency.Detention Facility': 'Centro de Detención',
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
  },
  // Add more languages as needed
};

export type SupportedLang = keyof typeof TRANSLATIONS;
