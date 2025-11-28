<template>
  <v-select
    v-model="model"
    :rules="props.rules"
    label="Categorias"
    :items="categories"
    item-title="name"
    item-value="id"
    persistent-hint
    variant="outlined"
    class="mb-4"
  ></v-select>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { useCategorieService } from '@/services'

const notification = useNotification()
const categoryService = useCategorieService()
const props = defineProps({
  rules: {
    type: Array,
    default: () => [],
  },
})
const loading = ref(false)
const model = defineModel({ required: true })
const categories = ref([])

async function getCategories() {
  loading.value = true
  try {
    categories.value = await categoryService.getAll()
  } catch (error) {
    if (error.response) {
      notification.error(
        'Não foi possível buscar as categorias. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getCategories()
})
</script>
