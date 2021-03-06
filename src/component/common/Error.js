import React from 'react';

const Error = props => {
  const { message } = props
  return(
    <div className="d-flex justify-content-center w-100 mb-3">
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error!</h4>
        <p>{message}</p>
      </div>
    </div>
  )
}

export default Error;