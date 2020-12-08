import React, { useState, useEffect } from 'react';
import { Search } from '../cmps/Search'
import { WeatherForcast } from '../cmps/WeatherForcast'
import { weatherService } from '../services/weatherService';
import {  useSelector,useDispatch } from 'react-redux'
import { motion } from 'framer-motion'
import {loading,doneLoading} from '../actions/systemActions'

export function MainApp() {

  const { city } = useSelector(state => state.weatherReducer)
  const { wasInitialLoad } = useSelector(state => state.systemReducer)
  const [forcast, setForcast] = useState(null) 
  const dispatch = useDispatch()

  useEffect(() => {
    if (city) getForcast(city)
  }, [city])

  async function getForcast(city) {
    dispatch(loading())
    const cityForcast = await weatherService.callCityWeather(city.Key)
    setForcast(cityForcast)
    dispatch(doneLoading())

  }
  let pageTransition={
    in:{
      opacity:1,
      x:0
    },
    out:{
      opacity:0,
      x:'-100%',
    }
  }

  return (
    <motion.main className="main-app-container" variants={pageTransition} transition={{duration:0.5}}  exit="out" animate="in" initial={wasInitialLoad ? 'out':null}>
      <div className="top flex column align-center ">
        <Search />
      </div>
      {forcast ?
      <WeatherForcast  city={city} forcast={forcast.DailyForecasts} headLine={forcast.Headline} />
      : <div> 
        <h1 className="error-msg">OOPS! an error occoured, cold'nt load weather. </h1>
        </div>}
      

    </motion.main >
  );

}
