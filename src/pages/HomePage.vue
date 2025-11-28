<template>
  <ContainerDefault>
    <v-row dense class="d-flex justify-start">
      <v-col cols="12" sm="3" class="mr-4">
        <CardDashboard
          :card-title="'Categorias'"
          :card-value="totalCategories"
          card-icon="mdi-shape-outline"
        />
      </v-col>
      <v-col cols="12" sm="3" class="mr-4">
        <CardDashboard
          card-title="Produtos"
          :card-value="totalProducts"
          card-icon="mdi-package-variant"
        />
      </v-col>
    </v-row>
    <div class="mt-15 text-grey-darken-1">
      <h3 class="text-h6 mb-2">Sobre este Projeto</h3>
      <p>
        Este aplicativo foi desenvolvido como parte do
        <strong>Curso Vue.js Expert</strong>
        (<a href="https://cursovuejs.com.br/" target="_blank">cursovuejs.com.br</a>).
      </p>
      <p>
        O objetivo é demonstrar na prática o uso de tecnologias como
        <strong>Vue.js</strong>, <strong>Vite</strong>, <strong>Vuetify</strong> e consumo de dados
        por meio de uma <strong>API REST</strong>.
      </p>
      <p class="mb-0">
        Este é um projeto de estudo criado para fins educacionais e para compor meu portfólio.
      </p>
    </div>
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
