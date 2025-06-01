<template>
  <div 
    class="upload-area" 
    :class="{ dragover: isDragOver }"
    @click="triggerFileInput"
    @dragover.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
    @drop.prevent="handleFileDrop"
  >
    <div class="upload-icon">
      <i class="fas fa-cloud-upload-alt"></i>
    </div>
    <div class="upload-text">
      {{ selectedFile ? selectedFile.name : 'Clique aqui ou arraste seu arquivo Excel' }}
    </div>
    <div class="upload-hint">
      Suporta apenas arquivos .xlsx (máx. 10MB)
    </div>
  </div>
  
  <input 
    type="file" 
    ref="fileInput" 
    class="file-input"
    accept=".xlsx"
    @change="handleFileSelect"
  >
</template>

<script>
import { useFileValidation } from '../composables/useFileValidation'
import { ref } from 'vue'

export default {
  name: 'DropZone',
  props: {
    selectedFile: {
      type: [File, null],
      default: null
    }
  },
  emits: ['fileSelected'],
  setup(props, { emit }) {
    const { validateFile } = useFileValidation()
    const isDragOver = ref(false)

    const triggerFileInput = () => {
      document.querySelector('.file-input').click()
    }

    const processFile = (file) => {
      if (!file) return

      const validation = validateFile(file)
      if (!validation.isValid) {
        emit('fileSelected', null)
        alert(validation.message)
        return
      }

      emit('fileSelected', file)
    }

    const handleFileSelect = (event) => {
      const file = event.target.files[0]
      processFile(file)
    }

    const handleFileDrop = (event) => {
      isDragOver.value = false
      const file = event.dataTransfer.files[0]
      processFile(file)
    }

    return {
      isDragOver,
      triggerFileInput,
      handleFileSelect,
      handleFileDrop
    }
  }
}
</script>

<style scoped>
.upload-area {
  border: 3px dashed #ddd;
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;
  cursor: pointer;
  background: #fafafa;
}

.upload-area:hover {
  border-color: #4CAF50;
  background: #f0f8f0;
}

.upload-area.dragover {
  border-color: #4CAF50;
  background: #e8f5e8;
  transform: scale(1.02);
}

.upload-icon {
  font-size: 3rem;
  color: #4CAF50;
  margin-bottom: 20px;
}

.upload-text {
  font-size: 1.2rem;
  margin-bottom: 15px;
  color: #666;
}

.upload-hint {
  color: #999;
  font-size: 0.9rem;
}

.file-input {
  display: none;
}
</style>
