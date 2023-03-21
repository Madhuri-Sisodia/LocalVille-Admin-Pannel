
const MAPDays = (ele)=>{
    let days = JSON.parse(ele)
    const daysOfWeek = ["M", "T", "W", "Th", "F", "S", "Su"];

    return(
        <>
        {
            days.map((days,index)=>{
     
                <div key={days} className={`week-days`}>
                          {daysOfWeek[index] || days}
                </div>
            
          })
        }
        </>
    )
      
}

export default MAPDays