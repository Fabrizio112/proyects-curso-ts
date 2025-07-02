import type { StateCreator } from "zustand"
import type { SpecificDrink } from "../types"

export type FavoriteSliceType={
    favorites:SpecificDrink[]
    handleClickFavorite:(specificDrink:SpecificDrink)=>void
    favoriteExists:(id:SpecificDrink["idDrink"]) => boolean
    loadFromStorage:()=>void
}

export const createFavoriteSlice:StateCreator<FavoriteSliceType>=(set,get)=>({
    favorites:[],
    handleClickFavorite:(specificDrink)=>{
       if(get().favorites.some(favorite => favorite.idDrink === specificDrink.idDrink)){
        set((state)=>({
            favorites:state.favorites.filter(favorite => favorite.idDrink != specificDrink.idDrink)
        }))
       }else{
        set({
            favorites:[...get().favorites,specificDrink ]
        })
       }
       localStorage.setItem("favorites",JSON.stringify(get().favorites))
    },
    favoriteExists:(id)=>{
        return get().favorites.some(favorite => favorite.idDrink === id)
    },
    loadFromStorage:()=>{
        const favoritesLocal=localStorage.getItem("favorites")
        if(favoritesLocal){
            set({
                favorites:JSON.parse(favoritesLocal)
            })
        }
    }
})