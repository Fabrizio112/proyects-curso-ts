import axios from "axios"
import { CategoriesAPIResponseSchema, DrinksAPIResponse, SpecificDrinkAPIResponse } from "../schema/recipes-schema"
import type { Drink, SearchFilterType } from "../types"


export async function getCategories(){
  const url="https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
  const {data}= await axios(url)
  const result=CategoriesAPIResponseSchema.safeParse(data)
  if(result.success){
    return result.data
  }
}

export async function getRecipes(recipes:SearchFilterType){
    const url=`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${recipes.category}&i=${recipes.ingredient}`
    const {data}=await axios(url)
    const result=DrinksAPIResponse.safeParse(data)
    if(result.success){
        return result.data
    }
}

export async function getSpecificRecipe(id:Drink["idDrink"]){
  const url=`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  const {data}=await axios(url)
  const result=SpecificDrinkAPIResponse.safeParse(data.drinks[0])
  if(result.success){
    return result.data
  }
}