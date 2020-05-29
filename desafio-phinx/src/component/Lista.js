import React from 'react';
import './Lista.css';

//Componentes
import Spinner from './common/Spinner.js'
import Card from './common/Card.js'

const Lista = props =>{
  const { data, isLoading, isError } = props
  return(
    <div className="lista row">
      {isLoading && <Spinner />}
      {
        data.length > 0 ? (
          data.map((character, i)=>{
            return <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <Card character={character} />
            </div>
          })
        ) : (
          !isLoading &&
          <div className="w-100 text-center">No hay resultados...</div>
        )
      }
    </div>
  )
}

export default Lista;