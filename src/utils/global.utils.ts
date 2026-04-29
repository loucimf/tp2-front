export const guard = (element: any): [boolean, any] => {
  if (element == null || element == undefined || !element) {
    return [true, null] // returns true if guard needed (fail)
  }
  return [false, element]
} // returns false if no guard needed (success)