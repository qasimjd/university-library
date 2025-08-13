import { unstable_cache } from 'next/cache';
import User from '@/database/Models/user.model';
import { connectToMongoDB } from '../mongodb';

// Cache the user data fetching to improve performance
export const getCachedUserData = unstable_cache(
  async (userId: string) => {
    if (!userId) return null;
    try {
      await connectToMongoDB();
      const user = await User.findOne({ _id: userId });
      return user;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  },
  ['user-data'],
  { revalidate: 60 * 5 } // Cache for 5 minutes
);

export const checkUserBorrowedBook = unstable_cache(
  async (userId: string, bookId: string) => {
    if (!userId || !bookId) return false;
    try {
      await connectToMongoDB();
      const user = await User.findOne({ _id: userId, borrowBooksIds: bookId });
      return !!user;
    } catch (error) {
      console.error("Error checking borrowed book:", error);
      return false;
    }
  },
  ['user-borrowed-book'],
  { revalidate: 60 * 5 } // Cache for 5 minutes
);
