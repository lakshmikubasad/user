export interface JwtPayload {
    username: string;
    sub: number; // This will typically be the user's ID from the database
   // role: string; // The role of the user (admin, editor, viewer)
  }