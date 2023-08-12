import { useState, useEffect } from "react";
import { api } from '../../services/api';
import close from "../../assets/close.svg";
import "./EditModal.css";

export default function EditModal({ setEditModal, editModal, id, transact, setTransact, customType, setCustomType }) {

  const currentTransaction = transact.find((current) => {return Number(current.id) === Number(id)})

  const [copyEditModal, setCopyEditModal] = useState({...currentTransaction, valor: currentTransaction.valor / 1000})

  const [formError, setFormError] = useState("");
  
  const [category, setCategory] = useState();

  
  const getCategorias = async () => {
    try {
      const token = localStorage.getItem("token");
      const categorias = await api.get("categoria", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategory(categorias.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorias();
  }, []);

  const handleSelectOnChange = (e) => {
    const arrSelect = [...category];
    const selected = arrSelect.find(
      (select) => select.descricao === e.target.value
    );
    setCopyEditModal({
      ...copyEditModal,
      [e.target.name]: selected.descricao,
      [e.target.id]: selected.id,
    });
  };

  const handleChange = (event) => {
    setCopyEditModal({...copyEditModal, [event.target.name]: event.target.value});
  };
  
  async function handleEdit(e) {
    e.preventDefault();
    e.stopPropagation();

    const newDate = new Date();
    const transactionDate = Date.parse(copyEditModal.data);

    if (!copyEditModal.tipo || !copyEditModal.descricao || !copyEditModal.valor || !copyEditModal.data || !copyEditModal.categoria) {
      setFormError("Preencha todos os campos");
      return;
    }

    if(copyEditModal.valor <= 0) {
        setFormError("Digite um valor superior à zero");
        return;
    }

    if(transactionDate > newDate.getTime()) {
        setFormError("Data inválida")
        return;
    }

    setFormError('');

    try {
      const token = await localStorage.getItem('token')
      await api.put(`transacao/${id}`, {
        tipo: copyEditModal.tipo,
        descricao: copyEditModal.descricao,
        valor: copyEditModal.valor * 1000,
        data: copyEditModal.data,
        categoria_id: copyEditModal.categoria_id

      }, { headers: { Authorization: `Bearer ${token}` } })
    }catch(error){
      console.log(error)
    }
    setEditModal(!editModal)
    setCustomType(0)
  }

  const formatCurrentDate = (date) => {
    const format = new Date(date);
    const formatado = format.toISOString().split('T')[0];
    return formatado
  }

  

  return (
    <div className="edit-container">
      <div className="modal-transactions-container bg-colorFFFFFF edit-modal">
        <div className="modal-title-box">
          <h1 className="color000000 rubik700 fsize-36">Editar Registro</h1>
          <img
            className="pointer"
            src={close}
            alt="Fecha modal"
            onClick={() => setEditModal(!EditModal)}
          />
        </div>
        <form className="modal-transactions-in-out-form">
          <div className="modal-transactions-in-out-box">
            <button
              className={`${customType === 1 || copyEditModal.tipo === "entrada" ? "bg-colorFF576B" : "bg-colorB9B9B9"} modal-transactions-in-out-btn colorFFFFFF rubik700 border-none pointer`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCustomType(1)
                setCopyEditModal({ ...copyEditModal, tipo: "entrada" });
              }}
            >
              Entrada
            </button>
            <button
              className={`${customType === 2 || copyEditModal.tipo === "saida"? "bg-color3A9FF1" : "bg-colorB9B9B9"} modal-transactions-in-out-btn colorFFFFFF rubik700 border-none pointer`}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setCustomType(2)
                setCopyEditModal({...copyEditModal, tipo: "saida" });
              }}
            >
              Saída
            </button>
          </div>
          <label htmlFor="valor" className="modal-label-gap color484848 rubik500 fsize-24">
            Valor
          </label>
          <input
            className="modal-input"
            type="number"
            name="valor"
            onChange={handleChange}
            value={copyEditModal.valor}
          />
          <label htmlFor="categoria" className="modal-label-gap color484848 rubik500 fsize-24">
            {" "}
            Categoria
          </label>
          {category && (
            <select
              className="modal-input"
              onChange={handleSelectOnChange}
              name="categoria"
              id="categoria_id"
              value={copyEditModal.categoria}
            >
              <option>{copyEditModal.categoria_nome} </option>
              {category.map((c) => (
                <option key={c.id} value={c.descricao}>
                  {c.descricao}
                </option>
              ))}
            </select>
          )}
          <label htmlFor="data" className="modal-label-gap color484848 rubik500 fsize-24">
            Data
          </label>
          <input
            className="modal-input"
            type="date"
            name="data"
            onChange={handleChange}
            value={formatCurrentDate(copyEditModal.data)}
          />
          <label htmlFor="descricao" className="modal-label-gap color484848 rubik500 fsize-24">
            Descrição
          </label>
          <input
            className="modal-input"
            type="text"
            name="descricao"
            onChange={handleChange}
            maxLength={36}
            value={copyEditModal.descricao}
          />
          <h1 className={formError && "show-error-message"}>{formError}</h1>
        </form>
        <div className="modal-btn-gap">
          <button
            type="submit"
            className="modal-btn-confirm colorFFFFFF bg-color7978D9 rubik700 fsize-14 border-none pointer"
            onClick={handleEdit}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
