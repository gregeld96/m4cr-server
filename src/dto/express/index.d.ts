export {}

declare global {
  namespace Express {
    export interface Request {
      authorized: {
        id: string;
        email: string;
        roleId: string;
        roleName: string;
      }
    }
  }
  
  export interface Error {
    provider: string;
    status?: number;
  }
}
