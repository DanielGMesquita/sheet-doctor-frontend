import { ref } from 'vue'
import { excelApi } from '../services/api'

export function useExcelAnalysis(showAlert) {
  const selectedFile = ref(null)
  const isLoading = ref(false)
  const analysisResult = ref(null)
  const formulaErrors = ref([])
  const uploadProgress = ref(0)

  const analyzeFile = async () => {
    if (!selectedFile.value) return

    isLoading.value = true
    
    try {
      const result = await excelApi.analyzeFile(
        selectedFile.value,
        (progress) => {
          uploadProgress.value = progress
        }
      )

      analysisResult.value = result
      
      if (result.errors_found > 0) {
        showAlert(
          `Análise concluída! ${result.errors_found} erros encontrados.`,
          'info'
        )
      } else {
        showAlert('Análise concluída! Nenhum erro encontrado.', 'success')
      }

    } catch (error) {
      console.error('Erro na análise:', error)
      showAlert(
        error.response?.data?.detail || 'Erro ao analisar arquivo.',
        'error'
      )
    } finally {
      isLoading.value = false
      uploadProgress.value = 100
      setTimeout(() => uploadProgress.value = 0, 2000)
    }
  }

  const checkFormulaErrors = async () => {
    if (!selectedFile.value) return

    isLoading.value = true

    try {
      const errors = await excelApi.checkFormulaErrors(selectedFile.value)
      formulaErrors.value = errors
      
      if (errors.length > 0) {
        showAlert(`${errors.length} erros de fórmula encontrados.`, 'info')
      } else {
        showAlert('Nenhum erro de fórmula encontrado!', 'success')
      }

    } catch (error) {
      console.error('Erro na verificação:', error)
      showAlert(
        error.response?.data?.detail || 'Erro ao verificar fórmulas.',
        'error'
      )
    } finally {
      isLoading.value = false
    }
  }

  const applyCorrections = async () => {
    if (!selectedFile.value || !analysisResult.value) return

    isLoading.value = true

    try {
      await excelApi.applyCorrections(
        selectedFile.value,
        analysisResult.value.corrections
      )
      
      showAlert('Correções aplicadas! Arquivo baixado com sucesso.', 'success')

    } catch (error) {
      console.error('Erro ao aplicar correções:', error)
      showAlert('Erro ao aplicar correções ao arquivo.', 'error')
    } finally {
      isLoading.value = false
    }
  }

  const clearResults = () => {
    analysisResult.value = null
    formulaErrors.value = []
  }

  return {
    selectedFile,
    isLoading,
    analysisResult,
    formulaErrors,
    uploadProgress,
    analyzeFile,
    checkFormulaErrors,
    applyCorrections,
    clearResults
  }
}