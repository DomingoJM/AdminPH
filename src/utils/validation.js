// Validación de ITIN: 9 dígitos y empieza por 9
export function isValidItin(itin) {
  if (typeof itin !== 'string') return false
  const isNineDigits = /^\d{9}$/.test(itin)
  return isNineDigits && itin.startsWith('9')
}
