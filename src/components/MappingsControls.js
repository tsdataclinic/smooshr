import React from 'react'
import MappingsMenu from './MappingsMenu'
import MappingFocus from './MappingFocus'


export default function MappingsControlls({ mappings })=> {

  return (
    <div className="mapping-controls">
      <MappingsMenu mappings={mappings} />
      <MappingsFocus mapping={mappings[0]} />
    </div>
  )

}
