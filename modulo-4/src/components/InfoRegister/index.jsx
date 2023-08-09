import './styles.css';
import { Link } from "react-router-dom";

export default function InfoRegister() {

    return (
        <div className='info-register-container'>
            <h1 className='info-register-title colorFFFFFF rubik700 fsize-52'>Controle suas <strong className='color7978D9'>finanças</strong>, sem planilha chata.</h1>
            <h2 className='info-register-text colorFFFFFF rubik400 fsize-28'>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</h2>
            <Link to="/signup"><button className='info-register-btn colorFFFFFF bg-color7978D9 rubik700 fsize-14 border-none pointer'>Cadastre-se</button></Link>
        </div>
    )


}

