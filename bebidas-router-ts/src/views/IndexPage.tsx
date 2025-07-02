import { useMemo } from "react";
import { useAppStore } from "../store/useAppStore";
import DrinkCard from "../components/DrinkCard";

function IndexPage() {
    const drinks=useAppStore(state=> state.drinks)
    const hasDrinks=useMemo(()=>drinks.drinks.length,[drinks])
    return (
    <>
        <h1 className="text-6xl font-extrabold">Recetas</h1>
        {hasDrinks?
        (<div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-4 my-10 gap-10">
            {drinks.drinks.map(d =><DrinkCard key={d.idDrink} drink={d} /> )}
        </div>)
        :
        (<>
            <p className="my-10 text-center text-2xl">
                No hay resultados aun , utiliza el resultado para buscar recetas
            </p>
        </>)
        }
    </>  );
}

export default IndexPage;