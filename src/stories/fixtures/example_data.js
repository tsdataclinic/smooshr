import faker from 'faker'

export function example_datatable(rows=20){

   const data = [...Array(rows).keys()].map(id=>(
      {id, 
              contact: faker.name.findName(),
              company: faker.company.companyName(),
              damage_ammount: Math.random()*20,
              total_ammount: Math.random()*100
      }
   ))

   const columns = [ {
        name : 'id',
        key : 'id'
        },
        { 
         name: 'Contact',
         key :'contact'
         }, 
         {name: 'Company',
         key: 'company'
         },
         {name: 'Damage ammount',
         key:'damage_ammount'
         },
         {name: 'Total ammount',
         key: 'total_ammount'
         }];

   return {data, columns}
}
