import React from 'react'

const Diagram = ({ diagramId }) => {
  return (
    <div>
      <div data-diagramid={diagramId} className='diagram'></div>
    </div>
  )
}

export default Diagram
