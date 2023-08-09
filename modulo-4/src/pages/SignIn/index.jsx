
import './styles.css';
import { useState } from "react";
import Login from '../../components/Login';
import InfoRegister from '../../components/InfoRegister';
import Background from '../../components/Background';


export default function SignIn() {

    const [form, setForm] = useState({
        email: "",
        senha: ""
    });

    const [error, setError] = useState("");

    return (
        <div className='sign-container'>
            <Background>
                <div className='align-sign-in-container'>
                    <InfoRegister />
                    <Login form={form} setForm={setForm} error={error} setError={setError}/>
                </div>
            </Background>
        </div>
    )
}