import { Models } from "react-native-appwrite";

export interface MenuItem extends Models.Document {
  name: string;
  price: number;
  image_url: string;
  description: string;
  calories: number;
  protein: number;
  rating: number;
  type: string;
}

export interface Category extends Models.Document {
  name: string;
  description: string;
}

export interface User extends Models.Document {
  name: string;
  email: string;
  avatar: string;
}

export interface CartCustomization {
  id: string;
  name: string;
  price: number;
  type: string;
}

export interface CartItemType {
  id: string; // menu item id
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  customizations?: CartCustomization[];
}

export interface CartStore {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (id: string, customizations: CartCustomization[]) => void;
  increaseQty: (id: string, customizations: CartCustomization[]) => void;
  decreaseQty: (id: string, customizations: CartCustomization[]) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

interface TabBarIconProps {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}

interface PaymentInfoStripeProps {
  label: string;
  value: string;
  labelStyle?: string;
  valueStyle?: string;
}

interface CustomButtonProps {
  onPress?: () => void;
  title?: string;
  style?: string;
  leftIcon?: React.ReactNode;
  textStyle?: string;
  isLoading?: boolean;
}

interface CustomHeaderProps {
  title?: string;
}

interface CustomInputProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  label: string;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

interface ProfileFieldProps {
  label: string;
  value: string;
  icon: ImageSourcePropType;
}

interface CreateUserParams {
  email: string;
  password: string;
  name: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface GetMenuParams {
  category: string;
  query: string;
}

// ── Appwrite query params ──────────────────────────────────────────────────────

export type GetBooksParams = {
  category?: string; // Appwrite category document ID
  query?: string; // Full-text search string
  limit?: number; // Default 20
  offset?: number; // For pagination, default 0
};

export type AddReviewParams = {
  userId: string;
  bookId: string;
  rating: number; // 1–5
  comment?: string;
};

// ── Book / Author / Category shapes ───────────────────────────────────────────
// These mirror what Appwrite returns. Extend as your schema grows.

export type AppwriteCategory = {
  $id: string;
  $createdAt: string;
  name: string;
};

export type AppwriteAuthor = {
  $id: string;
  name: string;
  bio?: string;
  profile_image?: string; // file ID or URL
};

export type AppwriteBook = {
  $id: string;
  $createdAt: string;
  title: string;
  description?: string;
  cover_image?: string; // file ID — pass to getBookCoverUrl()
  published_date?: string;
  language?: string;
  page_count?: number;
  is_web_novel?: boolean;
  // Appwrite relationship fields (populated automatically on fetch)
  authors?: AppwriteAuthor[];
  categories?: AppwriteCategory[];
};

export type AppwriteReview = {
  $id: string;
  $createdAt: string;
  user_id: string;
  book_id: string;
  rating: number;
  comment?: string;
};

export type AppwriteFavorite = {
  $id: string;
  user_id: string;
  book_id: string | AppwriteBook; // Appwrite may return the related doc
};
