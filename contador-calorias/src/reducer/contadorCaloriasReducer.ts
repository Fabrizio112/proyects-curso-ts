import { ContadorCalorias } from "../types";

export type ContadorCaloriasActions=
{type:"save-activity",payload:{newActivity:ContadorCalorias}} |
{type:"set-activityID",payload:{id:ContadorCalorias["id"]}} |
{type:"delete-activity",payload:{id:ContadorCalorias["id"]}} |
{type:"restart-app"}

export type ContadorCaloriasState={
    activities:ContadorCalorias[]
    activityID:ContadorCalorias["id"]
}

const localStorageInitialStateActivities = () : ContadorCalorias[]=>{
    const activities=localStorage.getItem("activities")
    return activities ? JSON.parse(activities) : []
}

export const initialState : ContadorCaloriasState={
    activities:localStorageInitialStateActivities(),
    activityID:""
}

export const contadorCaloriasReducer=(
    state:ContadorCaloriasState = initialState,
    action:ContadorCaloriasActions
)=>{
    if(action.type == "save-activity"){
        let updateActivity:ContadorCalorias[]=[]
        if(state.activityID){
            updateActivity=state.activities.map(activity => activity.id == state.activityID ? action.payload.newActivity : activity)
        }else{
            updateActivity=[...state.activities,action.payload.newActivity]
        }
        return {
            ...state,
            activities:updateActivity,
            activityID:""

        }
    }
    if (action.type == "set-activityID"){
        return{
            ...state,
            activityID:action.payload.id
        }
    }
    if(action.type == "delete-activity"){
        return{
            ...state,
            activities:state.activities.filter(activity => activity.id != action.payload.id)
        }
    }
    if(action.type == "restart-app"){
        return{
            activities:[],
            activityID:""
        }
    }
}