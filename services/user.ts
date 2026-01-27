// services/user.ts

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;
  birthDate?: string;
  image?: string;
  [key: string]: any;
}

export const getUserProfile = async (token: string): Promise<User> => {
  try {
    const res = await fetch("https://dummyjson.com/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error fetching user profile: ${res.status}`);
    }

    const data: User = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching user profile", error);
    throw error;
  }
};
