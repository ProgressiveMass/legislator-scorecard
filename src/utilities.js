export const getLastName = name => {
  const splitName = name.split(/\s/)
  // last name if there's a final thing like "jr" or "the third"
  const possibleLast = splitName.find(item => item.match(/,$/))
  const lastName = possibleLast
    ? possibleLast.replace(',', '')
    : splitName.slice(-1)[0]
  return lastName
}
