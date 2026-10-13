export interface CountryTimeZone {
  code: string;
  name: string;
  timezones: string[]; // IANA time zone IDs
}

// Compact list of commonly used countries & their primary time zones.
// This is not an exhaustive geopolitical list, but covers major regions
// so users can browse world times by country.
export const COUNTRY_TIMEZONES: CountryTimeZone[] = [
  { code: 'US', name: 'United States', timezones: ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles', 'America/Anchorage', 'Pacific/Honolulu'] },
  { code: 'CA', name: 'Canada', timezones: ['America/St_Johns', 'America/Halifax', 'America/Toronto', 'America/Winnipeg', 'America/Edmonton', 'America/Vancouver'] },
  { code: 'GB', name: 'United Kingdom', timezones: ['Europe/London'] },
  { code: 'IE', name: 'Ireland', timezones: ['Europe/Dublin'] },
  { code: 'FR', name: 'France', timezones: ['Europe/Paris'] },
  { code: 'DE', name: 'Germany', timezones: ['Europe/Berlin'] },
  { code: 'ES', name: 'Spain', timezones: ['Europe/Madrid', 'Atlantic/Canary'] },
  { code: 'IT', name: 'Italy', timezones: ['Europe/Rome'] },
  { code: 'NL', name: 'Netherlands', timezones: ['Europe/Amsterdam'] },
  { code: 'BE', name: 'Belgium', timezones: ['Europe/Brussels'] },
  { code: 'CH', name: 'Switzerland', timezones: ['Europe/Zurich'] },
  { code: 'SE', name: 'Sweden', timezones: ['Europe/Stockholm'] },
  { code: 'NO', name: 'Norway', timezones: ['Europe/Oslo'] },
  { code: 'DK', name: 'Denmark', timezones: ['Europe/Copenhagen'] },
  { code: 'FI', name: 'Finland', timezones: ['Europe/Helsinki'] },
  { code: 'PT', name: 'Portugal', timezones: ['Europe/Lisbon', 'Atlantic/Madeira', 'Atlantic/Azores'] },
  { code: 'BR', name: 'Brazil', timezones: ['America/Sao_Paulo', 'America/Manaus', 'America/Fortaleza'] },
  { code: 'AR', name: 'Argentina', timezones: ['America/Argentina/Buenos_Aires'] },
  { code: 'MX', name: 'Mexico', timezones: ['America/Mexico_City', 'America/Monterrey', 'America/Tijuana'] },
  { code: 'AU', name: 'Australia', timezones: ['Australia/Sydney', 'Australia/Brisbane', 'Australia/Adelaide', 'Australia/Perth', 'Australia/Darwin'] },
  { code: 'NZ', name: 'New Zealand', timezones: ['Pacific/Auckland', 'Pacific/Chatham'] },
  { code: 'JP', name: 'Japan', timezones: ['Asia/Tokyo'] },
  { code: 'CN', name: 'China', timezones: ['Asia/Shanghai'] },
  { code: 'IN', name: 'India', timezones: ['Asia/Kolkata'] },
  { code: 'PK', name: 'Pakistan', timezones: ['Asia/Karachi'] },
  { code: 'ID', name: 'Indonesia', timezones: ['Asia/Jakarta', 'Asia/Makassar', 'Asia/Jayapura'] },
  { code: 'SG', name: 'Singapore', timezones: ['Asia/Singapore'] },
  { code: 'MY', name: 'Malaysia', timezones: ['Asia/Kuala_Lumpur'] },
  { code: 'TH', name: 'Thailand', timezones: ['Asia/Bangkok'] },
  { code: 'VN', name: 'Vietnam', timezones: ['Asia/Ho_Chi_Minh'] },
  { code: 'PH', name: 'Philippines', timezones: ['Asia/Manila'] },
  { code: 'KR', name: 'South Korea', timezones: ['Asia/Seoul'] },
  { code: 'AE', name: 'United Arab Emirates', timezones: ['Asia/Dubai'] },
  { code: 'SA', name: 'Saudi Arabia', timezones: ['Asia/Riyadh'] },
  { code: 'IL', name: 'Israel', timezones: ['Asia/Jerusalem'] },
  { code: 'TR', name: 'Türkiye', timezones: ['Europe/Istanbul'] },
  { code: 'EG', name: 'Egypt', timezones: ['Africa/Cairo'] },
  { code: 'ZA', name: 'South Africa', timezones: ['Africa/Johannesburg'] },
  { code: 'NG', name: 'Nigeria', timezones: ['Africa/Lagos'] },
  { code: 'KE', name: 'Kenya', timezones: ['Africa/Nairobi'] },
  { code: 'RU', name: 'Russia', timezones: ['Europe/Moscow', 'Asia/Yekaterinburg', 'Asia/Novosibirsk', 'Asia/Vladivostok'] },
  { code: 'UA', name: 'Ukraine', timezones: ['Europe/Kyiv'] },
  { code: 'PL', name: 'Poland', timezones: ['Europe/Warsaw'] },
  { code: 'AT', name: 'Austria', timezones: ['Europe/Vienna'] },
  { code: 'GR', name: 'Greece', timezones: ['Europe/Athens'] },
  { code: 'CH', name: 'Switzerland', timezones: ['Europe/Zurich'] },
];
