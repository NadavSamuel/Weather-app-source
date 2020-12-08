// import {storageService} from '../services/storageService'
import axios from 'axios'

const STORAGE_KEY = 'cities';
const FORCAST_KEY = 'forcast';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
// const API_KEY2 = process.env.REACT_APP_WEATHER_API_KEY_2;
export const weatherService = {
    callCityWeather,
    callCities
}
// let gCities = storageService.loadFromStorage(STORAGE_KEY) 
// let gForcast = storageService.loadFromStorage(FORCAST_KEY) 

export async function callCities(value) {

    // return Promise.resolve(gCities)
    try{
    var citiesData = await axios.get(`https://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${API_KEY}&q=${value.cityName}`)
    const cities = citiesData.data;
    return cities
    }
    catch(err){
        console.log('Err',err)
    }
}
export async function callCityWeather(value) {

    
    // return Promise.resolve(gForcast)
    try{
    var citiesData = await axios.get(`https://dataservice.accuweather.com/forecasts/v1/daily/5day/${value}?apikey=${API_KEY}`)
    const cities = citiesData.data;
    return cities
    }
    catch{
        console.log('Err')
    }
}

