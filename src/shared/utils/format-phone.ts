export const formatPhone = (phone: string) => {
  if (phone.length > 10) {
    return phone
      .split('')
      .filter(
        (element) =>
          element !== '(' && element !== ')' && element !== '-' && element !== ' '
      )
      .join('')
  }
  return ''
}
