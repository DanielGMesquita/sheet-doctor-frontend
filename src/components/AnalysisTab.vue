<template>
  <div class="analysis-tab">
    <StatisticsGrid :analysisResult="analysisResult" />
    
    <div v-if="analysisResult.corrections.length > 0" class="corrections-section">
      <h3 class="section-title">
        <i class="fas fa-tools"></i> Correções Sugeridas
      </h3>
      
      <CorrectionItem
        v-for="correction in analysisResult.corrections"
        :key="`${correction.sheet}-${correction.cell}`"
        :correction="correction"
      />

      <div class="apply-button-container">
        <button 
          class="btn"
          @click="$emit('applyCorrections')"
          :disabled="isLoading"
        >
          <i class="fas fa-magic"></i> Aplicar Todas as Correções
        </button>
      </div>
    </div>

    <div v-else class="no-errors">
      <i class="fas fa-check-circle"></i>
      Parabéns! Nenhum erro foi encontrado nas fórmulas do seu arquivo.
    </div>
  </div>
</template>

<script>
import StatisticsGrid from './StatisticsGrid.vue'
import CorrectionItem from './CorrectionItem.vue'

export default {
  name: 'AnalysisTab',
  components: {
    StatisticsGrid,
    CorrectionItem
  },
  props: {
    analysisResult: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['applyCorrections']
}
</script>

<style scoped>
.corrections-section {
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.section-title {
  margin-bottom: 20px;
  color: #333;
}

.apply-button-container {
  text-align: center;
  margin-top: 30px;
}

.no-errors {
  background: #e8f5e8;
  color: #2e7d32;
  border: 1px solid #4CAF50;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}
</style>