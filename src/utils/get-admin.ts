"use server";

import { currentUser } from "@clerk/nextjs/server";

export const getAdmin= async () => {
  const admin = await currentUser();
  return admin;
};
