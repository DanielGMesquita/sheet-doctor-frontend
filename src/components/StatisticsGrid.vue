<template>
  <div class="statistics-grid">
    <div class="stat-card">
      <div class="stat-icon">
        <i class="fas fa-file-excel"></i>
      </div>
      <div class="stat-content">
        <h3>{{ analysisResult.total_sheets }}</h3>
        <p>Planilhas</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <i class="fas fa-calculator"></i>
      </div>
      <div class="stat-content">
        <h3>{{ analysisResult.total_formulas }}</h3>
        <p>Fórmulas</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <i class="fas fa-exclamation-triangle"></i>
      </div>
      <div class="stat-content">
        <h3>{{ analysisResult.errors_found }}</h3>
        <p>Erros Encontrados</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <i class="fas fa-percentage"></i>
      </div>
      <div class="stat-content">
        <h3>{{ accuracyPercentage }}%</h3>
        <p>Precisão</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <i class="fas fa-tools"></i>
      </div>
      <div class="stat-content">
        <h3>{{ analysisResult.corrections?.length || 0 }}</h3>
        <p>Correções Sugeridas</p>
      </div>
    </div>

    <div class="stat-card">
      <div class="stat-icon">
        <i class="fas fa-clock"></i>
      </div>
      <div class="stat-content">
        <h3>{{ processingTime }}s</h3>
        <p>Tempo de Análise</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticsGrid',
  props: {
    analysisResult: {
      type: Object,
      required: true
    }
  },
  computed: {
    accuracyPercentage() {
      const total = this.analysisResult.total_formulas || 1
      const errors = this.analysisResult.errors_found || 0
      return Math.round(((total - errors) / total) * 100)
    },
    processingTime() {
      return this.analysisResult.processing_time?.toFixed(2) || '0.00'
    }
  }
}
</script>

<style scoped>
.statistics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background: white;
  border-radius: 15px;
  padding: 25px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 2.5rem;
  color: #4CAF50;
  margin-bottom: 15px;
}

.stat-content h3 {
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.stat-content p {
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .statistics-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
  
  .stat-card {
    padding: 20px;
  }
  
  .stat-icon {
    font-size: 2rem;
  }
  
  .stat-content h3 {
    font-size: 1.5rem;
  }
}
</style>