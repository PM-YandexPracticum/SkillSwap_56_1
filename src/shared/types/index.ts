// ─── Skill ───────────────────────────────────────────────

export type SkillType = 'teach' | 'learn'

export interface Skill {
  id: string
  title: string
  description: string
  type: SkillType
  category: string
  subcategory: string
  tags: string[]
  imageUrl: string | null
  authorId: string
  likesCount: number
  createdAt: string
}

// ─── User ────────────────────────────────────────────────

export interface User {
  id: string
  name: string
  email: string
  avatarUrl: string | null
  createdAt: string
  city: string
  age: number
  dateOfBirth: string
  gender: string
  description: string
  skillsToLearn: string[]
}

// ─── Request ─────────────────────────────────────────────

export type RequestStatus = 'pending' | 'accepted' | 'rejected' | 'inProgress' | 'done'

export interface SwapRequest {
  id: string
  skillId: string
  fromUserId: string
  toUserId: string
  status: RequestStatus
  createdAt: string
  updatedAt: string
}

// ─── Auth ────────────────────────────────────────────────

export interface AuthUser {
  id: string
  name: string
  email: string
  token: string
}
