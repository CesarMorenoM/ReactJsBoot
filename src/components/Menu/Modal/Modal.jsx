//libraries
import { useState } from 'react'
import Modal from 'react-modal';
//components
import MenuRegister from '../Register/MenuRegister';
import './modal.scss'

const ModalView = ({ action, dish, branch }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className='modalMenu'>
      <button className={`modalMenu__${action === "Edit" ? "edit" : "add"}`} onClick={openModal}>{action}</button>

      <Modal
        className='modalMenu__modal'
        isOpen={modalIsOpen}
        onAfterOpen={() => { }}
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <MenuRegister dish={dish} closeModal={closeModal} branch={branch} action={action} />
      </Modal>
    </div>
  )
}

export default ModalView
