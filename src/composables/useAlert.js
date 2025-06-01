import { ref } from 'vue'

export function useAlert() {
  const alert = ref({
    message: '',
    type: 'info'
  })

  const showAlert = (message, type = 'info') => {
    alert.value = { message, type }
    
    // Auto-hide success and info messages
    if (type === 'success' || type === 'info') {
      setTimeout(() => {
        alert.value.message = ''
      }, 5000)
    }
  }

  const hideAlert = () => {
    alert.value.message = ''
  }

  return {
    alert,
    showAlert,
    hideAlert
  }
}