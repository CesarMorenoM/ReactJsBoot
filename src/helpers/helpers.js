import toast from "react-hot-toast"

/**
 * Concat different functions
 * @param  {...functions} functions 
 */
export const pipe = (...functions) => value => functions.reduce((acc, func) => func(acc), value)

/**
 * Get an array of the last N months 
 * @param {number} max How many months
 * @param {date} [date] Optional: The start date (today by default)
 * @returns {Array} Array with names of last months
 */
export const prevMonth = (max, date = new Date()) => {
  max += 1
  let temp = new Date(date)
  const prevMonths = []
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  for (let i = 0; i < max; i++) {
    if (temp.getMonth) {
      prevMonths.push(months[temp.getMonth()])
      temp = new Date(temp.setMonth(temp.getMonth() - 1))

    } else {
      prevMonths.push(months[temp.getMonth()])
      temp = temp.setYear(temp.getYear() - 1);
      temp.setMonth(12);
    }
  }
  return [...new Set(prevMonths)]
}

/**
 * Capitalize an string
 * @param {String} text Text to transform
 * @return String capitalized
 */
export const capitalize = text => text
  .toLowerCase()
  .replace(/\w/, firstLetter => firstLetter.toUpperCase())

/**
 * Transform an array into a text 
 * @param {Array} arr Array to transform
 * @returns String separated by commas
 */
export const toText = arr => {
  return arr.split(',')
    .map(el => capitalize(el.trim()))
}

/**
 * Show an error notification
 * @param {string} err Message to show
 */
export const notifyError = err => {
  toast.error(`Sorry, ${err}`,
    { duration: 1500, iconTheme: { primary: '#ff3229' } }
  )
}