<template>
  <ContainerDefault>
    <h2>Cadastro de produtos</h2>
    <v-form class="mt-4" v-model="valid" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="formProduct.name"
        :rules="[rules.required]"
        label="Nome"
        required
        variant="outlined"
        type="text"
        class="mb-4"
      ></v-text-field>

      <v-textarea
        v-model="formProduct.description"
        label="Descrição"
        :rules="[rules.required]"
        variant="outlined"
        class="mb-4"
      >
      </v-textarea>

      <v-text-field
        v-model="formProduct.price"
        :rules="[rules.required]"
        label="Preço"
        variant="outlined"
        type="number"
        class="mb-4"
      ></v-text-field>

      <v-select
        v-model="formProduct.status"
        :rules="[rules.required]"
        label="Status"
        :items="status"
        item-title="title"
        item-value="value"
        persistent-hint
        variant="outlined"
        class="mb-4"
      ></v-select>

      <SelectCategory v-model="formProduct.category_id" :rules="[rules.required]"></SelectCategory>

      <div class="d-flex justify-end ga-4">
        <v-btn :to="{ name: 'product' }"> Voltar </v-btn>
        <v-btn :disabled="!valid" color="primary" type="submit">{{
          idProduct ? 'Atualizar' : 'Cadastrar'
        }}</v-btn>
      </div>
    </v-form>
  </ContainerDefault>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { useProductService } from '@/services'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const productServices = useProductService()
const notification = useNotification()
const valid = ref(false)
const idProduct = ref('')
const formProduct = ref({
  name: '',
  description: '',
  price: 0,
  category_id: null,
  status: 'active',
})

const status = [
  { title: 'Ativo', value: 'active' },
  { title: 'Inativo', value: 'inactive' },
]

const rules = {
  required: (value) => !!value || 'Campo obrigatório.',
}
function handleSubmit() {
  if (!valid.value) {
    notification.error('Formulario incompleto.')
  }

  idProduct.value ? updateProduct(idProduct.value) : createProduct()
}

async function createProduct() {
  try {
    await productServices.create(formProduct.value)
    notification.success('Produto cadastrada com sucesso.')
    router.push({ name: 'product' })
  } catch (error) {
    if (error) {
      notification.error(
        'Não foi possível cadastrar o produto. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  }
}

async function updateProduct(id) {
  try {
    await productServices.update(id, formProduct.value)
    notification.success('Produto atualizado com sucesso.')
    router.push({ name: 'product' })
  } catch (error) {
    if (error) {
      notification.error(
        'Não foi possível atualizar o produto. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  }
}

async function getProduct(id) {
  try {
    const data = await productServices.getById(id)
    formProduct.value = {
      name: data.name,
      description: data.description,
      price: data.price,
      category_id: data.category_id,
      status: data.status,
    }
  } catch (error) {
    if (error) {
      notification.error(
        'Não foi possível buscar o produto. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  }
}

onMounted(() => {
  if (route.params.id) {
    idProduct.value = route.params.id
    getProduct(idProduct.value)
  }
})
</script>
