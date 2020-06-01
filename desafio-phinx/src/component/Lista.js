import React from 'react';
import './Lista.css';

//Componentes
import Spinner from './common/Spinner.js'
import Error from './common/Error.js'
import Card from './common/Card.js'

const Lista = props =>{
  const { data, isLoading, isError, selectCharacter, setPersonajeFavorito } = props
  return(
    <div className="lista row">
      {isLoading && <Spinner />}
      {isError && <Error message="Error al cargar la lista" />}
      {
        data.length > 0 ? (
          data.map((character, i)=>{
            return <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <Card character={character} 
                selectCharacter={selectCharacter}
                setPersonajeFavorito={setPersonajeFavorito}
                />
            </div>
          })
        ) : (
          !isLoading && !isError &&
          <div className="w-100 text-center">No hay resultados...</div>
        )
      }
    </div>
  )
}

export default Lista;