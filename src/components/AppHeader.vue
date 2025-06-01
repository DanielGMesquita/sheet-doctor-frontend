<template>
  <div class="header">
    <h1>
      <i class="fas fa-calculator"></i> 
      Excel AI Formula Corrector
    </h1>
    <p>Correção inteligente de fórmulas Excel usando Machine Learning</p>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.header {
  text-align: center;
  margin-bottom: 40px;
  color: white;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.header p {
  font-size: 1.2rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
}
</style>