import type { StateCreator } from "zustand"
import { getCategories, getRecipes, getSpecificRecipe } from "../services/RecipeService"
import type { CategoryType, Drink, DrinkType, SearchFilterType, SpecificDrink } from "../types"

export type RecipesSliceType={
    categories:CategoryType
    drinks:DrinkType
    specificDrink:SpecificDrink
    modal:boolean
    fetchCategories:()=>Promise<void>
    searchRecipes:(searchFilter:SearchFilterType)=>Promise<void>
    selectRecipe:(id:Drink["idDrink"])=>Promise<void>
    closeModal:()=>void
}

export const createRecipesSlice:StateCreator<RecipesSliceType>=(set)=>({
    categories:{
        drinks:[]
    },
    drinks:{
        drinks:[]
    },
    specificDrink:{} as SpecificDrink,
    modal:false,
    fetchCategories:async()=>{
        const categoriesResult=await getCategories()
        set({
            categories:categoriesResult
        })

    },
    searchRecipes:async(searchFilter)=>{
        const drinksResult =await getRecipes(searchFilter)
        set({
            drinks:drinksResult
        })
    },
    selectRecipe:async(id)=>{
        const specificDrink=await getSpecificRecipe(id)
        set({
            specificDrink,
            modal:true
        })
    },
    closeModal:()=>{
        set({
            modal:false,
            specificDrink:{} as SpecificDrink
        })
    }
})