
export function sanitizePhoneNumber(numberStr) {
  return numberStr.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
}
