import React, { useState, useContext, useEffect } from "react";
import { Utils } from "CommonUtils/Utils";
import MapPicker from "react-google-map-picker";

const GooglePlacesPicker = () => {
  const DefaultLocation = { lat: 10, lng: 106 };
  const DefaultZoom = 15;
  const { Selectedcoordinates, setLocation, location } = useContext(Utils);
  const [defaultLocation, setDefaultLocation] = useState(DefaultLocation);
  const [zoom, setZoom] = useState(DefaultZoom);

  useEffect(() => {
    if (Selectedcoordinates.lat) {
      setDefaultLocation({ ...Selectedcoordinates });
      setLocation({ ...location });
    }
  }, [Selectedcoordinates]);

  function handleChangeLocation(lat, lng) {
    setLocation({ lat: lat, lng: lng });
  }

  function handleChangeZoom(newZoom) {
    setZoom(newZoom);
  }

  function handleResetLocation() {
    // console.log("Hello....")
    setDefaultLocation({ ...DefaultLocation });
    setZoom(DefaultZoom);
  }

  return (
    <>
      <button onClick={handleResetLocation}>Reset Location</button>

      <MapPicker
        mapDivId="mapDiv"
        defaultLocation={defaultLocation}
        zoom={zoom}
        mapTypeId="roadmap"
        onChangeLocation={handleChangeLocation}
        onChangeZoom={handleChangeZoom}
        apiKey="AIzaSyCcH9_FqvLsZcwuiVryLp0mfgVIl6jL_S0&"
      />
    </>
  );
};

export default GooglePlacesPicker;
