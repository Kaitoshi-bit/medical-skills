<template>
  <v-card>
    <v-card-title>Общая информация</v-card-title>
    <v-divider />
    <v-card-text>
      <v-list>
        <v-list-item><strong>ФИО:</strong> {{ patient.firstName }} {{ patient.lastName }}</v-list-item>
        <v-list-item><strong>Дата рождения:</strong> {{ patient.birthDate }}</v-list-item>
        <v-list-item><strong>Телефон:</strong> {{ patient.phone }}</v-list-item>
        <v-list-item><strong>Email:</strong> {{ patient.email }}</v-list-item>
        <v-list-item><strong>Диагноз:</strong> {{ patient.diagnosis }}</v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
defineProps({ patient: Object })
</script>