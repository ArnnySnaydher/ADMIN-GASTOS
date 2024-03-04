<script setup>
import CircleProgress from 'vue3-circle-progress'
import "vue3-circle-progress/dist/circle-progress.css";
import { formatearCantidad } from '../helpers'
import {computed}  from 'vue';

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

const porcentaje = computed(()=>{
    return parseInt(((props.monto - props.disponible)/props.monto) * 100);
})

// console.log('porcentaje',porcentaje.value)

</script>

<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">

            <p class="porcentaje">{{porcentaje}}%</p>
            <CircleProgress 
            :percent="porcentaje"
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
.contenedor-grafico{
    position: relative;
}
.porcentaje{
    position: absolute;
    margin: auto;
    top: calc(50% - 1.5rem);
    left: 0;
    right: 0;
    text-align: center;
    z-index: 1;
    font-size: 3rem;
    font-weight: 900;
    color: var(--gris-oscuro);
}
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