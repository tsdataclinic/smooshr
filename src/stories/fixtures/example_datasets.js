import faker from 'faker'

export function gen_datasets(no=10){
  return [...Array(no).keys()].map((id)=> ({ id, name:faker.internet.domainWord() }) ) 
}
