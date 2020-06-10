import React,{useState} from 'react';
import Modal from 'react-modal';
import './App.css';

Modal.setAppElement('#root')
function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false)  
  return (
    <div>
        <button onClick ={() => setModalIsOpen(true)}>Open modal</button>
        <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
            <div className='demo'>
            
              
            <form>
            <h2>Please login first!</h2><br/>
                *username:<input type='text' name='username'></input><br/><br/>
                *password: <input type='text' name='password'></input><br/><br/>
                <button className="button" >Log in</button><br/><br/><br/>
                <button className="button" onClick={() => setModalIsOpen(false)}>Close</button>
            </form>
            </div>
            <div>
                
            </div>
        </Modal>
    </div>
  );
}

export default App;
