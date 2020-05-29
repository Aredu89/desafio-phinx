import React from 'react';

const Spinner = () => {
  return(
    <div className="d-flex justify-content-center w-100">
      <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Spinner;