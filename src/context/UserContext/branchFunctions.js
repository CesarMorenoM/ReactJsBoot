//import { prevMonth } from "../../helpers/helpers"

/**
 * Generate a general branch from a branches list
 * @param {Array<Object>} branches Base branches
 * @returns Array of branches with the general branch
 * @returns Same array if it have less than 1 branch
 */
/* export const createGeneralBranch = branches => {
  if (branches.length > 1) {
    let generalBranch = { name: 'General' }
    generalBranch.lastsells =
      branches
        .map(a => a.lastsells)
        .reduce((a, b) =>
          a.map((num, idx) => b[idx] ? num + b[idx] : num))
    generalBranch.dishes =
      branches
        .map(a => a.dishes)
        .reduce((a, b) => a.concat(b))
        .filter((elem, index, arr) => {
          let names = arr.map(a => a.name)
          if (!names.includes(elem.name, index + 1)) return elem
          else {
            let indexPos = names.indexOf(elem.name, index + 1)
            arr[indexPos].sold = elem.sold + arr[indexPos].sold
            return null
          }
        })
    generalBranch.id = 9999
    branches.unshift(generalBranch)
    return branches
  } else return branches
} */

/**
 * Generate extra info to branches
 * (bestMonth, bestDishes, allSells)
 * @param {Array<Object>} branchesMap Base branches
 * @returns Array of branches with the info added
 */
/* export const createBranchesInfo = branchesMap => {
  let branches = [...branchesMap]
  branches.map(branch => {
    const today = new Date()
    today.setDate(1)

    branch.bestDishes = branch.dishes.sort((a, b) => b.sold - a.sold).slice(0, 4)

    branch.bestMonth = { 'sells': [...branch.lastsells.slice(0, today.getMonth() + 1)].sort((a, b) => b - a)[0] }
    branch.bestMonth.index = branch.lastsells.indexOf(branch.bestMonth.sells)
    branch.bestMonth.month = prevMonth(0, today.setMonth(today.getMonth() - branch.bestMonth.index)).toString()

    branch.allSells = branch.lastsells.slice(0, new Date().getMonth() + 1).reduce((a, b) => a + b)
    return branch
  })
  return branches
} */
