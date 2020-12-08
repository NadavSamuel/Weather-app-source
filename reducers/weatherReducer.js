
const initialState = {
    favoriteCities: [],
    filterBy: null,
    city: {
        AdministrativeArea: { ID: "LND", LocalizedName: "London" },
        Country: { ID: "GB", LocalizedName: "United Kingdom" },
        ID: "GB",
        LocalizedName: "United Kingdom",
        Key: "328328",
        LocalizedName: "London",
        Rank: 10,
        Type: "City",
        Version: 1,
    }

}

export function weatherReducer(state = initialState, action) {
    switch (action.type) {

        case 'SET_CITY':
            return {
                ...state,
                city: action.cityName
            }
        case 'ADD_FAVORITE':
            return {
                ...state,
                favoriteCities: [...state.favoriteCities, action.favoriteCity]
            }
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                favoriteCities: state.favoriteCities.filter(city => city.Key !== action.cityToRemove.Key)
            }
        case 'SET_FAVORITE_CITIES':
            return {
                ...state,
                favoriteCities: action.favoriteCities
            }
        case 'TOGGLE_DEGREE_TYPE':
            return {
                ...state,
                degreeType: !state.degreeType
            }
        case 'SET_FILTER':
            return {
                ...state,
                filterBy: action.items
            }
        case 'UPDATE_ITEM':
            return {
                ...state,
                items: state.items.map(item => {
                    if (item._id === action.item._id) return action.item;
                    return item;
                })
            }
        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(item => item._id !== action.itemId)
            }
        default:
            return state;
    }
}