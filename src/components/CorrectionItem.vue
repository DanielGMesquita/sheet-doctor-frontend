<template>
  <div class="correction-item">
    <div class="correction-header">
      <div class="correction-location">
        <span class="sheet-name">{{ correction.sheet }}</span>
        <span class="cell-reference">{{ correction.cell }}</span>
      </div>
      <div class="correction-type">
        <span :class="['type-badge', `type-${correction.type}`]">
          {{ getTypeLabel(correction.error_type) }}
        </span>
      </div>
    </div>

    <div class="correction-content">
      <div class="formula-comparison">
        <div class="formula-section">
          <label class="formula-label error">
            <i class="fas fa-times-circle"></i>
            Fórmula Original (com erro)
          </label>
          <div class="formula-box error">
            <code>{{ correction.original }}</code>
          </div>
        </div>

        <div class="arrow-container">
          <i class="fas fa-arrow-right"></i>
        </div>

        <div class="formula-section">
          <label class="formula-label success">
            <i class="fas fa-check-circle"></i>
            Fórmula Corrigida
          </label>
          <div class="formula-box success">
            <code>{{ correction.corrected }}</code>
          </div>
        </div>
      </div>

      <div class="correction-details">

        <div class="correction-explanation">
          <h4>
            <i class="fas fa-lightbulb"></i>
            Explicação da Correção
          </h4>
          <p>{{ correction.issue }}</p>
        </div>

        <div v-if="correction.confidence" class="confidence-score">
          <h4>
            <i class="fas fa-chart-line"></i>
            Confiança da Correção
          </h4>
          <div class="confidence-bar">
            <div 
              class="confidence-fill" 
              :style="{ width: `${correction.confidence * 100}%` }"
              :class="getConfidenceClass(correction.confidence * 100)"
            ></div>
          </div>
          <span class="confidence-text">{{ correction.confidence * 100}}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CorrectionItem',
  props: {
    correction: {
      type: Object,
      required: true
    }
  },
  methods: {
    getTypeLabel(type) {
      const labels = {
        'syntax': 'Erro de Sintaxe',
        'reference': 'Referência Inválida',
        'function': 'Função Incorreta',
        'circular': 'Referência Circular',
        'division': 'Divisão por Zero',
        'name': 'Nome Indefinido',
        'value': 'Erro de Valor'
      }
      return labels[type] || 'Erro Desconhecido'
    },
    getConfidenceClass(confidence) {
      if (confidence >= 80) return 'high'
      if (confidence >= 60) return 'medium'
      return 'low'
    }
  }
}
</script>

<style scoped>
.correction-item {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  margin-bottom: 20px;
  overflow: hidden;
}

.correction-header {
  background: white;
  padding: 15px 20px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.correction-location {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sheet-name {
  background: #4CAF50;
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: bold;
}

.cell-reference {
  background: #2196F3;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-weight: bold;
}

.type-badge {
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
}

.type-syntax { background: #ffebee; color: #c62828; }
.type-reference { background: #fff3e0; color: #ef6c00; }
.type-function { background: #e8f5e8; color: #2e7d32; }
.type-circular { background: #f3e5f5; color: #7b1fa2; }
.type-division { background: #fff8e1; color: #f57f17; }
.type-name { background: #e3f2fd; color: #1565c0; }
.type-value { background: #fce4ec; color: #ad1457; }

.correction-content {
  padding: 20px;
}

.formula-comparison {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 20px;
  align-items: center;
  margin-bottom: 25px;
}

.formula-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.formula-label.error {
  color: #c62828;
}

.formula-label.success {
  color: #2e7d32;
}

.formula-box {
  background: white;
  border: 2px solid;
  border-radius: 8px;
  padding: 12px;
  font-family: 'Courier New', monospace;
  word-break: break-all;
}

.formula-box.error {
  border-color: #f44336;
  background: #ffebee;
}

.formula-box.success {
  border-color: #4CAF50;
  background: #e8f5e8;
}

.arrow-container {
  text-align: center;
  color: #4CAF50;
  font-size: 1.5rem;
}

.correction-details {
  display: grid;
  gap: 20px;
}

.correction-details h4 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #333;
  margin-bottom: 8px;
  font-size: 1rem;
}

.correction-details p {
  color: #666;
  line-height: 1.5;
  margin: 0;
}

.confidence-score {
  background: white;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
}

.confidence-bar {
  background: #e9ecef;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  margin: 10px 0;
}

.confidence-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 4px;
}

.confidence-fill.high {
  background: linear-gradient(90deg, #4CAF50, #66BB6A);
}

.confidence-fill.medium {
  background: linear-gradient(90deg, #FF9800, #FFB74D);
}

.confidence-fill.low {
  background: linear-gradient(90deg, #f44336, #EF5350);
}

.confidence-text {
  font-weight: bold;
  color: #333;
}

@media (max-width: 768px) {
  .correction-header {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }
  
  .formula-comparison {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .arrow-container {
    transform: rotate(90deg);
  }
  
  .correction-content {
    padding: 15px;
  }
}
</style>