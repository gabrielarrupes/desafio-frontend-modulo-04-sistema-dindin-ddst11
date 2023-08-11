import './styles.css';
import { api } from '../../services/api';
import { useNavigate } from "react-router-dom";

export default function Login({form, setForm, error, setError}) {

    const navigate = useNavigate()

    async function handleSubmit (e) {
        e.preventDefault();

        if(!form.email || !form.senha) {
            setError("Preencha todos os campos")
            return
        }
        setError("") 
        
        try {
            const response = await api.post('login', form)
            const {token} = response.data
            const {nome} = response.data.usuario
            localStorage.setItem('token', token);
            localStorage.setItem('nome', nome);
            navigate('/main')
        } catch (error) {
            setError(error.response.data.mensagem)
        }
        
    }

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    return(
        <div className='login-container bg-colorFFFFFF'>
            <h2 className='login-title color7978D9 rubik500 fsize-28'>Login</h2>
            <form onSubmit={handleSubmit}>         
                    <label htmlFor="e-mail" className='sign-label-form color484848 fsize-18 rubik400'> E-mail</label>
                    <input type="e-mail" name="email" id="email" className='sign-input-form sign-input-gap' value={form.email} onChange={ (e) => handleChange(e)}/>
                    <label htmlFor="senha" className='sign-label-form color484848 fsize-18 rubik400'>Senha</label>
                    <input type="password" name="senha" id="senha" className='sign-input-form' value={form.senha} onChange={ (e) => handleChange(e)} />
                    <h1 className={error && "show-error-message"}>{error}</h1>
                   <button className='sign-btn-form login-btn bg-color7978D9 rubik700 fsize-14 border-none colorFFFFFF pointer'>Entrar</button>
            </form>
        </div>
    )
}