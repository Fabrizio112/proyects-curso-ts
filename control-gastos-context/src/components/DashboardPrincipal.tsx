import useBudget from "../hooks/useBudget";
import AmountDisplay from "./AmountDisplay";
import {CircularProgressbar,buildStyles} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
function DashboardPrincipal() {
    
    const{state,dispatch,remainingBudget,totalExpenses}=useBudget()

    const percentaje=+((totalExpenses / state.budget) * 100).toFixed(2)

    return ( 
    <main className="bg-white mx-auto max-w-3xl shadow-lg rounded-lg mt-10 p-10 grid grid-cols-1 md:grid-cols-2 gap-5" >
        <div className="flex justify-center">
            <CircularProgressbar
             value={percentaje}
             styles={buildStyles({
                pathColor:percentaje == 100 ? "#DC2626" :"#3282F6",
                trailColor:"#F5F5F5",
                textSize:8,
                textColor :percentaje == 100 ? "#DC2626" :"#3282F6"
             })} 
             text={`${percentaje}% Gastado`}/>
        </div>
        <div className="flex flex-col justify-center items-center gap-8 text-center">
            <button className="w-75 cursor-pointer bg-pink-700 text-white rounded-lg p-2 font-bold" onClick={()=>dispatch({type:"reset-app"})}> Resetear App</button>
            <div className="text-xl font-bold">
                <AmountDisplay label="Presupuesto" amount={state.budget}/>
                <AmountDisplay label="Disponible" amount={remainingBudget}/>
                <AmountDisplay label="Gastado" amount={totalExpenses}/>
            </div>
        </div>
    </main> );
}

export default DashboardPrincipal;