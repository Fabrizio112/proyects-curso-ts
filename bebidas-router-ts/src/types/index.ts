import{z} from "zod"
import { CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, searchFilterSchema, SpecificDrinkAPIResponse } from "../schema/recipes-schema";

export type CategoryType=z.infer<typeof CategoriesAPIResponseSchema>
export type SearchFilterType=z.infer<typeof searchFilterSchema>
export type DrinkType=z.infer<typeof DrinksAPIResponse>
export type Drink=z.infer<typeof DrinkAPIResponse>
export type SpecificDrink=z.infer<typeof SpecificDrinkAPIResponse>