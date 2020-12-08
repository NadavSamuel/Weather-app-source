import React from 'react'
import { useSelector } from 'react-redux'

export function ForcastCard({ day }) {
    const { degreeType } = useSelector(state => state.weatherReducer)
    const { EpochDate, Temperature, Day } = day
    const currDate = new Date(0); // The 0 there is the key, which sets the date to the epoch

    function getDate(EpochDate) {
        currDate.setUTCSeconds(EpochDate);
        var year = currDate.getFullYear();
        var month = dateHelper(currDate.getMonth() + 1)
        var day = dateHelper(currDate.getDate())
        return `${day}/${month}/${year}`
    }
    function dateHelper(num) {
        return (num < 10) ? '0' + num : '' + num
    }
    function getWeekDay() {
        const currDate = new Date(day.Date).getDay()
        switch (currDate) {
            case 0:
                return 'Sun'
            case 1:
                return 'Mon'
            case 2:
                return 'Tus'
            case 3:
                return 'Wen'
            case 4:
                return 'Thu'
            case 5:
                return 'Fri'
            case 6:
                return 'Sat'

            default:
                break;
        }
    }
    function getDayIconNumber() {
        let iconNumber = Day.Icon
        if (Day.Icon < 10) iconNumber = `0` + Day.Icon
        return iconNumber
    }
    function getDegreeToShow() {
        let degreeInFar = Temperature.Maximum.Value
        if (degreeType) return{
            degree:degreeInFar,
            unitSymbol:'F'
        } 
        else return{
            degree:(degreeInFar - 32) / 1.8.toFixed(),
            unitSymbol:'C'
        } 
    }

    return (
        <article className="forcast-card flex column align-center ">
            <div className="icon-container">
                <img src={`https://developer.accuweather.com/sites/default/files/${getDayIconNumber()}-s.png`} alt="" />
            </div>
            <section className="forcast-details">
                <div className="card-top">
                    <h2>{getWeekDay(day.date)}</h2>
                    <h2>{getDate(EpochDate)}</h2>
                </div>
                <div className="card-bottom">
                    <p>{Day.IconPhrase}</p>
                    <h3>{getDegreeToShow().degree}<span>{(getDegreeToShow().unitSymbol)}</span></h3>
                </div>
            </section>
        </article>

    )
}