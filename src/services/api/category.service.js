import { createBaseService } from './base.service'

export function useCategorieService() {
  const baseService = createBaseService('/category')

  return {
    ...baseService,
  }
}
