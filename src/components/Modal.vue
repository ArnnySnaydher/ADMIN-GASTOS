<script setup>
import cerrarModal from '../assets/img/cerrar.svg'

defineEmits(['ocultar-modal'])
</script>
<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img :src="cerrarModal" alt="" @click="$emit('ocultar-modal')">
        </div>

        <div class="contenedor">
            <form action="">
                <legend>Añadir Gasto</legend>
                <div class="campo">
                    <label for="nombre">Nombre Gasto:</label>
                    <input type="text"
                        id="nombre"
                        placeholder="Añade el nombre del Gasto"
                    >
                </div>

                <div class="campo">
                    <label for="nombre">Cantidad:</label>
                    <input type="text"
                        id="nombre"
                        placeholder="Añade la cantridad del Gasto"
                    >
                </div>

                <div class="campo">
                    <label for="categoria">Categoria:</label>
                    <select name="" id="categoria">
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

                <input type="submit" value="Añadir Gasto">
            </form>
        </div>
    </div>
</template>



<style scoped>
    .modal{
        position: absolute;
        background-color: rgb(0 0 0 / 0.9);
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .cerrar-modal{
        position: absolute;
        right: 3rem;
        top: 3rem;
    }

    .cerrar-modal img{
        width: 3rem;
        cursor: pointer;
    }
</style>