<script setup>
import Presupuesto from './components/Presupuesto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue';
import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Modal from './components/Modal.vue'
import { ref,reactive } from 'vue';


const monto = ref(0)
const disponible = ref(0)
const modal =reactive({
  mostrar:false,
  animar:false
})

const definirMonto = (cantidad) => {
  monto.value = cantidad
  disponible.value=cantidad
}

const mostrarModal = ()=>{
  modal.mostrar=true;
  modal.animar=true
}

const ocultarModal = ()=>{
  modal.mostrar=false;
  modal.animar=false
}
</script>

<template>
  <div>
    <header>
      <h1>Hello World</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto v-if="monto === 0" @definir-monto="definirMonto"></Presupuesto>
        <ControlPresupuesto v-else :monto="monto" :disponible="disponible"></ControlPresupuesto>
      </div>

    </header>
    <main v-if="monto>0">
      <div class="crear-gasto">
        <img :src="iconoNuevoGasto" alt="icono nuevo gasto" @click="mostrarModal">
      </div>

      <Modal v-if="modal.mostrar && modal.animar" @ocultar-modal="ocultarModal"></Modal>
    </main>
  </div>
</template>

<style>
:root {
  --azul: #3b82f6;
  --blanco: #fff;
  --gris-claro: #f5f5f5;
  --gris: #94a3b8;
  --gris-oscuro: #64748b;
  --negro: #000;
}

html {
  font-size: 62.5%;
  box-sizing: border-box;
}

*,
*:before,
*::after {
  box-sizing: inherit
}

body {
  font-size: 1.6rem;
  font-family: "Lato", sans-serif;
  background-color: var(--gris-claro);

}

h1 {
  font-size: 4rem;

}

h2 {
  font-size: 3rem;
}

header {
  background-color: var(--azul);
}

header h1 {
  padding: 3rem 0;
  margin: 0;
  color: var(--blanco);
  text-align: center;
}

.contenedor {
  width: 90%;
  max-width: 80rem;
  margin: 0 auto;
}

.contenedor-header {
  margin-top: -5rem;
  transform: translateY(5rem);
  padding: 5rem;
}

.sombra {
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.1);
  background-color: var(--blanco);
  border-radius: 1.2rem;
  padding: 5rem;
}
.crear-gasto{
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}
.crear-gasto img{
  width: 5rem;
  cursor: pointer;
}

</style>
