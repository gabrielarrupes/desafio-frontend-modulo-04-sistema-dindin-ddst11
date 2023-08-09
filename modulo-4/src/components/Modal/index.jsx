import { api } from '../../services/api';
import close from '../../assets/close.svg'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import blackArrow from '../../assets/black-arrow.svg'


export default function Modal({ modal, setModal }) {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        tipo: "",
        descricao: "",
        valor: "",
        data: "",
        categoria_id: "",
        categoria: ""
    })

    const [formError, setFormError] = useState('')

    const [category, setCategory] = useState('')

    const getCategorias = async () => {

        try {
            const token = localStorage.getItem('token')
            const categorias = await api.get("categoria", { headers: { Authorization: `Bearer ${token}` } });
            setCategory(categorias.data)

        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        getCategorias();
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormulario) => ({
            ...prevFormulario,
            [name]: value
        }));
    };

    const handleSelectOnChange = (e) => {
        const arrSelect = [...category]
        const selected = arrSelect.find((select) => select.descricao === e.target.value)
        setFormData({ ...formData, [e.target.name]: selected.descricao, [e.target.id]: selected.id })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDate = new Date();
        const transactionDate = Date.parse(formData.data);

        if (!formData.tipo || !formData.descricao || !formData.valor || !formData.data || !formData.categoria) {
            setFormError("Preencha todos os campos")
            return;
        }

        if(formData.valor <= 0) {
            setFormError("Digite um valor superior à zero")
            return;
        }

        if(transactionDate > newDate.getTime()) {
            setFormError("Data inválida")
            return;
        }

        let token = await localStorage.getItem('token')
        try {
            await api.post('transacao', formData, { headers: { Authorization: `Bearer ${token}` } })
            setModal(!modal)

        } catch (error) {
            console.log(error)
        }

        navigate('/main')

    }

    return (
        <div className='edit-container'>
        <div className='modal-transactions-container bg-colorFFFFFF'>
            <div className='modal-title-box'>
                <h1 className='color000000 rubik700 fsize-36'>Adicionar Registro</h1>
                <img className='pointer' src={close} alt="Fecha modal" onClick={() => setModal(!modal)}/>
            </div>
            <form className='modal-transactions-in-out-form'>
                <div className='modal-transactions-in-out-box'>
                    <button className='modal-transactions-in-out-btn bg-colorB9B9B9 colorFFFFFF rubik700 border-none pointer' onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setFormData({ ...formData, tipo: "entrada" })
                    }}>Entrada</button>
                    <button className='modal-transactions-in-out-btn bg-colorB9B9B9 colorFFFFFF rubik700 border-none pointer' onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setFormData({ ...formData, tipo: "saida" })
                    }}>Saída</button>
                </div>
                <label htmlFor="valor" className='modal-label-gap color484848 rubik500 fsize-24'>Valor</label>
                <input className='modal-input'
                    type="number"
                    value={formData.valor}
                    name='valor'
                    onChange={handleChange}
                />
                <label htmlFor="categoria" className='modal-label-gap color484848 rubik500 fsize-24'> Categoria</label>
                <img className='black-arrow pointer' src={blackArrow} alt="Seta para selecionar uma categoria"/>
                {category && <select className='modal-input' onChange={handleSelectOnChange} name="categoria" id="categoria_id" value={formData.categoria}>
                    <option>Selecione</option>
                    {category.map((c) => (
                        <option
                            key={c.id}
                            value={c.descricao}>
                            {c.descricao}
                        </option>
                    ))}
                </select>}
                <label htmlFor="data" className='modal-label-gap color484848 rubik500 fsize-24'>Data</label>
                
                <input className='modal-input'
                    type="date"
                    value={formData.data}
                    name='data'
                    onChange={handleChange}
                />
                <label htmlFor="descricao" className='modal-label-gap color484848 rubik500 fsize-24'>Descrição</label>
                <input className='modal-input'
                    type="text"
                    value={formData.descricao}
                    name='descricao'
                    onChange={handleChange}
                    maxLength={36}
                />
                <h1 className={formError && "show-error-message"}>{formError}</h1>
            </form>
            <div className='modal-btn-gap'>
                <button
                    type='submit'
                    className='modal-btn-confirm colorFFFFFF bg-color7978D9 rubik700 fsize-14 border-none pointer'
                    onClick={handleSubmit}
                >Confirmar
                </button>
            </div>
        </div>
        </div>
    )
}