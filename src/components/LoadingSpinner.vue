<template>
  <div class="loading">
    <div class="spinner"></div>
    <span>{{ message }}</span>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    message: {
      type: String,
      default: 'Carregando...'
    }
  }
}
</script>

<style scoped>
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.spinner {
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4CAF50;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
  margin-right: 15px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>