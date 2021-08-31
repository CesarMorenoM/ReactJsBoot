import toast from "react-hot-toast"

//! Concat different functions
export const pipe = (...functions) => value => functions.reduce((acc, func) => func(acc), value)

//! Get the last N months (in text)
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

//! Capitalize an string
export const capitalize = text => text
  .toLowerCase()
  .replace(/\w/, firstLetter => firstLetter.toUpperCase())

//! Transform a text separated by commas in an array
export const toArray = arr => arr.split(',')
  .map(el => capitalize(el.trim()))

//! Show an error notification
export const notifyError = err => {
  toast.error(`Sorry, ${err}`,
    { duration: 1500, iconTheme: { primary: '#ff3229' } }
  )
}