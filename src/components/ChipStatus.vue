<template>
  <v-chip :color="color"> {{ statusTranslate }} </v-chip>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: {
    type: String,
    required: true,
  },
})

const color = computed(() => {
  if (props.status === 'Active' || props.status === 'active') {
    return 'green'
  } else if (props.status === 'Inactive' || props.status === 'inactive') {
    return 'red'
  } else {
    return ''
  }
})

const statusTranslate = computed(() => {
  if (props.status === 'Active' || props.status === 'active') {
    return 'Ativo'
  } else if (props.status === 'Inactive' || props.status === 'inactive') {
    return 'Inativo'
  } else {
    return props.status
  }
})
</script>
