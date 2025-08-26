"use server";

import { revalidatePath } from "next/cache";
import { handleError } from "../../utils/utils";
import { connectToDatabase } from "../../lib/mongoose";
import { isAdmin } from "@/utils/isAdmin";
import userModel from "@/lib/database/models/user.model";

export async function createUser(user: any) {
  try {
    await connectToDatabase();

    const newUser = await userModel.create(user);

    return newUser;
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(user: any) {
  const { clerkUserId } = user;
  try {
    await connectToDatabase();

    const updatedUser = await userModel.findOneAndUpdate(
      { clerkUserId },
      user,
      {
        new: true,
      }
    );

    if (!updatedUser) throw new Error("User update failed");

    return updatedUser;
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const userToDelete = await userModel.findOne({ clerkId });

    if (!userToDelete) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await userModel.findByIdAndDelete(userToDelete._id);

    revalidatePath("/users");

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    handleError(error);
    return {
      success: false,
      message: "An error occurred while deleting the user",
    };
  }
}

export async function getUsers() {
  const isAdminCheck = await isAdmin();

  if (!isAdminCheck) {
    throw new Error("Access denied");
  }

  try {
    await connectToDatabase();

    const users = await userModel.find({});

    console.log(users);

    if (!users || users.length === 0) throw new Error("User not found");

    const cleanedUsers = users.map((user) => {
      return {
        ...user.toObject(),
        _id: user._id.toString(),
        avatar: user.avatar,
        email: user.email,
        username: user.username,
        role: user.role,
        phone: user.phone,
      };
    });

    return cleanedUsers;
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  const isAdminCheck = await isAdmin();

  if (!isAdminCheck) {
    throw new Error("Access denied");
  }
  try {
    await connectToDatabase();

    const user = await userModel.findOne({ clerkId: userId });

    if (!user) throw new Error("User not found");

    return {
      success: true,
      message: "User successfully",
      user,
    };
  } catch (error) {
    handleError(error);
  }
}
