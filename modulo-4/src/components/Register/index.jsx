import './styles.css';
import { api } from '../../services/api';
import { Link, useNavigate } from "react-router-dom";

export default function Register({form, setForm, error, setError}) {

    const navigate = useNavigate()

    async function handleSubmit (e) {
        e.preventDefault();

        if(!form.nome || !form.email || !form.senha || !form.confirmacaoSenha) {
            setError("Preencha todos os campos")
            return
        }

        if(form.senha !== form.confirmacaoSenha) {
            setError("Os campos senha e confirmação de senha precisam ser iguais.")
            return
        }

        setError("") 

        try {
            const response = await api.post('usuario', form)
            navigate('/signin')
        } catch (error) {
           console.log(error.response.data.mensagem)
        }
  
    }

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return (
        <div className='register-container bg-colorFFFFFF'>
            <h2 className='register-title color7978D9 rubik500 fsize-28'>Cadastre-se</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="nome" className='sign-label-form color484848 fsize-18 rubik400'>Nome</label>
                <input type="text" name="nome" id="nome" className='sign-input-form sign-input-gap' value={form.nome} onChange={(e) => handleChange(e) } />

                <label htmlFor="e-mail" className='sign-label-form color484848 fsize-18 rubik400'>E-mail</label>
                <input type="e-mail" name="email" id="email" className='sign-input-form sign-input-gap' value={form.email} onChange={(e) => handleChange(e) } />

                <label htmlFor="senha" className='sign-label-form color484848 fsize-18 rubik400'>Senha</label>
                <input type="password" name="senha" id="senha" className='sign-input-form sign-input-gap' value={form.senha} onChange={(e) => handleChange(e) } />

                <label htmlFor="confirmacao" className='sign-label-form color484848 fsize-18 rubik400'>Confirmação de senha</label>
                <input type="password" name="confirmacaoSenha" id="confirmacaoSenha" className='sign-input-form sign-input-gap' value={form.confirmacaoSenha} onChange={(e) => handleChange(e) } />
                <h1 className={error && "show-error-message"}>{error}</h1>
                <button className='sign-btn-form btn-register bg-color7978D9 rubik700 fsize-14 border-none colorFFFFFF pointer'>Cadastrar</button>
            </form>
            <h3 className='redirect-to-login color7B61FF lato700 fsize-14 text-align-center'>Já tem cadastro? <Link className='link-redirect redirect-to-login color7B61FF lato700 fsize-14 pointer' to="/signin">Clique aqui!</Link></h3>
        </div>
    )
}