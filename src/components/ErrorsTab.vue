<!-- 📁 src/components/ErrorsTab.vue -->
<template>
  <div class="errors-tab">
    <div class="errors-header">
      <h3>
        <i class="fas fa-exclamation-triangle"></i>
        Erros de Fórmula Detectados ({{ formulaErrors.length }})
      </h3>
      <div class="filter-controls">
        <select v-model="selectedFilter" class="filter-select">
          <option value="all">Todos os Erros</option>
          <option value="syntax">Erros de Sintaxe</option>
          <option value="reference">Referências Inválidas</option>
          <option value="function">Funções Incorretas</option>
          <option value="circular">Referências Circulares</option>
          <option value="division">Divisão por Zero</option>
          <option value="name">Nomes Indefinidos</option>
          <option value="value">Erros de Valor</option>
        </select>
      </div>
    </div>

    <div class="errors-summary">
      <div class="summary-grid">
        <div class="summary-item" v-for="(count, type) in errorSummary" :key="type">
          <div class="summary-icon" :class="`icon-${type}`">
            <i :class="getErrorIcon(type)"></i>
          </div>
          <div class="summary-content">
            <span class="summary-count">{{ count }}</span>
            <span class="summary-label">{{ getErrorLabel(type) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="errors-list">
      <div 
        v-for="error in filteredErrors" 
        :key="`${error.sheet}-${error.cell}`"
        class="error-item"
      >
        <div class="error-header">
          <div class="error-location">
            <span class="sheet-badge">{{ error.sheet }}</span>
            <span class="cell-badge">{{ error.cell }}</span>
            <span :class="['error-type', `type-${error.type}`]">
              {{ getErrorLabel(error.type) }}
            </span>
          </div>
          <div class="error-severity" :class="`severity-${error.severity || 'medium'}`">
            {{ getSeverityLabel(error.severity || 'medium') }}
          </div>
        </div>

        <div class="error-content">
          <div class="error-formula">
            <label class="formula-label">
              <i class="fas fa-code"></i>
              Fórmula com Erro
            </label>
            <div class="formula-display">
              <code>{{ error.formula }}</code>
            </div>
          </div>

          <div class="error-description">
            <label class="description-label">
              <i class="fas fa-info-circle"></i>
              Descrição do Erro
            </label>
            <p>{{ error.description || getDefaultErrorDescription(error.type) }}</p>
          </div>

          <div v-if="error.suggestion" class="error-suggestion">
            <label class="suggestion-label">
              <i class="fas fa-lightbulb"></i>
              Sugestão de Correção
            </label>
            <p>{{ error.suggestion }}</p>
          </div>

          <div class="error-impact" v-if="error.impact">
            <label class="impact-label">
              <i class="fas fa-exclamation-circle"></i>
              Impacto
            </label>
            <p>{{ error.impact }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="filteredErrors.length === 0" class="no-errors">
      <i class="fas fa-check-circle"></i>
      <p v-if="selectedFilter === 'all'">
        Nenhum erro encontrado nas fórmulas do arquivo.
      </p>
      <p v-else>
        Nenhum erro do tipo "{{ getErrorLabel(selectedFilter) }}" foi encontrado.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorsTab',
  props: {
    formulaErrors: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedFilter: 'all'
    }
  },
  computed: {
    filteredErrors() {
      if (this.selectedFilter === 'all') {
        return this.formulaErrors
      }
      return this.formulaErrors.filter(error => error.type === this.selectedFilter)
    },
    errorSummary() {
      const summary = {}
      this.formulaErrors.forEach(error => {
        const type = error.type || 'unknown'
        summary[type] = (summary[type] || 0) + 1
      })
      return summary
    }
  },
  methods: {
    getErrorLabel(type) {
      const labels = {
        'syntax': 'Sintaxe',
        'reference': 'Referência',
        'function': 'Função',
        'circular': 'Circular',
        'division': 'Divisão/Zero',
        'name': 'Nome',
        'value': 'Valor',
        'unknown': 'Desconhecido'
      }
      return labels[type] || 'Desconhecido'
    },
    getErrorIcon(type) {
      const icons = {
        'syntax': 'fas fa-code',
        'reference': 'fas fa-link',
        'function': 'fas fa-function',
        'circular': 'fas fa-sync-alt',
        'division': 'fas fa-divide',
        'name': 'fas fa-tag',
        'value': 'fas fa-exclamation',
        'unknown': 'fas fa-question'
      }
      return icons[type] || 'fas fa-question'
    },
    getSeverityLabel(severity) {
      const labels = {
        'low': 'Baixa',
        'medium': 'Média',
        'high': 'Alta',
        'critical': 'Crítica'
      }
      return labels[severity] || 'Média'
    },
    getDefaultErrorDescription(type) {
      const descriptions = {
        'syntax': 'A fórmula contém erros de sintaxe que impedem sua execução correta.',
        'reference': 'A fórmula referencia células ou intervalos que não existem.',
        'function': 'A função utilizada não existe ou está sendo usada incorretamente.',
        'circular': 'A fórmula cria uma referência circular que causa erro de cálculo.',
        'division': 'A fórmula resulta em divisão por zero.',
        'name': 'A fórmula referencia um nome que não foi definido.',
        'value': 'A fórmula produz um valor inválido ou incompatível.',
        'unknown': 'Erro não identificado na fórmula.'
      }
      return descriptions[type] || 'Erro desconhecido detectado na fórmula.'
    }
  }
}
</script>

<style scoped>
.errors-tab {
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.errors-header {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.errors-header h3 {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.filter-select {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.9rem;
}

.filter-select option {
  color: #333;
}

.errors-summary {
  background: #f8f9fa;
  padding: 20px;
  border-bottom: 1px solid #e9ecef;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
}

.summary-item {
  background: white;
  border-radius: 10px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.summary-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: white;
}

.icon-syntax { background: #ff6b6b; }
.icon-reference { background: #ffa726; }
.icon-function { background: #66bb6a; }
.icon-circular { background: #ab47bc; }
.icon-division { background: #ffca28; }
.icon-name { background: #42a5f5; }
.icon-value { background: #ec407a; }
.icon-unknown { background: #78909c; }

.summary-content {
  display: flex;
  flex-direction: column;
}

.summary-count {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.summary-label {
  font-size: 0.8rem;
  color: #666;
  text-transform: uppercase;
}

.errors-list {
  padding: 20px;
}

.error-item {
  border: 1px solid #e9ecef;
  border-radius: 10px;
  margin-bottom: 15px;
  overflow: hidden;
}

.error-header {
  background: #f8f9fa;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

.error-location {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.sheet-badge {
  background: #4CAF50;
  color: white;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: bold;
}

.cell-badge {
  background: #2196F3;
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-family: monospace;
  font-weight: bold;
  font-size: 0.8rem;
}

.error-type {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  border: 1px solid;
}

.type-syntax { background: #ffebee; color: #c62828; border-color: #f44336; }
.type-reference { background: #fff3e0; color: #ef6c00; border-color: #ff9800; }
.type-function { background: #e8f5e8; color: #2e7d32; border-color: #4caf50; }
.type-circular { background: #f3e5f5; color: #7b1fa2; border-color: #9c27b0; }
.type-division { background: #fff8e1; color: #f57f17; border-color: #ffc107; }
.type-name { background: #e3f2fd; color: #1565c0; border-color: #2196f3; }
.type-value { background: #fce4ec; color: #ad1457; border-color: #e91e63; }

.error-severity {
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
}

.severity-low { background: #e8f5e8; color: #2e7d32; }
.severity-medium { background: #fff3e0; color: #ef6c00; }
.severity-high { background: #ffebee; color: #c62828; }
.severity-critical { background: #f3e5f5; color: #4a148c; }

.error-content {
  padding: 20px;
}

.error-content label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
  font-size: 0.9rem;
}

.formula-display {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 12px;
  margin-bottom: 15px;
  font-family: 'Courier New', monospace;
  overflow-x: auto;
}

.error-content p {
  color: #666;
  line-height: 1.5;
  margin: 0 0 15px 0;
}

.no-errors {
  text-align: center;
  padding: 40px;
  color: #2e7d32;
}

.no-errors i {
  font-size: 3rem;
  margin-bottom: 15px;
  display: block;
}

@media (max-width: 768px) {
  .errors-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }
  
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .error-header {
    flex-direction: column;
    gap: 10px;
    align-items: stretch;
  }
  
  .error-location {
    justify-content: center;
  }
}
</style>