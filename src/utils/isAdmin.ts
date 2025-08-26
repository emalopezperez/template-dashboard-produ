import { auth } from "@clerk/nextjs/server";

export const isAdmin = async (): Promise<boolean> => {
  const { sessionClaims } = await auth();

  if (
    !sessionClaims?.metadata?.role ||
    sessionClaims.metadata.role !== "admin"
  ) {
    return false;
  }

  return true;
};
