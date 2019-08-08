import * as lev  from 'fast-levenshtein';
import {KMeans} from 'ml';
import { agnes } from 'ml-hclust';


export const guessGroupingsLevenshteinKNN = (entries, no) => {
  const validEntries  = entries.filter(e=> e !=="undefined") ;
  let ans = KMeans(
    validEntries.map((a,i)=>[i]), no, 
    {distanceFunction: (a, b) => {

       try{
           let dist  = lev.get(validEntries[Math.floor(a[0])], validEntries[Math.floor(b[0])])
           return dist       
       }
       catch{
           debugger
           return 1000 
       }
    }});

    
    let assignments = validEntries.reduce( (result,entry, index)=>{
      result[entry] = ans.clusters[index]
      return result
    }, {})

    let result= 
    [...new Array(5)].map( (a,i)=>(
      {
       name: `Mapping ${i}`,
       entries: Object.entries(assignments).filter((a)=>
         a[1]== i 
       ).map(a => a[0])
      }
    ))
    console.log(result)
    return result
};

export const guessGroupingsLevenshteinHClust = (entries) => {
  const validEntries  = entries.filter(e=> e !=="undefined") ;
  let ans = agnes(
    validEntries.map((a,i)=>[i]), 
    {distanceFunction: (a, b) => {

       try{
           let dist  = lev.get(validEntries[Math.floor(a[0])], validEntries[Math.floor(b[0])])
           return dist       
       }
       catch{
           debugger
           return 1000 
       }
    }});

   debugger 
    let assignments = validEntries.reduce( (result,entry, index)=>{
      result[entry] = ans.clusters[index]
      return result
    }, {})

    let result= 
    [...new Array(5)].map( (a,i)=>(
      {
       name: `Mapping ${i}`,
       entries: Object.entries(assignments).filter((a)=>
         a[1]== i 
       ).map(a => a[0])
      }
    ))
    console.log(result)
    return result
};
