/**
 * 🔷 Quba TypeScript Declarations
 *
 * Ambient types para IntelliSense en VS Code sin migrar a TS.
 * Uso: añade a tu tsconfig.json → "include": ["types/**/*.d.ts", "js/**/*.js"]
 *      con "checkJs": true en compilerOptions.
 */

// ============ CORE ============
declare const APP_VERSION: string;
declare const APP_BUILD_DATE: string;
declare const APP_NAME: string;
declare const APP_CODENAME: string;

declare function escapeHtml(s: string | null | undefined): string;
declare function escapeAttr(s: string | null | undefined): string;
declare function esc(s: string | null | undefined): string;

// ============ I18N ============
declare function t(key: string, fallback?: string): string;
declare function setLocale(locale: 'es' | 'ar' | 'en'): void;
declare function applyTranslations(): void;
declare const currentLocale: 'es' | 'ar' | 'en';
declare const translations: Record<'es' | 'ar' | 'en', Record<string, string>>;

// ============ CONFIG ============
interface QubaConfig {
  CALCULATION_METHODS: Record<number, string>;
  RECITERS: Array<{ id: string; name: string; language: string; country?: string }>;
  TRANSLATIONS: Record<string, string>;
  API: {
    ALADHAN: string;
    QURAN: string;
    UMMAH: string;
    PROXY: string;
  };
  USE_LOCAL_DUAS: boolean;
  CACHE_TTL: number;
}
declare const CONFIG: QubaConfig;

interface QubaSettings {
  locale: 'es' | 'ar' | 'en';
  theme: 'auto' | 'light' | 'dark';
  calculationMethod: number;
  reciter: string;
  translation: string;
  adhan?: { voice1: string; voice2: string; muted: boolean; volume: number };
}

interface QubaAppState {
  location: { lat: number; lng: number; city?: string; country?: string } | null;
  timings: Record<string, string> | null;
  hijri: { day: number; month: { en: string; ar: string }; year: number } | null;
  settings: QubaSettings;
}
declare const AppState: QubaAppState;

// ============ STORAGE ============
interface QubaStorage {
  set(key: string, value: any, ttl?: number | null): void;
  get<T = any>(key: string): T | null;
  remove(key: string): void;
  loadSettings(): QubaSettings;
  saveSettings(): void;
}
declare const Storage: QubaStorage;

// ============ CACHE DB (IndexedDB) ============
interface QubaCacheDB {
  set(key: string, value: any, ttl?: number | null): Promise<boolean>;
  get<T = any>(key: string): Promise<T | null>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
  keys(): Promise<string[]>;
}
declare const CacheDB: QubaCacheDB;

// ============ ROUTER ============
interface QubaRoute {
  page: any;
  tabId: string | null;
  method?: string;
}

interface QubaRouter {
  routes: Record<string, QubaRoute>;
  current: { route: QubaRoute; name: string; params: Record<string, any> } | null;
  history: Array<{ name: string; params: Record<string, any> }>;
  go(routeName: string, params?: Record<string, any>, options?: { fromPopState?: boolean }): Promise<void>;
  push(routeName: string, params?: Record<string, any>): void;
  back(): void;
  init(): void;
}
declare const Router: QubaRouter;

// ============ API ============
interface QubaAPI {
  getPrayerTimes(lat: number, lng: number, method?: number): Promise<{ timings: Record<string, string> }>;
  getHijriDate(date?: Date): Promise<{ day: number; month: { en: string; ar: string }; year: number }>;
  getHijriCalendarMonth(month: number, year: number): Promise<any[]>;
  getPrayerCalendar(lat: number, lng: number, month: number, year: number, method?: number): Promise<any[]>;
  getSurahList(): Promise<Array<{ number: number; name: string; englishName: string; numberOfAyahs: number }>>;
  getSurahWithTranslation(surahNumber: number, translation?: string, reciter?: string): Promise<any>;
  getDuaCategories(): Promise<Array<{ id: string; name: string; description?: string; count: number }>>;
  getDuasByCategory(categoryId: string): Promise<any[]>;
}
declare const API: QubaAPI;

// ============ SERVICES ============
declare const WakeLockService: {
  acquire(reason?: string): Promise<boolean>;
  release(): void;
};

declare const PrayerNotifications: {
  isEnabled(): boolean;
  requestPermission(): Promise<boolean>;
  enable(): Promise<boolean>;
  disable(): void;
  clearAll(): void;
  scheduleDay(timings: Record<string, string>, locale?: string): void;
  notify(title: string, body: string, tag: string): Promise<void>;
};

declare const AdhanService: {
  VOICES: Array<{ id: string; name: string; url: string }>;
  playFullAdhan(onEnded?: () => void): void;
  preview(voiceId: string): void;
  stopPreview(): void;
  setVolume(v: number): void;
};

declare const PWAInstall: {
  init(): void;
};

declare const EventBus: {
  on(action: string, handler: (el: HTMLElement, event: Event) => void): void;
  init(): void;
};

declare const LocalDuasService: {
  getCategories(): Promise<{ success: boolean; data: any[] }>;
  getCategory(id: string, lang?: string): Promise<{ success: boolean; data: any[] }>;
  getMeta(id: string): any;
};

// ============ UTIL ============
declare function showToast(message: string, duration?: number): void;
declare function closeModal(): void;
declare function showModal(html: string): void;
declare function applyTheme(): void;
