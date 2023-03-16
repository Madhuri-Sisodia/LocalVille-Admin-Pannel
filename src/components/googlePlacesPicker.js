import React, { useState,useContext } from 'react'
import { Utils } from 'CommonUtils/Utils';


import MapPicker from 'react-google-map-picker'
import { useEffect } from 'react';




const GooglePlacesPicker = () => {
  let DefaultLocation={ lat: 10, lng: 106}
  const DefaultZoom = 15;
  const {Selectedcoordinates,setLocation,location} = useContext(Utils)
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
   //console.log(Selectedcoordinates)
  //const [location, setLocation] = useState(defaultLocation);
    // setLocation(Selectedcoordinates)
    
  useEffect(()=>{
    if(Selectedcoordinates.lat){
      setDefaultLocation({...Selectedcoordinates})
      setLocation({...location}) 
    }
  },[Selectedcoordinates])


  const [zoom, setZoom] = useState(DefaultZoom);

  function handleChangeLocation (lat, lng){
    setLocation({lat:lat, lng:lng});
  }
  
  function handleChangeZoom (newZoom){
    setZoom(newZoom);
  }

  function handleResetLocation(){
    setDefaultLocation({ ... DefaultLocation});
    setZoom(DefaultZoom);
  }

  return (
    <>
  <button onClick={handleResetLocation}>Reset Location</button>
  {/* <label>Latitute:</label><input type='text' value={location.lat} disabled/>
  <label>Longitute:</label><input type='text' value={location.lng} disabled/> */}
  {/* <label>Zoom:</label><input type='text' value={zoom} disabled/> */}
  <MapPicker defaultLocation={defaultLocation}
    zoom={zoom}
    mapTypeId="roadmap"
    style={{height:'300px',borderRadius:"10px"}}
    onChangeLocation={handleChangeLocation} 
    onChangeZoom={handleChangeZoom}
    apiKey='AIzaSyCcH9_FqvLsZcwuiVryLp0mfgVIl6jL_S0&'
    />
  </>
  );
}

export default GooglePlacesPicker;