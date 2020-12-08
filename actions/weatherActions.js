import { storageService } from '../services/storageService';

// Dispatchers
const _setCity = (cityName) => ({ type: 'SET_CITY', cityName });
const _setFavoriteCities = (favoriteCities) => ({ type: 'SET_FAVORITE_CITIES', favoriteCities });

// THUNK

export function setCity(cityName) {
    return async (dispatch) => {
        dispatch(_setCity(cityName));
    }
}
export function saveFavoriteCity(favoriteCity) {
    return async (dispatch,getState) => {
        const {favoriteCities} = getState().weatherReducer
        storageService.saveToStorage('favoriteCities',[...favoriteCities,favoriteCity])
        dispatch({ type:"ADD_FAVORITE", favoriteCity })
        
    }
}
export function removeCityFromFavorites(cityToRemove) {
    return async (dispatch,getState) => {
        let {favoriteCities} = getState().weatherReducer
        favoriteCities = favoriteCities.filter(city =>{
            return city.Key !== cityToRemove.Key
        })
        storageService.saveToStorage('favoriteCities',favoriteCities)
        dispatch({ type:"REMOVE_FAVORITE", cityToRemove })
        
    }
}
export function loadFavoriteCities() {
    return async (dispatch) => {
        const favoriteCities = await storageService.loadFromStorage('favoriteCities');
        if(favoriteCities) dispatch(_setFavoriteCities(favoriteCities));
        
    }
}
export function toggleDegreeType() {
    return async (dispatch) => {
       dispatch({type:'TOGGLE_DEGREE_TYPE'});
        
    }
}

