import { API_URL, API_ROOT, ApiError } from './api'

export interface AdminUser {
  id: number
  name: string
  email: string
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp(`(^|; )${name}=([^;]*)`))
  return match ? decodeURIComponent(match[2]) : null
}

async function ensureCsrfCookie() {
  await fetch(`${API_ROOT}/sanctum/csrf-cookie`, { credentials: 'include' })
}

export async function loginAdmin(email: string, password: string): Promise<AdminUser> {
  await ensureCsrfCookie()

  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const payload = await res.json().catch(() => null)
    throw new ApiError(res.status, payload)
  }

  const data = await res.json()
  return data.user as AdminUser
}

export async function logoutAdmin(): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-XSRF-TOKEN': getCookie('XSRF-TOKEN') ?? '',
    },
  })
}

export async function getCurrentAdmin(): Promise<AdminUser | null> {
  const res = await fetch(`${API_URL}/user`, {
    credentials: 'include',
    headers: { Accept: 'application/json' },
  })
  if (!res.ok) return null
  return (await res.json()) as AdminUser
}