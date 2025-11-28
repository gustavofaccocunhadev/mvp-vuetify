<template>
  <v-card class="mx-auto py-4" max-width="368">
    <v-card-item :title="props.cardTitle"> </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col class="text-h2" cols="6"> {{ props.cardValue }}</v-col>

        <v-col class="text-right" cols="6">
          <v-icon color="primary" :icon="props.cardIcon" size="50"></v-icon>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
  cardTitle: {
    type: String,
    default: '',
  },
  cardValue: {
    type: String,
    default: '',
  },
  cardIcon: {
    type: String,
    default: '',
  },
})
</script>
