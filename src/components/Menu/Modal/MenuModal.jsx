//libraries
import { useState } from 'react'
import Modal from 'react-modal'
import PropTypes from 'prop-types'
//components
import MenuRegister from '../Register/MenuRegister'
import './modal.scss'

const MenuModal = ({ action, dish, branch }) => {
  const [modalIsOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
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

MenuModal.propTypes = {
  /**What kind of modal is? ( 'Edit' | any ) */
  action: PropTypes.string,
  /**The current dish */
  dish: PropTypes.object,
  /**The current branch */
  branch: PropTypes.object
}

export default MenuModal
