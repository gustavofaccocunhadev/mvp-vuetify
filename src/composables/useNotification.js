const show = ref(false)
const message = ref('')
const color = ref('success')
const timeout = ref(5000)

export function useNotification() {
  const success = (msg, duration = 5000) => {
    message.value = msg
    show.value = true
    color.value = 'success'
    timeout.value = duration
  }

  const warning = (msg, duration = 5000) => {
    message.value = msg
    show.value = true
    color.value = 'warning'
    timeout.value = duration
  }

  const error = (msg, duration = 5000) => {
    message.value = msg
    show.value = true
    color.value = 'error'
    timeout.value = duration
  }

  const info = (msg, duration = 5000) => {
    message.value = msg
    show.value = true
    color.value = 'info'
    timeout.value = duration
  }

  return {
    success,
    warning,
    error,
    info,
    show,
    message,
    color,
    timeout,
  }
}
