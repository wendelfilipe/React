import React from 'react'
import Atividade from './Atividade'

export default function AtividadeLista(props) {
  return (
    <div className="mt-3">
          <header className="App-header">
                {props.atividades.map(ativ => (
                    <Atividade key={ativ.id}
                      ativ={ativ}
                      deletarAtividade={props.deletarAtividade}
                      pegarAtividade={props.pegarAtividade}
                    />                 
                ))}
          </header>
      </div>
  )
}
