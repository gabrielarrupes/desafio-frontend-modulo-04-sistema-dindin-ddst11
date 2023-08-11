import './styles.css';
import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import close from '../../assets/close.svg'

export default function ModalEditUserData ({formProfile, setFormProfile, modalUser, setModalUser}) {

        const [ editUserError, setEditUserError ] = useState('')
        const [ confirmPassword, setConfirmPassword ] = useState('')
        const [ copyEditUserData, setCopyEditUserData ] = useState({...formProfile});  


        
        const handleChange = (e) => {
            setCopyEditUserData({...copyEditUserData, [e.target.name]: e.target.value});  
        };
       

        const handleChangeConfirmPassword = (e) => {
            setConfirmPassword(e.target.value);
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            e.stopPropagation()
    
            if (!copyEditUserData.nome || !copyEditUserData.email || !copyEditUserData.senha || !confirmPassword) {
                setEditUserError("Preencha todos os campos")
                return;
            }

            if(copyEditUserData.senha !== confirmPassword) {
                setEditUserError("Os campos senha e confirmação de senha precisam ser iguais")
                return;
            }
            
            setEditUserError("")
            setFormProfile({
                nome: copyEditUserData.nome,
                email: copyEditUserData.email,
                senha: copyEditUserData.senha,
            });

            let token = await localStorage.getItem('token');

            try {
                await api.put('usuario', formProfile, { headers: { Authorization: `Bearer ${token}` } })    
                setModalUser(!modalUser)
            } catch (error) {
                console.log(error)
            }
    
        }

        

    return (
        <div className='edit-container'>
            <div className='modal-edit-user-data-container bg-colorFFFFFF'>
                <div className='modal-title-box'>
                    <h1 className='color000000 rubik700 fsize-36'>Editar usuário</h1>
                    <img className='pointer' src={close} alt="close" onClick={() => setModalUser(!modalUser)}/>
                </div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nome" className='modal-label-gap color484848 rubik500 fsize-24'>Nome</label>
                    <input type="text" name="nome" id="nome" className='modal-input' value={copyEditUserData.nome} onChange={(e) =>
                         handleChange(e)} />

                    <label htmlFor="e-mail" className='modal-label-gap color484848 rubik500 fsize-24'>E-mail</label>
                    <input type="e-mail" name="email" id="email" className='modal-input' value={copyEditUserData.email} onChange={(e) => handleChange(e)}/>

                    <label htmlFor="senha" className='modal-label-gap color484848 rubik500 fsize-24'>Senha</label>
                    <input type="password" name="senha" id="senha" className='modal-input' value={copyEditUserData.senha} onChange={(e) => handleChange(e)}/>

                    <label htmlFor="confirmacao" className='modal-label-gap color484848 rubik500 fsize-24'>Confirmação de senha</label>
                    <input type="password" name="confirmacaoSenha" id="confirmacaoSenha" className='modal-input' value={confirmPassword} onChange={(e) => handleChangeConfirmPassword(e)} />
                    {editUserError && <h1 className='show-error-message'>{editUserError}</h1>}
                    <div className='modal-btn-gap'>
                        <button className='modal-btn-confirm modal-edit-user-data-btn colorFFFFFF bg-color7978D9 rubik700 fsize-14 border-none pointer' onClick={(e) => handleSubmit()}>Confirmar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}