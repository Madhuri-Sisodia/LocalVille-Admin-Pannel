import React, { useState } from 'react';
import Select from 'react-select';

const options = [];

export default function ReactSelect({data,setSelectSection}) {
  const [selectedOption, setSelectedOption] = useState(null);

  data.map((ele,index)=>{
    options.push( { label:`${ele.name},  ${ele.id}`, value:ele.id })
 })
 

  return (
    <div className="App">
      <Select
        isSearchable={true}
        defaultValue={selectedOption}
        onChange={setSelectSection}
        options={options}
      />
    </div>
  );
}