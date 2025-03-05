// src/services/user.service.ts
import User, { IUser } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Registers a new user.
 *
 * @param userData - Partial data for creating a user.
 * @returns The created user (without password).
 * @throws An error if the user already exists.
 */
export const registerUserService = async (
  userData: Partial<IUser>
): Promise<IUser> => {
  // Check if a user with the provided email already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password (assumes userData.password is provided)
  const hashedPassword = await bcrypt.hash(userData.password as string, 10);

  // Create a new user with the hashed password and provided data
  const newUser = new User({
    name: userData.name,
    email: userData.email,
    role: userData.role,
    password: hashedPassword,
    workshop: userData.workshop, // Optional field if user is linked to a workshop
  });

  // Save the user in the database
  const savedUser = await newUser.save();

  // Remove the password field before returning
  savedUser.password = "";
  return savedUser;
};

/**
 * Authenticates a user and generates a JWT token.
 *
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns A JWT token string.
 * @throws An error if the credentials are invalid.
 */
export const loginUserService = async (
  email: string,
  password: string
): Promise<string> => {
  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // Compare the provided password with the stored hashed password
  const passwordMatches = await bcrypt.compare(password, user.password);
  if (!passwordMatches) {
    throw new Error("Invalid credentials");
  }

  // Generate a JWT token with the user's id and role
  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET || "secret",
    { expiresIn: "1d" }
  );

  return token;
};

/**
 * Retrieves all users.
 *
 * @returns An array of users without the password field.
 */
export const getUsersService = async (): Promise<IUser[]> => {
  return await User.find().select("-password");
};

/**
 * Retrieves a single user by its ID.
 *
 * @param id - The ID of the user.
 * @returns The user if found (without password), or null otherwise.
 */
export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  return await User.findById(id).select("-password");
};

/**
 * Updates an existing user.
 *
 * @param id - The ID of the user to update.
 * @param updateData - The data to update.
 * @returns The updated user (without password) or null if not found.
 */
export const updateUserService = async (
  id: string,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  // If password is being updated, hash the new password
  if (updateData.password) {
    updateData.password = await bcrypt.hash(updateData.password, 10);
  }

  // Find the user by ID and update the provided fields
  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  }).select("-password");
  return updatedUser;
};

/**
 * Deletes a user by its ID.
 *
 * @param id - The ID of the user to delete.
 * @returns The deleted user (without password) or null if not found.
 */
export const deleteUserService = async (id: string): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (deletedUser) {
    deletedUser.password = "";
  }
  return deletedUser;
};
