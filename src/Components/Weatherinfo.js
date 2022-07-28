import React, { useEffect, useState } from 'react'
import '../css/Weatherinfo.css'
const Weatherinfo = () => {
  const [lat,Setlat] = useState(null);
  const [lon,Setlon] = useState(null);
  const [country,Setcountry] = useState(null);
  const [city,Setcity] = useState(null);
  const [description,Setdescription] = useState(null);
  const [degree,Setdegree] = useState(null);
  const [icon,Seticon] = useState()
  const date = new Date()
  const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
  useEffect(()=>{
    const fetchweather = async ()=> {
      

      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e69e80ffad0985adf3cbd78af8803391&units=metric`)
      const data = await response.json()
      console.log(data)
      Setcountry(data.sys.country)
      Setcity(data.name)
      Setdescription(data.weather[0].description)
      Setdegree(Math.round(data.main.temp))
      Seticon(data.weather[0].icon)
      console.log(icon)
    }

    


    if(lat && lon){
      fetchweather()
    }

  },[lat,lon])

  
  const updateweatherinfo = async ()=> {
    if(navigator.geolocation){

      navigator.geolocation.getCurrentPosition( (position)=>{
       Setlat(position.coords.latitude);
       Setlon( position.coords.longitude);
      })
    }else{
      alert('please give location access')
    }
  }
  return (
    <>
    <div className='weatherinfo'>
        <div className='dates'>
            <span className='time'>{`${date.getHours()}:${date.getMinutes()}`}</span>
            <span className='date'>{`${date.getDay()}  ${monthNames[date.getMonth()]}`}</span>
        </div>
        <div className='image'>
          <img src={`http://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather"/>
        </div>
        <h1 className='degree'>{degree}&#176;
</h1>
        <h1 className='waetherstats'>{description}</h1>
        <div className='line'></div>
        <div className='locations'>
          <span className='city'>{city}</span>
          <span className='country'>{country}</span>
        </div>
    </div>
        <button onClick={updateweatherinfo} className='btnupdate'>Click to get current weather</button>
    </>
  )
}

export default Weatherinfo