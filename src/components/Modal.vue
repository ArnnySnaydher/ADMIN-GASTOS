<script setup>
import cerrarModal from '../assets/img/cerrar.svg'

defineEmits(['ocultar-modal'])
</script>
<template>
    <div class="modal">
        <div class="cerrar-modal">
            <img :src="cerrarModal" alt="" @click="$emit('ocultar-modal')">
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