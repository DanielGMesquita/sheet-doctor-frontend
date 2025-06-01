import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000
})

export const excelApi = {
  async analyzeFile(file, onUploadProgress) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post('/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        )
        onUploadProgress?.(progress)
      }
    })

    return response.data
  },

  async checkFormulaErrors(file) {
    const formData = new FormData()
    formData.append('file', file)

    const response = await apiClient.post('/check-formula-errors/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    return response.data
  },

  async applyCorrections(file, corrections) {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('corrections', JSON.stringify(corrections))

    const response = await apiClient.post('/apply-corrections', formData, {
      responseType: 'blob',
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    // File download logic
    if (response.status !== 200) {
      throw new Error('Erro ao baixar o arquivo corrigido')
    }
    if (!response.data) {
      throw new Error('Nenhum dado recebido na resposta')
    }
    const blob = new Blob([response.data])
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `corrected_${file.name}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)

    return response.data
  },

  async checkHealth() {
    const response = await apiClient.get('/health')
    return response.data
  }
}