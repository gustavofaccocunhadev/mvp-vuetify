<template>
  <ContainerDefault>
    <h2>Cadastro de categorias</h2>
    <v-form class="mt-4" v-model="valid" @submit.prevent="handleSubmit">
      <v-text-field
        v-model="formCategory.name"
        :rules="[rules.required]"
        label="Nome"
        required
        variant="outlined"
        type="text"
        class="mb-4"
      ></v-text-field>

      <v-select
        v-model="formCategory.status"
        :rules="[rules.required]"
        label="Status"
        :items="status"
        item-title="title"
        item-value="value"
        persistent-hint
        single-line
        variant="outlined"
        class="mb-4"
      ></v-select>

      <div class="d-flex justify-end ga-4">
        <v-btn :to="{ name: 'category' }"> Voltar </v-btn>
        <v-btn :disabled="!valid" color="primary" type="submit">{{
          idCategory ? 'Atualizar' : 'Cadastrar'
        }}</v-btn>
      </div>
    </v-form>
  </ContainerDefault>
</template>

<script setup>
import { useNotification } from '@/composables/useNotification'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'
import { useCategorieService } from '@/services'

const categoryService = useCategorieService()
const route = useRoute()
const router = useRouter()
const notification = useNotification()
const valid = ref(false)
const idCategory = ref('')
const formCategory = ref({
  name: '',
  status: 'Active',
})

const status = [
  { title: 'Ativo', value: 'Active' },
  { title: 'Inativo', value: 'Inactive' },
]

const rules = {
  required: (value) => !!value || 'Campo obrigatório.',
}
function handleSubmit() {
  if (!valid.value) {
    notification.error('Formulario incompleto.')
  }

  idCategory.value ? updateCategory(idCategory.value) : createCategory()
}

async function createCategory() {
  try {
    await categoryService.create(formCategory.value)
    notification.success('Categoria cadastrada com sucesso.')
    router.push({ name: 'category' })
  } catch (error) {
    if (error) {
      notification.error(
        'Não foi possível cadastrar a categoria. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  }
}

async function updateCategory(id) {
  try {
    await categoryService.update(id, formCategory.value)
    notification.success('Categoria atualizada com sucesso.')
    router.push({ name: 'category' })
  } catch (error) {
    if (error) {
      notification.error(
        'Não foi possível atualizar a categoria. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  }
}

async function getCategory(id) {
  try {
    const data = await categoryService.getById(id)
    formCategory.value = {
      name: data.name,
      status: data.status,
    }
  } catch (error) {
    if (error) {
      notification.error(
        'Não foi possível buscar a categoria. Erro:' +
          (error.response?.data?.detail || error.message || error.code || ''),
        9000,
      )
    }
  }
}

onMounted(() => {
  if (route.params.id) {
    idCategory.value = route.params.id
    getCategory(idCategory.value)
  }
})
</script>
