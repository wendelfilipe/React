import { useEffect, useState } from 'react';
import './App.css';
import AtividadeForm from './components/AtividadeForm';
import AtividadeLista from './components/AtividadeLista';
import api from './api/atividade';
import { Button, Modal} from  'react-bootstrap';


function App() {
  const [show, setShow] = useState(false)
  const [atividades, setAtividades] = useState([])
  const [atividade, setAtividade] = useState({id: 0});

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const pegarTodasAtividades = async () => {
    const response = await api.get('atividade')
    return response.data
  }

  useEffect(() => {
    const getAtividades = async () => {
      const todasAtivdades = await pegarTodasAtividades()
      if (todasAtivdades) setAtividades(todasAtivdades)
    }
    getAtividades()
  }, [])

  const addAtividade = async (ativ) => {
    const response = await api.post('atividade', ativ)
    setAtividades([...atividades, response.data])
  }

  function pegarAtividade(id){
    const atividade = atividades.filter(atividade => atividade.id === id)
    setAtividade(atividade[0])
  }

  function cancelarAtividade(){
    setAtividade({id: 0})
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ)
    const { id }  = response.data
    setAtividades(atividades.map(at => at.id === id ? response.data : at))
    setAtividade({id: 0})
  }

  const deletarAtividade = async (id) => {
    if (await api.delete(`atividade/${id}`)){
    const atividadesFiltradas = atividades.filter(atividade => atividade.id !== id)
    setAtividades([...atividadesFiltradas])
    }
  }
  

  return (
    <>
        <div className="d-flex justify-content-between align-items-nd mt-2 pb-3 border-bottom border-dark">
        <h1>Atividade {atividade.id !== 0 ? atividade.id : '' }</h1>
        <Button variant="outline-secondary" onClick={handleShow} style ={{borderRadius: "0", padding: "0px 12px 5px"}}>
          <span style= {{fontSize: "2.5em"}}> + </span>
        </Button>
        </div>
        <AtividadeLista
          atividades={atividades}
          deletarAtividade={deletarAtividade}
          pegarAtividade={pegarAtividade}
        />
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
          <Modal.Body>
            <AtividadeForm 
              addAtividade={addAtividade}
              cancelarAtividade={cancelarAtividade}
              atualizarAtividade={atualizarAtividade}
              atividades={atividades}
              ativSelecionada={atividade}
            />
          </Modal.Body>
        </Modal>
    </>
  );
}

export default App;
