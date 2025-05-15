<template>
  <div class="logo-box">
    <img src="../assets/images/file.png" class="logo" />
    <h3 class="title">La météo des dieux</h3>
  </div>

  <div class="search relative">
    <input
      type="text"
      placeholder="Entrez le nom d'une ville"
      v-model="location"
      @input="fetchSuggestions"
      @keydown.enter="search"
      @focus="showSuggestions = true"
      @blur="hideSuggestions"
    />
    <button @click="search" class="search-btn">
      <img src="../assets/images/search.png" alt="" />
    </button>

    <ul v-if="showSuggestions && suggestions.length" class="suggestions">
      <li
        v-for="(city, index) in suggestions"
        :key="index"
        @mousedown.prevent="selectSuggestion(city)"
      >
        {{ city.name }}<span v-if="city.state">, {{ city.state }}</span>, {{ city.country }}
      </li>
    </ul>
  </div>

  <WeatherDataDisplay :weatherData="data" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WeatherDataDisplay from './WeatherDataDisplay.vue';

const location = ref("");
const data = ref({});
const suggestions = ref([]);
const showSuggestions = ref(false);

const apiKey = import.meta.env.VITE_API_KEY;

async function fetchSuggestions() {
  if (location.value.length < 2) {
    suggestions.value = [];
    return;
  }

  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location.value}&limit=5&appid=${apiKey}`;
  try {
    const response = await fetch(url);
    const result = await response.json();
    suggestions.value = result;
  } catch (error) {
    console.error("Erreur de suggestion :", error);
  }
}

function selectSuggestion(city: any) {
  location.value = `${city.name}, ${city.country}`;
  suggestions.value = [];
  showSuggestions.value = false;
  search();
}

function hideSuggestions() {
  setTimeout(() => {
    showSuggestions.value = false;
  }, 150);
}

async function search() {
  if (!location.value) return;

  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=metric&lang=fr`;

  try {
    const response = await fetch(apiUrl);
    const result = await response.json();
    if (response.ok) {
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
      data.value = {errorMessage: result.message};
    }
  } catch (error) {
    console.error("Erreur réseau :", error);
  }
}
</script>

<style scoped>
.search {
  position: relative;
  max-width: 400px;
  margin: auto;
}

.suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ccc;
  z-index: 100;
  max-height: 150px;
  overflow-y: auto;
  padding: 0;
  margin: 0;
  list-style: none;
}

.suggestions li {
  padding: 8px;
  cursor: pointer;
}

.suggestions li:hover {
  background-color: #f0f0f0;
}
</style>
