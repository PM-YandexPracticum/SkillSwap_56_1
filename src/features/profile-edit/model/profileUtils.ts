import type { AuthUser } from '@/shared/types'
import { getAuthUser, saveAuthUser } from '@/features/auth/model/authUtils'

export function getProfileUser(): AuthUser | null {
  return getAuthUser()
}

export function updateProfileUser(
  data: Omit<AuthUser, 'token'>,
): AuthUser {
  return saveAuthUser(data)
}
