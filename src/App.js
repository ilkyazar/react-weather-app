import React from 'react';
import "./App.css";
import Weather from './components/weather-component';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import 'weather-icons/css/weather-icons.css';

function App() {
    return(
        <div className="App">
            <Weather/>
        </div>
    );
};

export default App;