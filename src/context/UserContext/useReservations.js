import { useEffect, useReducer } from 'react'
import { notifyError } from '../../helpers/helpers'
import TYPES from '../types'
import { CANCELReservation, CONFIRMReservation, GETReservations } from './fetchMethods'


const useReservations = (branches) => {
  const reservationReducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case (TYPES.RESERVATIONS.GET_COPY): return {
        ...state,
        ...payload
      }
      default: return {
        ...state
      }
    }
  }

  const [state, dispatch] = useReducer(reservationReducer, {})

  useEffect(() => {
    if (branches) {
      let reservationsInfo = {}

      branches.forEach(branch => {
        GETReservations(branch.id)
          .then(res => {
            reservationsInfo = { ...reservationsInfo, [branch.id]: [...res] }
            dispatch({ type: TYPES.RESERVATIONS.GET_COPY, payload: { ...reservationsInfo } })
          })
      })

    }

  }, [branches])

  const confirmReservation = async (id) => {

    try {
      await CONFIRMReservation(id)
    } catch (err) {
      notifyError(err)
      return false
    }
  }

  const deleteReservation = async (id) => {
    try {
      await CANCELReservation(id)
    } catch (err) {
      notifyError(err)
      return false
    }
  }

  return {
    reservations: state,
    confirmReservation,
    deleteReservation
  }
}

export default useReservations
