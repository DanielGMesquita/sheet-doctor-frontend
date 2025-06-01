<template>
  <div id="app">
    <div class="container">
      <AppHeader />
      <FileUpload
        v-model:selectedFile="selectedFile"
        :isLoading="isLoading"
        @analyze="handleAnalyze"
        @checkErrors="handleCheckErrors"
        @clear="handleClear"
      />
      <AlertMessage
        v-if="alert.message"
        :message="alert.message"
        :type="alert.type"
      />
      <ResultsSection
        v-if="hasResults"
        :analysisResult="analysisResult"
        :formulaErrors="formulaErrors"
        :isLoading="isLoading"
        @applyCorrections="handleApplyCorrections"
      />
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import AppHeader from './components/AppHeader.vue'
import FileUpload from './components/FileUpload.vue'
import AlertMessage from './components/AlertMessage.vue'
import ResultsSection from './components/ResultsSection.vue'
import { useExcelAnalysis } from './composables/useExcelAnalysis'
import { useAlert } from './composables/useAlert'

export default {
  name: 'App',
  components: {
    AppHeader,
    FileUpload,
    AlertMessage,
    ResultsSection
  },
  setup() {
    const { alert, showAlert } = useAlert()
    const {
      selectedFile,
      isLoading,
      analysisResult,
      formulaErrors,
      analyzeFile,
      checkFormulaErrors,
      applyCorrections,
      clearResults
    } = useExcelAnalysis(showAlert)

    const hasResults = computed(() => 
      analysisResult.value || formulaErrors.value.length > 0
    )

    const handleAnalyze = () => analyzeFile()
    const handleCheckErrors = () => checkFormulaErrors()
    const handleApplyCorrections = () => applyCorrections()
    
    const handleClear = () => {
      selectedFile.value = null
      clearResults()
      showAlert('Arquivo removido.', 'info')
    }

    return {
      selectedFile,
      isLoading,
      analysisResult,
      formulaErrors,
      hasResults,
      alert,
      handleAnalyze,
      handleCheckErrors,
      handleApplyCorrections,
      handleClear
    }
  }
}
</script>