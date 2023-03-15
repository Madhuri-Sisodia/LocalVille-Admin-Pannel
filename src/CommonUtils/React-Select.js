import React, { useState } from 'react';
import Select from 'react-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

export default function ReactSelect({data,setSelectSection}) {
  const [selectedOption, setSelectedOption] = useState(null);

  data.map((ele,index)=>{
    options.push( { label:`${ele.name},  ${ele.email}`, value:ele.email })
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