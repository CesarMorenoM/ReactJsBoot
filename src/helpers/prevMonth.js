//! Micelaneus functions
const prevMonth = (max, date = new Date()) => {
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
export default prevMonth