import React from 'react';
import "./App.css";
import Form from './components/form-component';
import Weather from './components/weather-component';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'weather-icons/css/weather-icons.css';
import * as constants from './constants/openWeatherConstants';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            temp_celsius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            description: "",
            humidity: undefined,
            wind: undefined,
            error: false
        };

        this.weatherIcon = {
            Clear: "wi-day-sunny",
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clouds: "wi-day-fog"             
        };
    }

    convertToCelsius(t) {
        let c = Math.floor(t - 273.15);
        return c;
    }

    convertTokmh(mts) {
        let kmh = mts * 3.6;
        return kmh;
    }

    getWeatherIcon(icons, rangeId) {
        switch(true) {
            case rangeId >= 200 && rangeId <= 232:
                    this.setState({icon: this.weatherIcon.Thunderstorm});
                    break;
            case rangeId >= 300 && rangeId <= 321:
                    this.setState({icon: this.weatherIcon.Drizzle});
                    break;
            case rangeId >= 500 && rangeId <= 531:
                    this.setState({icon: this.weatherIcon.Rain});
                    break;
            case rangeId >= 600 && rangeId <= 622:
                    this.setState({icon: this.weatherIcon.Snow});
                    break;
            case rangeId >= 701 && rangeId <= 781:
                    this.setState({icon: this.weatherIcon.Atmosphere});
                    break;
            case rangeId == 800:
                    this.setState({icon: this.weatherIcon.Clear});
                    break;
            case rangeId >= 801 && rangeId <= 804:
                    this.setState({icon: this.weatherIcon.Clouds});
                    break;
            default:
                    this.setState({icon: this.weatherIcon.Clear});
            }
    }

    getWeather = async (e) => {

        e.preventDefault();

        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;

        if (city && country) {
            const api_call = await fetch(
                `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${constants.API_KEY}`
                );
    
            const response = await api_call.json();

            console.log(response);

            if (response.name) {
                this.setState({
                    city : `${response.name}, ${response.sys.country}`,
                    temp_celsius : this.convertToCelsius(response.main.temp),
                    temp_min : this.convertToCelsius(response.main.temp_min),
                    temp_max : this.convertToCelsius(response.main.temp_max),
                    description : response.weather[0].description,
                    humidity : response.main.humidity,
                    wind : this.convertTokmh(response.wind.speed),
                    error : false,
                })
    
                this.getWeatherIcon(this.weatherIcon, response.weather[0].id);
            }
            else {
                this.setState({error: true});
            } 

        } else {
                this.setState({error: true});
        }
    }

    render() {
        return(
            <div className="App">
                <Form 
                    loadWeather={this.getWeather}
                    error={this.state.error}
                />
                <Weather
                    city={this.state.city}
                    country={this.state.country}
                    temp_celsius={this.state.temp_celsius}
                    temp_min={this.state.temp_min}
                    temp_max={this.state.temp_max}
                    description={this.state.description}
                    weatherIcon={this.state.icon}
                    humidity={this.state.humidity}
                    wind={this.state.wind}
                    />
            </div>
        );
    }
}


export default App;