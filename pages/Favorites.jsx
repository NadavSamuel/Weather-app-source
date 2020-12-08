import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux'
import { WeatherForcast } from '../cmps/WeatherForcast'
import { weatherService } from '../services/weatherService';
import { motion } from 'framer-motion'
import { HashLink } from 'react-router-hash-link';
import {loading,doneLoading} from '../actions/systemActions'
export function Favorites() {
    const dispatch = useDispatch()
    const { favoriteCities } = useSelector(state => state.weatherReducer)
    const { wasInitialLoad } = useSelector(state => state.systemReducer)

    const [forcasts, setForcasts] = useState(null)
    useEffect(() => {
        getFavoriteCitiesForcasts();
    }, [favoriteCities])

    async function getFavoriteCitiesForcasts() {
        dispatch(loading());
        if (!favoriteCities || !favoriteCities.length){
            dispatch(doneLoading());

            return

        } 
        const forcasts = await Promise.all(favoriteCities.map(async city => {
            const cityForcast = await weatherService.callCityWeather(city.Key);
            return cityForcast
        }))
        setForcasts(forcasts);
        dispatch(doneLoading());
    }

    const pageTransition = {
        in: {
            opacity: 1,
            x: 0
        },
        out: {
            opacity: 0,
            x: '100%',
            overflowX: 'hidden',
        }
    }
    function inLessThenTwoFavorites(){
        if(favoriteCities) return  favoriteCities.length <= 2 ? true : false;
    } 
    return (
        <motion.section className="favorites-page" variants={pageTransition} transition={{ duration: 0.5 }} exit="out" animate="in" initial={wasInitialLoad ? 'out':null}>
            {(favoriteCities&&!favoriteCities.length) && (
                <div className="error-msg">
                    <h1>No favorite places </h1></div>)}
            {(forcasts && (favoriteCities &&favoriteCities.length) ) ? (
                <div className={`favorites-nav ${inLessThenTwoFavorites() ? 'short':'long'}`}>
                     {favoriteCities.map((city) => {
                         return <HashLink smooth key={city.LocalizedName}  to={`#${city.LocalizedName}`}  >{city.LocalizedName}</HashLink>  
                     })}
                </div>) : null}
            {(forcasts && favoriteCities.length ) ? (
                favoriteCities.map((city, idx) => {
                   if (!forcasts[idx]) return( <div key={city.Key}> 
                    <h1  className="error-msg">OOPS! an error occoured, cold'nt load weather for {city.LocalizedName}. </h1></div>)
                return (
                <div id={city.LocalizedName} key={city.Key}>
                <WeatherForcast toggleType={false} headLine={forcasts[idx].Headline} city={city} key={city.Key} forcast={forcasts[idx].DailyForecasts} />
                </div>)
            })) :null}


        </motion.section>
    );
}

