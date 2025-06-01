<template>
  <div class="tabs">
    <button 
      v-for="tab in tabs"
      :key="tab.id"
      class="tab" 
      :class="{ active: activeTab === tab.id }"
      @click="$emit('tabChange', tab.id)"
    >
      <i :class="tab.icon"></i> {{ tab.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'TabNavigation',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    activeTab: {
      type: String,
      required: true
    }
  },
  emits: ['tabChange']
}
</script>

<style scoped>
.tabs {
  display: flex;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 5px;
  margin-bottom: 20px;
}

.tab {
  flex: 1;
  padding: 12px;
  text-align: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  background: transparent;
  border: none;
  font-size: 1rem;
}

.tab.active {
  background: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  color: #4CAF50;
  font-weight: bold;
}
</style>