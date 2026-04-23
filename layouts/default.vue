<template>
  <v-app class="gradient-bg">
    <div class="year-corner">2026</div>
    <v-app-bar app color="transparent" flat elevation="0" class="glass">
      <v-container class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon icon="mdi-hospital-box" size="32" color="primary" class="mr-3" />
          <v-toolbar-title class="text-h5 font-weight-bold">
            Med<span class="text-primary">Skills</span>
          </v-toolbar-title>
        </div>
        <div class="d-flex gap-3">
          <v-btn to="/" variant="text" prepend-icon="mdi-home">Главная</v-btn>
          <v-btn to="/profile" variant="text" prepend-icon="mdi-account-circle">Профиль</v-btn>
          <v-btn variant="text" icon="mdi-bell-outline" />
        </div>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container fluid class="pa-6" style="max-width: 1400px; margin: 0 auto;">
        <slot />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.gap-3 {
  gap: 12px;
}
.glass {
  background: rgba(232, 224, 213, 0.7);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #1A1A1A;
}
.year-corner {
  position: fixed;
  bottom: 20px;
  right: 30px;
  font-family: 'Oswald', sans-serif;
  font-size: 5rem;
  font-weight: 900;
  color: rgba(0,0,0,0.08);
  pointer-events: none;
  z-index: 10;
  user-select: none;
  letter-spacing: 8px;
}
</style>