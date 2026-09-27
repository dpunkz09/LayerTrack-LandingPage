/**
 * Reads APK release metadata from release.json at request time.
 *
 * This file lives at the project root and is written by /admin.
 * Reading it with fs.readFileSync on every request means changes from
 * the admin page are live immediately — no rebuild or PM2 restart needed.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname }         from 'node:path';
import { fileURLToPath }            from 'node:url';

const ROOT         = resolve(dirname(fileURLToPath(import.meta.url)), '../../');
export const RELEASE_JSON = resolve(ROOT, 'release.json');

export interface ReleaseData {
  APK_URL:     string;
  APK_NAME:    string;
  APP_VERSION: string;
  APP_SIZE:    string;
}

const DEFAULTS: ReleaseData = {
  APK_URL:     'https://github.com/dpunkz09/LayerTrack/releases/download/v1.3/LayerTrack.v.1.3.apk',
  APK_NAME:    'LayerTrack.v1.3.apk',
  APP_VERSION: '1.3',
  APP_SIZE:    '16.1 MB',
};

/**
 * Returns the current release metadata.
 * Falls back to DEFAULTS if release.json is missing or malformed.
 */
export function getRelease(): ReleaseData {
  if (!existsSync(RELEASE_JSON)) return { ...DEFAULTS };
  try {
    const raw  = readFileSync(RELEASE_JSON, 'utf8');
    const json = JSON.parse(raw) as Partial<ReleaseData>;
    return {
      APK_URL:     json.APK_URL     || DEFAULTS.APK_URL,
      APK_NAME:    json.APK_NAME    || DEFAULTS.APK_NAME,
      APP_VERSION: json.APP_VERSION || DEFAULTS.APP_VERSION,
      APP_SIZE:    json.APP_SIZE    || DEFAULTS.APP_SIZE,
    };
  } catch {
    return { ...DEFAULTS };
  }
}

/**
 * Writes updated release metadata to release.json atomically.
 */
export function saveRelease(data: ReleaseData): void {
  writeFileSync(RELEASE_JSON, JSON.stringify(data, null, 2) + '\n', 'utf8');
}
