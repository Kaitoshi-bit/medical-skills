<template>
  <v-card>
    <v-card-title>Медицинские заметки</v-card-title>
    <v-divider />
    <v-card-text>
      <v-timeline density="compact" side="end">
        <v-timeline-item v-for="note in notes" :key="note.id" dot-color="info" size="small">
          <div class="text-h6">{{ note.date }}</div>
          <div>{{ note.text }}</div>
        </v-timeline-item>
      </v-timeline>
      <v-divider class="my-4" />
      <v-textarea v-model="newNote" label="Новая заметка" rows="2" variant="outlined"></v-textarea>
      <v-btn color="primary" @click="addNote">Добавить заметку</v-btn>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({ notes: Array, patientId: Number })
const emit = defineEmits(['addNote'])
const newNote = ref('')
const addNote = () => {
  if (newNote.value.trim()) {
    emit('addNote', { text: newNote.value.trim() })
    newNote.value = ''
  }
}
</script>