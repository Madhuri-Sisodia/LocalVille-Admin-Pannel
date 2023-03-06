import { useState,useContext, useEffect } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Utils } from 'CommonUtils/Utils';

import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';


  const GoogleAutocomplete  = ()=>{

 const [address,setAdress] = useState("")
 const {Selectedcoordinates,setSelectedCoordinates} = useContext(Utils)
  
 const handleSelect = async value =>{
    const result  = await geocodeByAddress(value)
    const loc = await getLatLng(result[0])
        setAdress(value)
    setSelectedCoordinates(loc)
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
              style={{width:"100%",borderRadius:"5px",borderColor:"#E3E3E3"}}
            />
            <div className="autocomplete-dropdown-container" style={{border:"1px solid #E3E3E3",borderRadius:"5px",position:"relative",zIndex:1}}>
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