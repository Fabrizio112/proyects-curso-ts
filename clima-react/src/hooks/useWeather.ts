import axios from "axios"
import {z} from "zod"
import type { SearchType } from "../types"
import { useMemo, useState } from "react"

const Weather=z.object({
    name:z.string(),
    main:z.object({
        temp:z.number(),
        temp_max:z.number(),
        temp_min:z.number()
    })
})

export type Weather=z.infer<typeof Weather>

const initialState={
        name:"",
        main:{
            temp:0,
            temp_max:0,
            temp_min:0
        }
    }

export default function useWeather(){

    const[weather,setWeather]=useState<Weather>(initialState)
    const[loading,setLoading]=useState(false)
    const[error,setError]=useState(false)

    const fetchWeather=async(search : SearchType)=>{
        const appID=import.meta.env.VITE_API_KEY
        try{
            setError(false)
            setLoading(true)
            setWeather(initialState)
            const geoURL=`https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appID}`
            const {data}= await axios(geoURL)

            if(!data[0]){
                setError(true)
                setLoading(false)
                return
            }
            const lat=data[0].lat
            const lon=data[0].lon

            const weatherURL=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appID}`
            const {data:weatherResult}=await axios(weatherURL)
            const result=Weather.safeParse(weatherResult)
            if(result.success){
                setWeather(result.data)
                setLoading(false)
            }else{
                console.log("Respuesta mal formada ...")
            }

        }catch(error){
            console.log(error)
        }
    }

    const hasWeatherData=useMemo(()=>weather.name,[weather])

    return {
        weather,
        fetchWeather,
        hasWeatherData,
        loading
        ,error
    }
}