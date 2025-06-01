// 📁 src/components/AlertMessage.vue
<template>
  <div :class="alertClasses">
    <i :class="iconClass"></i>
    {{ message }}
  </div>
</template>

<script>
export default {
  name: 'AlertMessage',
  props: {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'info',
      validator: value => ['success', 'error', 'info'].includes(value)
    }
  },
  computed: {
    alertClasses() {
      return ['alert', `alert-${this.type}`]
    },
    iconClass() {
      const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
      }
      return icons[this.type] || icons.info
    }
  }
}
</script>

<style scoped>
.alert {
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.alert-success {
  background: #e8f5e8;
  color: #2e7d32;
  border: 1px solid #4CAF50;
}

.alert-error {
  background: #ffebee;
  color: #c62828;
  border: 1px solid #f44336;
}

.alert-info {
  background: #e3f2fd;
  color: #1565c0;
  border: 1px solid #2196F3;
}
</style>