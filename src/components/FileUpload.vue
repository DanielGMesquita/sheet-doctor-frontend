<template>
  <div class="main-card">
    <div class="card-header">
      <h2><i class="fas fa-upload"></i> Enviar Arquivo Excel</h2>
    </div>
    <div class="card-content">
      <DropZone
        :selectedFile="selectedFile"
        @fileSelected="handleFileSelect"
      />
      
      <div class="action-buttons">
        <button 
          class="btn" 
          :disabled="!selectedFile || isLoading"
          @click="$emit('analyze')"
        >
          <i class="fas fa-search"></i> Analisar Arquivo
        </button>
        
        <button 
          class="btn btn-secondary" 
          :disabled="!selectedFile || isLoading"
          @click="$emit('checkErrors')"
        >
          <i class="fas fa-bug"></i> Verificar Erros
        </button>
        
        <button 
          class="btn btn-danger" 
          :disabled="!selectedFile"
          @click="$emit('clear')"
        >
          <i class="fas fa-trash"></i> Limpar
        </button>
      </div>

      <LoadingSpinner v-if="isLoading" />
    </div>
  </div>
</template>

<script>
import DropZone from './DropZone.vue'
import LoadingSpinner from './LoadingSpinner.vue'

export default {
  name: 'FileUpload',
  components: {
    DropZone,
    LoadingSpinner
  },
  props: {
    selectedFile: {
      type: File,
      default: null
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:selectedFile', 'analyze', 'checkErrors', 'clear'],
  methods: {
    handleFileSelect(file) {
      this.$emit('update:selectedFile', file)
    }
  }
}
</script>

<style scoped>
.main-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
  overflow: hidden;
  margin-bottom: 30px;
}

.card-header {
  background: linear-gradient(135deg, #4CAF50, #45a049);
  color: white;
  padding: 25px;
  text-align: center;
}

.card-content {
  padding: 30px;
}

.action-buttons {
  text-align: center;
  margin-top: 25px;
}
</style>