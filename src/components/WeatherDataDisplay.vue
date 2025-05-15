<template>
    <div class="weather" v-if="weatherData.city">
        <img :src="logoRoute" class="weather-icon">
        <h3 class="description">{{ weatherData.description }}</h3>
        <h1 class="temp">{{ weatherData.temp }}</h1>
        <h2 class="city">{{ weatherData.city }}</h2>
        <div class="details">
            <div class="col">
                <img src="../assets/images/humidity.png">
                <div>
                    <p class="humidity">{{ weatherData.humidity }}</p>
                    <p class="undertext">Humidity</p>
                </div>
            </div>
            <div class="col">
                <img src="../assets/images/wind.png">
                <div>
                    <p class="wind">{{ weatherData.windSpeed }}</p>
                    <p class="undertext">wind speed</p>
                </div>
            </div>
        </div>
    </div>
    <div class="weather" v-else-if="weatherData.errorMessage">
        <img :src="logoRoute" class="weather-icon">
        <h3 class="description">Une ville inconnue ?!</h3>
    </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue';

export default defineComponent({
    name: 'WeatherDataDisplay',
    props: {
        weatherData: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const logoRoute = ref("");
        watch(() => props.weatherData, (newVal) => {
            console.log('Mise à jour des données météo :', newVal);
            if (newVal.logo) {
                logoRoute.value = new URL(`../assets/images/${newVal.logo}.png`, import.meta.url).href;
            } else {
                logoRoute.value = new URL(`../assets/images/zeusChock.png`, import.meta.url).href;
            }
        }, { deep: true });

        return { logoRoute };
    }
});
</script>
