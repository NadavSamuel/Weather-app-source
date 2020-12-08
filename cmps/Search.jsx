import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { setCity } from '../actions/weatherActions'
import { weatherService } from '../services/weatherService';
import { useForm } from '../services/customHooks';


export function Search() {
    const dispatch = useDispatch()
    const [cities, setCities] = useState(null)
    const [city, handleChange] = useForm({ cityName: '' }, setCitiesList)


    async function setCitiesList(name) {
        if (!name) return
        const cities = await weatherService.callCities(name)
        setCities(cities)

    }
    function onSelectCity(event) {
        event.preventDefault()
        dispatch(setCity(cities[0]) || cities)
    }
    const { cityName } = city
    const backgroundGlass = cityName ? '' : 'background-glass'
    return (
        <section className="search">
            <form onSubmit={event => onSelectCity(event)}>
                <input className={backgroundGlass} autoComplete="off" list="city-ul" name="cityName" id="city" value={cityName} onChange={handleChange} />
            </form>
            {city && <datalist id="city-ul">
                {cities && cities.map((city, idx) => {
                    const cityName = city.LocalizedName
                    return (<option key={idx} value={cityName} > {cityName} </option>)
                })}
            </datalist>}

        </section>
    );

}

