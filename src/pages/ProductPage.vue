<template>
  <ContainerDefault>
    <div class="d-flex justify-space-between">
      <h2>Produtos</h2>
      <v-btn color="primary" append-icon="$plus" :to="{ name: 'form-product' }">Novo</v-btn>
    </div>

    <v-data-table :headers="headers" :items="products" :loading="loading">
      <template v-slot:item.status="{ item }">
        <ChipStatus :status="item.status"></ChipStatus>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="d-flex justify-end" style="gap: 8px">
          <v-btn size="small" color="primary" @click="editProduct(item.id)">Editar</v-btn>
          <v-btn size="small" color="error" @click="deleteProduct(item.id)">Deletar</v-btn>
        </div>
      </template>
    </v-data-table>
  </ContainerDefault>
</template>
<script setup>
import { useNotification } from '@/composables/useNotification'
import { useProductService } from '@/services'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const productServices = useProductService()
const notification = useNotification()
const loading = ref(false)

const headers = [
  { title: 'Nome', value: 'name' },
  { title: 'Status', value: 'status' },
  { title: 'Preço', value: 'price' },
  { title: 'Ações', value: 'actions', align: 'end' },
]

const products = ref([])

async function getProducts() {
  try {
    loading.value = true
    products.value = await productServices.getAll()
  } catch (error) {
    if (error.response) {
      notification.error(
        'Não foi possível buscar os produtos. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  } finally {
    loading.value = false
  }
}

function editProduct(id) {
  router.push({ name: 'form-product', params: { id: id } })
}

async function deleteProduct(id) {
  try {
    await productServices.remove(id)
    notification.success('Produto deletado com sucesso.')
    await getProducts()
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
  getProducts()
})
</script>
