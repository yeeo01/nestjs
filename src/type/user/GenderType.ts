export const GenderType = {
  MALE: 'MALE',
  FEMALE: 'FEMALE'
} as const

export type TGenderType = (typeof GenderType)[keyof typeof GenderType]
