export interface Users {
  id?: string
}

declare global {
  namespace Express {
    export interface Request {
      result: {
        id?: string
        name?: string
        phone?: string
        email?: string
        gender?: boolean
        password?: string
        emailCode?: number
        title?: string
        categoryId?: string
      }
      userId: string
    }
  }
}
