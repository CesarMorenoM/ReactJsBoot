import React from 'react'
import Modal from 'react-modal';
import MenuRegister from '../Register/MenuRegister';
import './modal.scss'

const ModalView = ({ action, dish, branch }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

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
        contentLabel="Example Modal"
        ariaHideApp={false}
      >
        <MenuRegister dish={dish} closeModal={closeModal} branch={branch} />

      </Modal>
    </div>
  )
}

export default ModalView
