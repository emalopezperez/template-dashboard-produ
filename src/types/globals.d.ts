export {};

export type Roles = "admin" | "moderator";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}

export interface User {
  clerkUserId: string;
  firstName?: string;
  lastName?: string;
  email: string;
  imageUrl?: string;
  phone?: number;
}


