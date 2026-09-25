const ADMIN_USER = 'Smartstore';
const ADMIN_PASS = 'newstore';
const STORAGE_KEY = 'smartstore_admin_auth';

export function isAdminAuthed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === 'true';
  } catch {
    return false;
  }
}

export function adminLogin(user: string, pass: string): boolean {
  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
    return true;
  }
  return false;
}

export function adminLogout() {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
