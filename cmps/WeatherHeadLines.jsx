import React from 'react';

export function WeatherHeadLines({ LocalizedName, Text, isFavorite = false, setCurrentForcast = null, city = null }) {
    return (
        <div className="headlines">
            <h1>  {LocalizedName}</h1> <br />
            <h1>{Text}</h1>
            {isFavorite && <button onClick={() => setCurrentForcast(city)}>Show weather</button>}
        </div>
    );
}

export default WeatherHeadLines;