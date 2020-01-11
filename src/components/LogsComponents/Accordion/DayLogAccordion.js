import React from "react";
import styled from "styled-components";

export default function DayLogAccordion({dayData}) {
  const [open, setOpen] = React.useState(false);
    const toggleAccordion =()=>{
        setOpen(!open)
    }

    const getItemDetails =()=>{
        
        if(dayData.details){
            return dayData.details.map((item, number)=>{
                return(
                    <div key={number}>
                        <p>{item.item} - {`${item.done}`}</p>
                    </div>
                )
            })
        }else{
            return(
                <div>
                    <p>In this day all is false</p>
                </div>
            )
        }    
    }

  return (
    <>
        <h3 onClick={toggleAccordion}>{dayData.date} - {`${dayData.isDone}`}</h3>
        {open? getItemDetails() : null}
    </>
  );
}