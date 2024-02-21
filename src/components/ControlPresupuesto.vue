
<script setup>
    import imagen from  '../assets/img/grafico.jpg'
</script>
<template>
    <div class="dos-columnas">
        <div class="contenedor-grafico">
            <img :src="imagen" alt="" />
        </div>
        <div class="contenedor-presupuesto">
            <button class="reset-app">
                Resetear App
            </button>
            <p>
                <span>Presupuesto:</span>
            </p>
            <p>
                <span>disponible:</span>
            </p>
            <p>
                <span>Gastado:</span>
            </p>
        </div>

    </div>
</template>


<style scoped>

</style>