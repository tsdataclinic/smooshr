export function gen_sample(n_points=100, colors=['red', 'green','blue']){
   return [...Array(n_points).keys()].map((id)=>(
     {
     x: Math.random(),
     y: Math.random(),
     color: colors[Math.floor(Math.random()*colors.length)],
     id
   }))
}


export function gen_selection(pc, from){
   const no  = Math.floor(pc*from/100.0)
   return [...Array(no)].map(()=> Math.floor(Math.random()*from))
}

