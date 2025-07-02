import { create } from "zustand";
import { createRecipesSlice, type RecipesSliceType } from "./recipeSlice";
import { createFavoriteSlice,type FavoriteSliceType } from "./favoriteSlice";
import { createNotificationSlice, type NotificationSliceType } from "./notificationSlice";



export const useAppStore=create<RecipesSliceType & FavoriteSliceType & NotificationSliceType>((...a)=>({
    ...createRecipesSlice(...a),
    ...createFavoriteSlice(...a),
    ...createNotificationSlice(...a)
}))