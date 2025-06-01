<template>
  <div class="results-section">
    <TabNavigation
      :tabs="availableTabs"
      :activeTab="activeTab"
      @tabChange="activeTab = $event"
    />

    <AnalysisTab
      v-if="analysisResult && activeTab === 'analysis'"
      :analysisResult="analysisResult"
      :isLoading="isLoading"
      @applyCorrections="$emit('applyCorrections')"
    />

    <ErrorsTab
      v-if="formulaErrors.length > 0 && activeTab === 'errors'"
      :formulaErrors="formulaErrors"
    />
  </div>
</template>

<script>
import TabNavigation from './TabNavigation.vue'
import AnalysisTab from './AnalysisTab.vue'
import ErrorsTab from './ErrorsTab.vue'

export default {
  name: 'ResultsSection',
  components: {
    TabNavigation,
    AnalysisTab,
    ErrorsTab
  },
  props: {
    analysisResult: {
      type: Object,
      default: null
    },
    formulaErrors: {
      type: Array,
      default: () => []
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['applyCorrections'],
  data() {
    return {
      activeTab: 'analysis'
    }
  },
  computed: {
    availableTabs() {
      const tabs = []
      
      if (this.analysisResult) {
        tabs.push({
          id: 'analysis',
          label: 'Análise Completa',
          icon: 'fas fa-chart-bar'
        })
      }
      
      if (this.formulaErrors.length > 0) {
        tabs.push({
          id: 'errors',
          label: 'Erros Encontrados',
          icon: 'fas fa-exclamation-triangle'
        })
      }
      
      return tabs
    }
  },
  watch: {
    availableTabs: {
      immediate: true,
      handler(tabs) {
        if (tabs.length > 0 && !tabs.some(tab => tab.id === this.activeTab)) {
          this.activeTab = tabs[0].id
        }
      }
    }
  }
}
</script>

<style scoped>
.results-section {
  margin-top: 30px;
}
</style>
