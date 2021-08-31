import { useState } from "react"

/**
 * Create all the functionality of a calendar
 * @param {Number} navigation The current page that we're showing
 * @param {Array<Object>} events The events of the current branch
 */
const useCalendar = (navigation, events) => {

  //Today
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const date = new Date()
  if (navigation !== 0) {
    date.setDate(1)
    date.setMonth(new Date().getMonth() + navigation)
  }

  //Separate the different parts of Today
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()

  //Define the basic info of the month
  const firstDay = new Date(year, month, 1)
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  //Get the day of the week when the month starts
  const dateInString = firstDay.toLocaleDateString('en-US', { weekday: 'short' })
  const paddingDays = weekDays.indexOf(dateInString)

  /**
   * Function to search the events in a specific date
   * @param {String} date String of the date
   * @returns An array with the events to the date
   */
  const eventsForDate = date => events.find(e => Date.parse(e.date) === Date.parse(date))

  //Generate the days for the month
  const days = []
  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const dayTemplate = {
      value: i - paddingDays,
      date: new Date(year, month, i - paddingDays).toLocaleDateString()
    }
    if (i - paddingDays === day && navigation === 0) dayTemplate.isInitialDay = true
    if (eventsForDate(dayTemplate.date)) dayTemplate.events = eventsForDate(dayTemplate.date)

    if (i > paddingDays) days.push(dayTemplate)
    else {
      days.push({})
    }
  }

  const [currentDay, setCurrentDay] = useState(days.find(day => day.isInitialDay))

  const displayToday = `${date.toLocaleDateString('en-US', { month: 'long' })} ${year}`

  return {
    displayToday,
    days,
    currentDay,
    setCurrentDay
  }
}

export default useCalendar
