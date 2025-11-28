<template>
  <v-container class="pa-sm-4 pa-md-0 h-100" fluid height="100dvh">
    <v-row no-gutters class="h-100">
      <v-col class="d-flex align-center justify-center bg-grey-lighten-4" cols="12" md="6">
        <div class="text-center">
          <v-img class="mx-auto mb-4" max-width="300" src="/undraw/login-icon.svg"></v-img>
          <h1 class="text-primary">Bem vindo</h1>
          <p class="text-grey-darken-1">Sua plataforma de gerenciamento de estoque.</p>
          <div class="ma-15 text-left text-grey-darken-1">
            <h3 class="text-h6 mb-2">Sobre este Projeto</h3>
            <p>
              Este aplicativo foi desenvolvido como parte do
              <strong>Curso Vue.js Expert</strong>
              (<a href="https://cursovuejs.com.br/" target="_blank">cursovuejs.com.br</a>).
            </p>
            <p>
              O objetivo é demonstrar na prática o uso de tecnologias como
              <strong>Vue.js</strong>, <strong>Vite</strong>, <strong>Vuetify</strong> e consumo de
              dados por meio de uma <strong>API REST</strong>.
            </p>
            <p class="mb-0">
              Este é um projeto de estudo criado para fins educacionais e para compor meu portfólio.
            </p>
          </div>
        </div>
      </v-col>
      <v-col class="d-flex align-center justify-center" cols="12" md="6">
        <div class="w-100" style="max-width: 400px">
          <v-form v-model="valid" @submit.prevent="handleSubmit">
            <div class="text-center mb-6">
              <h1 class="text-primary">Login</h1>
              <p class="text-grey-darken-1">Preencha seus dados para acessar:</p>
            </div>
            <v-text-field
              v-model="formData.email"
              label="Email"
              :rules="[rules.required, rules.email]"
              variant="outlined"
              type="email"
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
            <v-btn block class="mb-3" color="primary" size="large" type="submit">Entrar</v-btn>
            <div class="text-center mb-3 text-grey-darken-1">ou</div>
            <v-btn
              :to="{ name: 'register' }"
              block
              variant="outlined"
              class="mb-3"
              color="primary"
              size="large"
              >Cadastre-se</v-btn
            >
          </v-form>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useApi } from '@/composables/useApi'
import { useNotification } from '@/composables/useNotification'
import { useRouter } from 'vue-router'

const api = useApi()
const notification = useNotification()
const router = useRouter()
const formData = ref({
  email: '',
  password: '',
})

const passwordIsVisible = ref(false)

function showPassword() {
  passwordIsVisible.value = !passwordIsVisible.value
}
function handleSubmit() {
  if (!valid.value) {
    notification.error('Formulário incompleto ou inválido.')
    return
  }

  loginUser()
}

async function loginUser() {
  try {
    const response = await api.post('/login', {
      ...formData.value,
    })
    if (response?.data?.token) {
      localStorage.setItem('v-token', response.data.token)

      notification.success('Login realizado com sucesso.')
      router.push({ name: 'home' })
    } else {
      notification.error('Token não encontrado.')
    }
  } catch (error) {
    notification.error(
      'Não foi possível realizar o login. Erro:' +
        (error.response?.data?.detail || error.message || error.code || ''),
      9000,
    )
    console.error(error)
  }
}

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
</script>
