import './main.css';
import React, { useState } from 'react';
import DateTime from './components/DateTime';
import {AiFillCaretDown, AiFillCaretUp, AiOutlineSmile} from "react-icons/ai";
import {WiHumidity} from "react-icons/wi";
import { useEffect } from 'react';

// GET API
const api = {
  key: "cb02f985df1b5c99319d83f4a25f2197",
  base: "https://api.openweathermap.org/data/2.5/",
}



export const App = () => {



  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({})
  const [units, setUnits] = useState("metric")

  const changeTempUnits = () => {
      if (units ==='metric') {
        setUnits('imperial')
      } else if (units ==='imperial') {
        setUnits('metric')

      }
    
  }

      // 1. USING FETCH=======================
  // const search = event => {
  //   if (event.key === "Enter" ) {
  //     fetch(`${api.base}weather?q=${city}&appid=${api.key}&units=${units}`)
  //       .then(res => res.json())
  //       .then(result => {
  //         setWeather(result)
  //         setCity('')
  //         console.log(result)

  //       })
  //   }

  // }

      //  2. USING AWAIT==========================

  // const fetchWeatherData = async() => {
  //   await fetch (`${api.base}weather?q=${city}&appid=${api.key}&units=${units}`)
  //   .then(res=>res.json())
  //   .then(result => {
  //     setWeather(result)
  //     setCity('')
  //     console.log(result)

  //   })
  // }

      //   3. USE EFFECT================================
  useEffect (() => {
    const fetchWeatherData = async() => {
      await fetch (`${api.base}weather?q=${city}&appid=${api.key}&units=${units}`)
      .then(res=>res.json())
      .then(result => {
        setWeather(result)
        console.log(result)
  
      })
    }

    fetchWeatherData()
  }, [city, units])


  return (
    <div className={
    (typeof weather.main != "undefined")
    ?(((weather.main.temp>77&&units==='imperial')||(weather.main.temp>25&&units==='metric'))
    ? "app sunny":"app")
    :"app default"}>
      <main>
        <div className='section__searchField'>
          <input value={city} onChange={e => setCity(e.target.value.toUpperCase())}
            className='search-bar'

            placeholder='Please enter city...'></input>

            {units === 'metric' &&  <button className='temp_unit' onClick={() => {changeTempUnits()}}>°C</button>
            }
           
            {units ==='imperial'&&  <button className='temp_unit' onClick={() => {changeTempUnits()}}>°F</button>
            }
         
            
        </div>


        {typeof weather.main != "undefined" 
        ? (
          <div className='section__weatherDisplay'>
            <div className='section__weatherTemperature'>
              <div className='date'><DateTime /></div>
              <div className='__temperature'>
                <div className='location'>{weather.name}, {weather.sys.country}</div>
                <div className='temp'>
                  <span className='temp__display'>  {Math.round(weather.main.temp)}°</span>
                  <img className='temp__condition' src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt='temp_condition'
                  ></img>
                </div>
                <div className='status'>{weather.weather[0].main}</div>
              </div>
            </div>
            {/* =================== */}

            <div className='section__weatherBox'>
              <div className='weather-box'>
                <div className='weather-item'>
                  <span><AiFillCaretDown/> Min   </span>
                  <p>{Math.round(weather.main.temp_min)} °{units ==='metric'? 'C':'F'}</p>
                </div>
                <div className='weather-item'>
                  <span><AiFillCaretUp/> Max  </span>
                  <p>{Math.round(weather.main.temp_max)}°{units ==='metric'? 'C':'F'}</p>

                </div>

              </div>
              <div className='weather-box'>
                <div className='weather-item'>
                  <span> <AiOutlineSmile/> Feels like</span>               
                  <p>{Math.round(weather.main.feels_like)}°{units ==='metric'? 'C':'F'}</p>
                </div>
                <div className='weather-item'>
                  <span><WiHumidity/>Humidity</span>
                  <p>{Math.round(weather.main.humidity)}%</p>
                </div>
              </div>

 
            </div>

          </div>
        ) : (

          <div className='error__message'>
            <h1>Notification</h1>
            <p>Please enter a valid city</p>
          </div>
        )}



      </main>


    </div>
  );
}

export default App;
