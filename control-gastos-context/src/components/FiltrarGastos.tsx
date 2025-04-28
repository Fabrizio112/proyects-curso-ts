import { categories } from "../data/categories";
import useBudget from "../hooks/useBudget";

function FiltrarGastos() {
    const{dispatch}=useBudget()
    return ( 
    <section className="bg-white mx-auto max-w-3xl shadow-lg rounded-lg mt-10 p-10">
        <div className="flex gap-3">
            <label htmlFor=""> Filtrar Gastos</label>
            <select name="" id="" className="w-full border-slate-200 border-1 rounded-lg p-2" onChange={(e)=>dispatch({type:"filter-category",payload:{category:e.target.value}})}>
                <option value=""> -- Todas las categorias</option>
                {categories.map( category =><option key={category.id} value={category.id}>{category.name}</option>)}
            </select>
        </div>
    </section> );
}

export default FiltrarGastos;