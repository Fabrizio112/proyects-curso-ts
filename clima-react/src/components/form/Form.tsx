import { useState, type ChangeEvent, type FormEvent } from "react";
import { countries } from "../../data/countries";
import styles from "./Form.module.css"
import type { SearchType } from "../../types";

type FormProps={
    fetchWeather:(search:SearchType)=>Promise<void>
}

function Form ({fetchWeather}:FormProps) {
    const[search,setSearch]=useState<SearchType>({
        city:"",
        country:""
    })

    const handleChange=(e :ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>)=>{
        setSearch({
            ...search,
            [e.target.name]:e.target.value
        })
    }
    const handleSubmit=(e : FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if(Object.values(search).includes("")){
            console.log("Campos vacios")
            return
        }
        fetchWeather(search)
    }

    return ( 
    <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
            <label htmlFor="city">Ciudad</label>
            <input 
            id="city"
            type="text"
            name="city"
            placeholder="ciudad"
            value={search.city}
            onChange={handleChange} />
        </div>
        <div className={styles.field}>
            <label htmlFor="country">Pais</label>
            <select value={search.country} id="country" name="country" onChange={handleChange}>
            <option value="" className={styles.option}>--- Selecciona un País ---</option>
            {countries.map(country =>
                (<option key={country.code} value={country.code}>
                    {country.name}
                </option>

                ))}
            </select>
        </div>
        <input className={styles.submit} type="submit" value="Consultar Clima" />
    </form> );
}

export default Form;