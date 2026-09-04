# v14 Fix Progress Tracker

## User's 5 issues
1. ✅ **Splash simplified**: markup replaced with just `<img>` + fast `.splash-spinner`; CSS block replaced (main.css lines ~115-317 → lightweight version); `hideSplash` timing 2600ms → 300ms.
2. ✅ **Hijri calendar day/virtue mismatch**: `js/hijri.js` rewritten with multi-lang virtues (es/ar/en) + `getWeekdayName(dow, lang)` + `getHolidayName(m,d,lang)`. `pages/calendar.js`: `renderSelectedDay` now uses `getWeekdayName` from JS Date (localized), safe ISO date parsing; `renderDay` also uses safe ISO parsing.
3. ⏳ **Home monthly button** goes to `Router.go('prayer')` — needs to pass `{tab:'monthly'}` param, and PrayerPage needs to honor it.
4. ⏳ **Monthly table white/transparent**: CSS uses `var(--bg-card)` and `#B8941F` (unreadable in dark). Vars defined: `--card` (not `--bg-card`), `--text`, `--text-secondary`. Need to replace `var(--bg-card)` → `var(--card)` in `.monthly-table-wrap`, and make today-row text readable in both themes.
5. ⏳ **Quran settings button missing on surah list**: settings button only exists in reader (`pages/quran.js:202`). Add it to the surah-list header (`render()` around line 42-51).

## Icons + design issues (task 4 mixed with 3)
- Font Awesome CDN loaded with SRI — verify integrity hash isn't wrong; if it fails silently, all `<i class="fa*">` icons vanish. Fix: relax SRI (remove attribute) OR verify hash for 6.5.0 all.min.css.

## Files already modified in v14
- `index.html` — splash markup replaced (lines 54-103 → 10 lines)
- `css/main.css` — splash block replaced (line 115 onwards, added lightweight ~50 lines)
- `js/app.js` — hideSplash wait: 2600 → 300
- `js/hijri.js` — full rewrite, multi-lang
- `pages/calendar.js` — renderSelectedDay + renderDay: safe date parsing, localized weekday

## Files still to modify
- `pages/home.js` — CTA button add `{tab:'monthly'}` to Router.go
- `pages/prayer.js` — accept param, set activeTab
- `css/screens.css` — fix `.monthly-table-wrap` var + today text color
- `pages/quran.js` — add settings button in list header
- `index.html` — relax FA SRI (remove `integrity` attr) so icons always load

## Constants
- v14 project: `/home/user/quba-web-v14`
- Version bump: 4.4.0 → 4.5.0 (both `js/version.js` and `sw.js`)
- Build cmd: `node build/bundle.js --min`
- Zip cmd: `cd /home/user/quba-web-v14 && zip -r /home/user/quba-web-v14.zip . -x "*.DS_Store" "node_modules/*"`
