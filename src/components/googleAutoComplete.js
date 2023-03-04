import { useState } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';


  const GoogleAutocomplete  = ()=>{

 const [address,setAdress] = useState("")
 const [coordinates,setCoordinates] = useState({
    lat:null,
    lng:null
 })
       console.log(address)
       console.log(coordinates)

 const handleSelect = async value =>{
    const result  = await geocodeByAddress(value)
    const loc = await getLatLng(result[0])
    setAdress(value)
    setCoordinates(loc)
 }


       return(
        <>
        <PlacesAutocomplete
        value={address}
        onChange={setAdress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
        </>
       )
  }

  export default GoogleAutocomplete;