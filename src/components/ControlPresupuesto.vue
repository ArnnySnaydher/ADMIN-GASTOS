<script setup>
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css";
import { formatearCantidad } from '../helpers'

const emits = defineEmits(['reset-app'])

const props = defineProps({
    monto: {
        type: Number,
        required: true
    },
    disponible: {
        type: Number,
        required: true
    },
    gastado: {
        type: Number,
        required: true
    }

})


</script>

<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">

            <CircleProgress 
            :percent="50"
            :size="250"
            :border-width="30"
            :border-bg-width="30"
            fill-color="#3B82F6"
            empty-color="#E1E1E1"
            ></CircleProgress>

        </div>
        <div class="contenedor-presupuesto">
            <button class="reset-app" type="button" @click="$emit('reset-app')">
                Resetear App
            </button>
            <p>
                <span>Presupuesto: {{ formatearCantidad(monto) }}</span>
            </p>
            <p>
                <span>disponible: {{ formatearCantidad(disponible) }}</span>
            </p>
            <p>
                <span>Gastado:{{ formatearCantidad(gastado) }}</span>
            </p>
        </div>

    </div>
</template>


<style scoped>
.dos-columnas {
    display: flex;
    flex-direction: column;
}

.dos-columnas>:first-child {
    margin-bottom: 3rem;
}

.contenedor-presupuesto {
    width: 100%;
}

.contenedor-presupuesto p {
    font-size: 2.4rem;
    text-align: center;
    color: var(--gris-oscuro);
}

.contenedor-presupuesto span {
    font-weight: 900;
    color: var(--azul);
}

.reset-app {
    background-color: #db2777;
    border: none;
    padding: 1rem;
    width: 100%;
    color: var(--blanco);
    font-weight: 900;
    text-transform: uppercase;
    border-radius: 1rem;
    transition-property: background-color;
    transition-duration: 300ms;
}

.reset-app:hover {
    cursor: pointer;
    background-color: #c11d67;
}

@media (min-width: 768px) {
    .dos-columnas {
        flex-direction: row;
        gap: 4rem;
        align-items: center;
    }

    .dos-columnas>:first-child {
        margin-bottom: 0;
    }

    .contenedor-presupuesto {
        font-size: 2.4rem;
        text-align: left;
    }
}
</style>