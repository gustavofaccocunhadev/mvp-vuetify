<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Categorias</h2>
      <v-btn color="primary" append-icon="$plus" :to="{ name: 'form-category' }">Nova</v-btn>
    </div>

    <v-data-table :headers="headers" :items="categories" :loading="loading">
      <template v-slot:item.status="{ item }">
        <ChipStatus :status="item.status"></ChipStatus>
      </template>

      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-end" style="gap: 8px">
          <v-btn size="small" color="primary" @click="editCategory(item.id)">Editar</v-btn>
          <v-btn size="small" color="error" @click="deleteCategory(item.id)">Deletar</v-btn>
        </div>
      </template>
    </v-data-table>
  </ContainerDefault>
</template>
<script setup>
import { useNotification } from '@/composables/useNotification'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ChipStatus from '@/components/ChipStatus.vue'
import { useCategorieService } from '@/services'

const categoryService = useCategorieService()
const router = useRouter()
const notification = useNotification()
const loading = ref(false)

const headers = [
  { title: 'Nome', value: 'name' },
  { title: 'Status', value: 'status' },
  { title: 'Ações', value: 'actions', align: 'end' },
]

const categories = ref([])

async function getCategories() {
  try {
    loading.value = true
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

function editCategory(id) {
  router.push({ name: 'form-category', params: { id: id } })
}

async function deleteCategory(id) {
  try {
    await categoryService.remove(id)
    notification.success('Categoria deletada com sucesso.')
    await getCategories()
  } catch (error) {
    if (error) {
      notification.error(
        'Não foi possível deletar o produto. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  }
}

onMounted(() => {
  getCategories()
})
</script>
