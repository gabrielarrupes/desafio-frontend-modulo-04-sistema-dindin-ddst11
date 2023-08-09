import './styles.css';
import { useState } from 'react';
import { api } from '../../services/api';
import trashCan from '../../assets/trash-can.svg';


export default function DeleteTransaction({id}) {

    const [ deleteModal, setDeleteModal] = useState(false)

    const handleDeleteTransaction = async () => {

        try {
            const token = localStorage.getItem('token')
            const results = await api.delete(`transacao/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            setDeleteModal(!deleteModal)
        
        } catch (error) {
            console.log(error)
        }
    }

    return ( 
        <div className='delete-container '>
            <img className='pointer' src={trashCan} alt="ícone para excluir uma transação" onClick={() => setDeleteModal(!deleteModal)}/>
            {deleteModal && 
                <div className='delete-modal bg-colorE4F2FD'>
                    <h1 className='delete-modal-title color000000 rubik300 fsize-10 text-align-center'>Apagar item?</h1>
                    <div className='delete-modal-buttons'>
                        <button className='delete-modal-btn bg-color3A9FF1 colorFFFFFF rubik500 fsize-9 border-none pointer' onClick={() => handleDeleteTransaction()}>Sim</button>
                        <button className='delete-modal-btn bg-colorFF576B colorFFFFFF rubik500 fsize-9 border-none pointer' onClick={() => setDeleteModal(!deleteModal)}>Não</button>
                    </div>
                </div>}
        </div>
    )
}

