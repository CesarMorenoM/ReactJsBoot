import { useContext } from 'react'
import UserContext from '../../context/UserContext/UserContext'
import toast from 'react-hot-toast'

import './Menu.scss'
import Loader from '../Common/Loader/Loader'
import Card from '../Common/Cards/Card'


import React, { useState, useEffect } from 'react';
import Switch from "react-switch";
import ModalView from './Modal/Modal'

async function PutData(id, datos) {
  const res = await fetch(`https://6100c9a4bca46600171cf9be.mockapi.io/datosMenu/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      habilitado: datos[id - 1].habilitado
    })
  });
  res.json()
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

const Menu = ({ franch = true }) => {

  const { branches } = useContext(UserContext)
  const branch = branches[0]

  //Hooks
  const [datosMenu, setDatosMenu] = useState([])
  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    const res = await fetch(`https://6100c9a4bca46600171cf9be.mockapi.io/datosMenu`);
    return res.json()
      .then(res => setDatosMenu(res))
      .catch(err => console.log(err))
  }

  const handleToggleDetails = () => {

  }

  const handleChangeButton = (checked, e, id) => {
    const datos = datosMenu
    datos[id - 1].habilitado = checked
    PutData(id, datos)
    setDatosMenu([...datos])
  }
  const HandleDeleteItem = () => {
    //Notification to confirm
    toast(t => {
      return <div>
        <span>Estas seguro?</span>
        <i class="material-icons" onClick={() => toast.dismiss(t.id)}>cancel</i>
      </div>
    })
  }

  if (!datosMenu) return <Loader />
  return <>
    {!!franch &&
      <div className='menuList__header'>
        <h1 className='menuList__header__title'>{branch.name}</h1>
        <button className='menuList__header__button'>Settings</button>
      </div>}
    <Card title='Menu'>
      <div className="menuList">
        {
          datosMenu.map(plato => {
            return (
              <details key={plato.id} onToggle={handleToggleDetails} className='menuList__dish'>

                <summary className='menuList__dish__info'>
                  <span className='menuList__dish__name'>{plato.nombre}</span>
                  <div className="menuList__dish__options">
                    <Switch
                      onChange={handleChangeButton}
                      checked={plato.habilitado}
                      onColor="#ff3229"
                      onHandleColor="#ff3229"
                      handleDiameter={20}
                      uncheckedIcon={false}
                      checkedIcon={false}
                      boxShadow="0px 1px 4px rgba(0, 0, 0, 0.6)"
                      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                      height={15}
                      width={32}
                      className="react-switch"
                      id={plato.id}
                    />
                    <ModalView accion={'Edit'} plato={plato} />
                    <i className="menuList__dish__close material-icons" onClick={HandleDeleteItem}>close</i>
                  </div>

                </summary>
                <div className='menuList__dish__desc'>
                  <img className='menuList__dish__desc__img' src={plato.imagenProducto} alt='img' />
                  <div className='menuList__dish__desc__section'>
                    <p className='menuList__dish__desc__text'><span>Precio:</span> ${plato.precio}</p>
                    <p className='menuList__dish__desc__text'><span> Categoría:</span> {plato.categoria}</p>
                    <p className='menuList__dish__desc__text'><span>Calorías: </span>{plato['calorias-min']} - {plato['calorias-max']}</p>
                    <h4 className='menuList__dish__desc__subtitle'><span>Ingrediente</span>s</h4>
                    <p className="menuList__dish__desc__ingredients">{plato.ingredientes}</p>
                  </div>
                </div>

              </details>
            )
          })
        }

        <ModalView accion={"Agregar Plato"} plato={datosMenu.length} />
      </div>
    </Card>
  </>
}

export default Menu
