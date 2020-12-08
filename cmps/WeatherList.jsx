import React from 'react'
import { ForcastCard } from '../cmps/ForcastCard'
export function WeatherList({forcast}) {
    return (
            <ul className="forcast-list">
                {
                    forcast.map((day, idx) => <li key={idx}>
                        <ForcastCard day={day}/>
                        </li>)
                }
            </ul>

    )
}