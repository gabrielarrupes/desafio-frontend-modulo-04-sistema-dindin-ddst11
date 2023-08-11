import './styles.css';
import { api } from '../../services/api';
import { useState, useEffect} from 'react';
import profile from '../../assets/profile.svg';
import ModalEditUserData from '../ModalEditUserData';

export default function Profile ({modal, setModal}) {

    const [ formProfile, setFormProfile] = useState({
        nome: '',
        email: '',
        senha: '',
    })

    const [modalUser, setModalUser] = useState(false)

    const getUserData = async () => {
        try {
            const token = localStorage.getItem('token')
            const results = await api.get('usuario', { headers: { Authorization: `Bearer ${token}` } })
            console.log(results);
            setFormProfile({
                ...formProfile,
                nome: results.data.nome,
                email: results.data.email})

          } catch (error) {
            console.log(error)
          }
    }


    useEffect(() => {
        getUserData()    
    }, [])

    return (
        <div className='profile-container'>
            <img className='pointer' src={profile} alt="Perfil do usuário" onClick={() => setModalUser(!modalUser)}/>
            <span className='profile-name colorFFFFFF rubik700 fsize-14'>{formProfile.nome}</span>
            {modalUser && <ModalEditUserData formProfile={formProfile} setFormProfile={setFormProfile} modalUser={modalUser} setModalUser={setModalUser}/>}
        </div>
    )
}