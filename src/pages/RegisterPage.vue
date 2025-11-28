<template>
  <v-container class="pa-sm-4 pa-md-0 h-100" fluid height="100dvh">
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
        <div class="text-center">
          <v-img class="mx-auto mb-4" max-width="300" src="/undraw/register-icon.svg"></v-img>
          <h1 class="text-primary">Bem vindo</h1>
          <p class="text-grey-darken-1">Sua plataforma de gerenciamento de estoque.</p>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px">
          <v-form v-model="valid" @submit.prevent="handleSubmit">
            <div class="text-center mb-6">
              <h1 class="text-primary">Faça seu cadastro</h1>
              <p class="text-grey-darken-1">Fácil, rápido e seguro.</p>
            </div>
            <v-text-field
              v-model="formData.name"
              :rules="[rules.required]"
              label="Nome"
              required
              variant="outlined"
              type="text"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              v-model="formData.email"
              :rules="[rules.required, rules.email]"
              label="Email"
              required
              variant="outlined"
              type="email"
              class="mb-4"
            ></v-text-field>
            <v-text-field
              :append-inner-icon="passwordIsVisible ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append-inner="showPassword"
              v-model="formData.password"
              :rules="[rules.required, rules.maxLength, rules.minLength, rules.password]"
              label="Senha"
              required
              variant="outlined"
              :type="passwordIsVisible ? 'text' : 'password'"
              class="mb-4"
            ></v-text-field>
            <v-btn :disabled="!valid" block class="mb-3" color="primary" size="large" type="submit"
              >Cadastrar</v-btn
            >
            <div class="text-center mb-3 text-grey-darken-1">ou</div>
            <v-btn
              :to="{ name: 'login' }"
              block
              variant="outlined"
              class="mb-3"
              color="primary"
              size="large"
              >Voltar</v-btn
            >
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { useApi } from '@/composables/useApi'
import { useRouter } from 'vue-router'
import { useNotification } from '@/composables/useNotification'

const api = useApi()
const router = useRouter()
const notification = useNotification()

const formData = ref({
  name: '',
  email: '',
  password: '',
})

const valid = ref(false)
const rules = {
  required: (value) => !!value || 'Campo obrigatório.',
  maxLength: (value) => value.length <= 12 || 'Maximo 12 characters',
  minLength: (value) => value.length >= 6 || 'Minimo 6 characters',
  email: (value) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Email inválido.'
  },
  password: (value) => {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/
    return pattern.test(value) || 'A senha deve conter letra maiúscula, minúscula e número.'
  },
}

function handleSubmit() {
  if (!valid.value) {
    notification.error('Formulario incompleto.')
  }
  createUsers()
}

async function createUsers() {
  try {
    await api.post('/user', {
      ...formData.value,
    })
    notification.success('Usuário cadastrado com sucesso.')
    router.push({ name: 'login' })
  } catch (error) {
    notification.error(
      'Não foi possível cadastrar o usuário. Erro:' +
        (error.response?.data?.detail || error.message || error.code || ''),
      9000,
    )
    console.error(error)
  }
}

const passwordIsVisible = ref(false)

function showPassword() {
  passwordIsVisible.value = !passwordIsVisible.value
}
</script>
