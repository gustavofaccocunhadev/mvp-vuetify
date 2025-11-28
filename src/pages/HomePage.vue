<template>
  <ContainerDefault>
    <v-row>
      <v-col cols="12" sm="4">
        <CardDashboard
          :card-title="'Categorias'"
          :card-value="totalCategories"
          card-icon="mdi-shape-outline"
        />
      </v-col>
      <v-col cols="12" sm="4">
        <CardDashboard
          card-title="Produtos"
          :card-value="totalProducts"
          card-icon="mdi-package-variant"
        />
      </v-col>
    </v-row>
  </ContainerDefault>
</template>

<script setup>
import { useCategorieService } from '@/services'
import { useProductService } from '@/services'
import { onMounted } from 'vue'

const productServices = useProductService()
const categoryService = useCategorieService()
const totalCategories = ref(0)
const totalProducts = ref(0)
const loading = ref(false)

async function getCategoriesTotal() {
  try {
    loading.value = true
    totalCategories.value = await categoryService.getTotal()
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

async function getProductsTotal() {
  try {
    loading.value = true
    totalProducts.value = await productServices.getTotal()
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
  getCategoriesTotal()
  getProductsTotal()
})
</script>
