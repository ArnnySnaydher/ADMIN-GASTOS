<script setup>
import IconoAhorro from '../assets/img/icono_ahorro.svg'
import IconoCasa from '../assets/img/icono_casa.svg'
import IconoComida from '../assets/img/icono_comida.svg'
import IconoGastos from '../assets/img/icono_gastos.svg'
import IconoOcio from '../assets/img/icono_ocio.svg'
import IconoSalud from '../assets/img/icono_salud.svg'
import IconoSuscripciones from '../assets/img/icono_suscripciones.svg'
import { formatearCantidad, formatearFecha } from '../helpers'

const diccionarioIconos = {
        ahorro : IconoAhorro,
        comida : IconoComida,
        casa : IconoCasa,
        gastos : IconoGastos,
        ocio : IconoOcio,
        salud : IconoSalud,
        suscripciones : IconoSuscripciones
    }

const props = defineProps({
    gasto: {
        type: Object,
        required: true
    }
})
</script>
<template>
    <div class="gasto sombra">
        <div class="contenido">
            <img 
            :src="diccionarioIconos[gasto.categoria]" 
            alt="icono gasto"
            class="icono">
            <div class="detalles">
                <p class="categoria">{{ gasto.categoria }}</p>
                <p class="nombre">{{ gasto.nombre }}</p>

                <p class="fecha">{{ formatearFecha(gasto.fecha) }}</p>
            </div>
        </div>

        <p class="cantidad">{{ formatearCantidad(gasto.cantidad) }}</p>
    </div>
</template>

<style scoped></style>