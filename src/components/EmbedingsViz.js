import React, {useEffect,useState} from 'react'

export default function EmbedingsViz(props){
   const {points,selection, pointRadius} = props

   const fillOpacity = (point)=>{
     if(selection.length ==0) return 1.0
     if(selection.includes(point.id)) return 1.0
     return 0.2 
   }

   return (
     <svg style={props.style} viewBox={"0 0 100 100"}>
         {points.map(point=>
            <circle  
                key={point.id}
                r={pointRadius}
                cx={point.x*100}
                cy={point.y*100}
                fill={point.color}
                fillOpacity={fillOpacity(point) }> 
            </circle>
         )}
     </svg>
   )
}

EmbedingsViz.defaultProps={
  points: [],
  selection: [],
  pointRadius:2
}
