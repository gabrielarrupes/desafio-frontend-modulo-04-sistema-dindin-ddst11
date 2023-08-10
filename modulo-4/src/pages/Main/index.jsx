import './styles.css';
import { api } from '../../services/api';
import { useState, useEffect} from 'react';
import logo from '../../assets/Logo.svg';
import filter from '../../assets/filter.svg';
import Modal from '../../components/Modal'
import Table from '../../components/Table';
import Resume from '../../components/Resume';
import Logout from '../../components/Logout';
import Profile from '../../components/Profile';

export default function Main() {

  const [modal, setModal] = useState(false);
  const [transact, setTransact] = useState('');

  const getTransactions = async () => {

    try {
      const token = localStorage.getItem('token')
      const results = await api.get('transacao', { headers: { Authorization: `Bearer ${token}` } })
      setTransact(results.data)
      
    } catch (error) {
      console.log(error)
    }
      
  }
  
  useEffect(() => {
      getTransactions()     
  }, [transact])

  return (

    <div className='main-container'>
      <header className='main-header'>
            <img className='dindin-logo' src={logo} alt="dindin" />
            <div className='main-profile'>
              <Profile/>
              <Logout />
            </div>
      </header>
      <main className='main-functionalities bg-colorFFFFFF'>
        {modal && <Modal modal={modal} setModal={setModal}/>}
        <div className='main-transactions'>
          <div className='main-filter'>
            <button className='btn-filter bg-colorFAFAFA color000000 lato700 fsize-12 border-none pointer' type='submit'>
              <img src={filter} alt="Botão para filtrar as transações por categoria" />
              Filtrar
            </button>
          </div>
            <div className='main-table'>
              <Table transact={transact} setTransact={setTransact}/>
            </div>
          </div>
        <div className='main-resume'>
            <div className='main-resume-sidebar'>
              <Resume transact={transact}/>
            </div>
            <div className='main-sidebar-btn-add-transaction'>
              <button className='btn-add-transaction colorFFFFFF bg-color7978D9 rubik700 fsize-14 border-none pointer' type='submit' onClick={() => setModal(true)}>Adicionar Registro</button>
            </div>
        </div>  
      </main>
    </div>
  )
}


