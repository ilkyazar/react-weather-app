import React from 'react';

const Weather = (props) => {
    return(
        <div className="container text-light">
            <div className="cards pt-4">
                <h1>{props.city}</h1>
                <h5 className="py-4">
                    <i className={`wi ${props.weatherIcon} display-1`}></i>
                </h5>
                {props.temp_celsius ? (<h1 className="py2">{props.temp_celsius}&deg;</h1>) : null}
                {showMinMaxTemp(props.temp_min, props.temp_max)}
                <h4>{props.description}</h4>
                {showHumidityWind(props.humidity, props.wind)}
            </div>
        </div>
    );
};

function showMinMaxTemp(min, max) {
    if (min !== undefined & max !== undefined) {
        return (
            <h3>
                <span className="px-4">{min}&deg;</span>
                <span className="px-4">{max}&deg;</span>
            </h3>
        );
    }
}

function showHumidityWind(hum, wind) {
    console.log("hum: " + hum + " wind: " + wind);
    if (hum !== undefined & wind !== undefined) {
        return (
            <h3>
                <span className="pz-8">{hum}%</span>
                <span className="pz-8">{wind}%</span>
            </h3>
        );
    }
}

export default Weather;