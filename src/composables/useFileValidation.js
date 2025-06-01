export function useFileValidation() {
  const validateFile = (file) => {
    const errors = []

    if (!file.name.endsWith('.xlsx')) {
      errors.push('Apenas arquivos .xlsx são suportados.')
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB
      errors.push('Arquivo muito grande. Máximo: 10MB.')
    }

    return {
      isValid: errors.length === 0,
      errors
    }
  }

  return {
    validateFile
  }
}