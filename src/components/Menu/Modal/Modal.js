import React from 'react'
import Modal from 'react-modal';
import MenuRegister from '../Register/MenuRegister';
import './modal.scss'

const ModalView = ({ accion, plato }) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  const customStyles = {
    content: {
      backgroundColor: "#F5F4F4",
      scrollBehavior: "smooth",
      overflowY: "auto",
      maxWidth: '700px',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      border: "none",
      borderRadius: "15px",
      maxHeight: "90vh"
    },
  };

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className='modalMenu'>
      <button className={`modalMenu__${accion === "Edit" ? "edit" : "add"}`} onClick={openModal}>{accion}</button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <MenuRegister plato={plato} closeModal={closeModal} />

      </Modal>
    </div>
  )
}

export default ModalView
