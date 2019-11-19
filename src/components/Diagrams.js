import React from 'react'

const Diagram = ({ diagramId }) => {
  return (
    <div>
      <div data-diagramId={diagramId} className='diagram'></div>
    </div>
  )
}

export default Diagram
