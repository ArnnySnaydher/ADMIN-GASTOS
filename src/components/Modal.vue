<script setup>
import { computed, ref } from 'vue';
import Alerta from './Alerta.vue';
import cerrarModal from '../assets/img/cerrar.svg'

const error = ref('');

const emit = defineEmits(['ocultar-modal', 
'update:nombre', 'update:cantidad', 'update:categoria', 'guardar-gasto','delete-gasto']);
const props = defineProps({
    modal: {
        type: Object,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    cantidad: {
        type: [String, Number],
        required: true
    },
    categoria: {
        type: String,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    id: {
        type: [String, null],
        required: true
    },
})

const old = props.cantidad

const agregarGasto = () => {
    //Validar que no haya campo
    const { cantidad, categoria, nombre, monto ,id} = props
    if ([nombre, cantidad, categoria].includes('')) {
        error.value = 'Todos los campos son obligatorios.'

        setTimeout(() => {
            error.value = ''
        }, 3000);
        return
    }
    //validad cantidad

    if (cantidad <= 0 || cantidad === '') {
        error.value = 'Cantidad no valida '
        setTimeout(() => {
            error.value = ''
        }, 3000);
        return
    }
    //Validar paera que el usuario nos gaste masd e los disponible
    if (id) {
        //Gasto ya realizado
        if(cantidad > old + monto){
            error.value = 'Cantidad excede lo disponible '
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }
    } else {
        //Validar lo disponible 
        if (cantidad > monto) {
            error.value = 'Cantidad excede lo disponible '
            setTimeout(() => {
                error.value = ''
            }, 3000);
            return
        }
    }

  

    emit('guardar-gasto')
}

const isEditar = computed(()=>{
        return props.id;
    })

</script>
<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img :src="cerrarModal" alt="" @click="$emit('ocultar-modal')">
        </div>

        <div class="contenedor contenedor-formulario" :class="[modal.animar ? 'animar' : 'cerrar']">
            <form class="nuevo-gasto" @submit.prevent="agregarGasto">
                <legend>{{isEditar ? 'Editar Gasto' : 'Añadir Gasto'}}</legend>
                <Alerta v-if="error">{{ error }}</Alerta>
                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                    <input type="text" id="nombre" placeholder="Añade el nombre del Gasto" :value="nombre"
                        @input="$emit('update:nombre', $event.target.value)">
                </div>

                <!-- Sin .prevent se cierra el valor de consola y me regresa al incio -->
                <div class="campo">
                    <label for="nombre">Cantidad:</label>
                    <input type="number" id="nombre" placeholder="Añade la cantidad del Gasto" v.if="" :value="cantidad"
                        @input="$emit('update:cantidad', +$event.target.value)" min=0>
                </div>

                <div class="campo">
                    <label for="categoria">Categoria:</label>
                    <select name="" id="categoria" :value="categoria"
                        @input="$emit('update:categoria', $event.target.value)">
                        <option value="">-- Seleccione --</option>
                        <option value="ahorro"> Ahorro </option>
                        <option value="comida">Comida</option>
                        <option value="casa">Casa</option>
                        <option value="gastos">Gastos Varios</option>
                        <option value="ocio">Ocio</option>
                        <option value="salud">Salud</option>
                        <option value="suscripciones">Suscripciones</option>
                    </select>
                </div>

                <input type="submit" 
                :value="[isEditar ? 'Guardar Cambios': 'Añadir Gastos']">
            </form>
            <button class="contenedor__button" v-if="isEditar" @click="$emit('delete-gasto',id)" >Eliminar gasto</button>
        </div>
    </div>
</template>



<style scoped>
.modal {
    position: absolute;
    background-color: rgb(0 0 0 / 0.9);
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

}

.cerrar-modal {
    position: absolute;
    right: 3rem;
    top: 3rem;
}


.cerrar-modal img {
    width: 3rem;
    cursor: pointer;
}

.contenedor-formulario {
    transition-property: all;
    transition-duration: 300ms;
    transition-timing-function: ease-in;
    opacity: 0;
}

.contenedor-formulario.animar {
    opacity: 1;
}

.contenedor-formulario.cerrar {
    opacity: 0;
}


.nuevo-gasto {
    margin: 10rem auto 0 auto;
    display: grid;
    gap: 2rem;
}

.nuevo-gasto legend {
    text-align: center;
    font-size: 3rem;
    color: var(--blanco);
    font-weight: 700;
    text-transform: uppercase;
}

.campo {
    display: grid;
    gap: 2rem;
}

.nuevo-gasto input,
.contenedor__button,
.nuevo-gasto select {
    background-color: var(--gris-claro);
    border-radius: 1rem;
    padding: 1rem;
    border: none;
    font-size: 2rem;

}

.nuevo-gasto label {
    color: var(--blanco);
    font-size: 2rem;
    text-transform: uppercase;
}

.nuevo-gasto input[type="submit"] {
    background-color: var(--azul);
    color: var(--blanco);
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;

}

.contenedor__button{
    width: 100%;
    margin-top: 1rem;
    background-color: crimson;
    color: var(--blanco);
    font-weight: 700;
    cursor: pointer;
    text-transform: uppercase;
}
</style>