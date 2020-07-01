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
    if (hum !== undefined & wind !== undefined) {
        return (
            <div>
                <h6>
                    <span className="px-4">{"Humidity: " + hum.toFixed(2)}%</span>
                    <span className="px-4">{"Wind: " + wind.toFixed(2)} km/h</span>
                </h6>
            </div>
        );
    }
}

export default Weather;