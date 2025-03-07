<template>
  <div class="logo-box">
    <img src="../assets/images/file.png" class="logo">
    <h3 class="title">La meteo des dieux</h3>
  </div>
  <div class="search">
    <input type="text" placeholder="Enter city name" v-model="location">
    <button @click="search" class="search-btn"><img src="../assets/images/search.png" alt=""></button>
  </div>
  <WeatherDataDisplay :weatherData="data" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>

<script setup lang="ts">
import { ref } from 'vue';
import WeatherDataDisplay from './WeatherDataDisplay.vue';

// Rendre location et data réactifs
const location = ref("");
const data = ref({});

// API Key
const apiKey = 'be40102133003953c21cd08b5d73da21';

async function search() {
  if (!location.value) return; // Vérifie si un nom de ville est entré

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=metric&lang=fr`;
  
  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    console.log(result)
    if (response.ok) {
      // Mettre à jour l'objet data réactif
      data.value = {
        temp: result.main.temp,
        tempMax: result.main.temp_max,
        tempMin: result.main.temp_min,
        description: result.weather[0].description,
        logo: result.weather[0].main.toLowerCase(),
        city: result.name,
        humidity: `${result.main.humidity} %`,
        windSpeed: `${result.wind.speed} km/h`
      };
    } else {
      console.error("Erreur API:", result.message);
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
}
</script>
