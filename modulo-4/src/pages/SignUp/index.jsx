import './styles.css';
import Background from '../../components/Background';
import { useState } from "react";
import Register from '../../components/Register';

export default function SignUp() {

    const [form, setForm] = useState({
        nome: "",
        email: "",
        senha: "",
        confirmacaoSenha: ""

    });
    const [error, setError] = useState("");

    return (
        <div className='sign-container'>
            <Background>
                <div className='align-sign-up-container'>
                    <Register form={form} setForm={setForm} error={error} setError={setError}/>
                </div>
            </Background>
        </div>
    )
}