<script setup>
import Presupuesto from './components/Presupuesto.vue'
import Gasto from './components/Gasto.vue'
import ControlPresupuesto from './components/ControlPresupuesto.vue';
import Filtros from './components/Filtros.vue';
import iconoNuevoGasto from './assets/img/nuevo-gasto.svg'
import Modal from './components/Modal.vue'
import {generateID}  from "./helpers";
import { ref, reactive ,watch ,computed,onMounted} from 'vue';


const monto = ref(0)
const disponible = ref(0)
const gastado = ref(0)
const filtro = ref('')

const modal = reactive({
  mostrar: false,
  animar: false
})

const gasto=reactive({
  nombre:'',
  cantidad:'',
  categoria:'',
  id:null,
  fecha: Date.now()

})

const gastos=ref([])

watch(gastos,()=>{
  const totalGastado = gastos.value.reduce((total,gasto)=>
    gasto.cantidad+total,0
  )

  gastado.value =totalGastado
  disponible.value = monto.value-totalGastado

  localStorage.setItem('gastos',JSON.stringify(gastos.value))

},{
    deep:true
  })

watch(modal,()=>{
  if(!modal.mostrar){
    
    reiniciarStateGasto()
  }
},{
  deep:true 
})

watch(monto,()=>{
  localStorage.setItem('monto',monto.value)
})

onMounted(()=>{
  const presupuestoStorage= localStorage.getItem('monto')
  if(presupuestoStorage){
    monto.value=Number(presupuestoStorage)
    disponible.value=Number(presupuestoStorage)
  }

  const gastosStorage=localStorage.getItem( 'gastos' )
  if(gastosStorage){
    gastos.value=JSON.parse(gastosStorage)
  }
})

const definirMonto = (cantidad) => {
  monto.value = cantidad
  disponible.value = cantidad
}

const mostrarModal = () => {
  modal.mostrar = true;
  setTimeout(() => {
    modal.animar = true;
  }, 300)


}

const ocultarModal = () => {

  modal.animar = false;
  setTimeout(() => {
    modal.mostrar = false;
  }, 300)


}

const guardarGasto=()=>{
  if(gasto.id){
    //editar
    const {id} = gasto
    const i = gastos.value.findIndex(item => item.id === id);
    gastos.value[i]={...gasto};
  }else{
    //registro nuevo
    gastos.value.push({
    ...gasto,id: generateID()
  })

  }
  
  reiniciarStateGasto()

  ocultarModal()
}

const deleteGasto=(id)=>{
  if(confirm('Desea Eliminar este Gasto')){
    const eliminarGasto = gastos.value.filter((item)=> item.id !== id ) 
    gastos.value = eliminarGasto
     ocultarModal();
  }
  
}
const reiniciarStateGasto=()=>{
  Object.assign(gasto,{
    nombre:'',
    cantidad:0,
    categoria:'',
    id:null,
    fecha: Date.now()
  }
  )
}

const seleccionarGasto=(id)=>{
  const gastoEditar = gastos.value.filter(gasto=>gasto.id === id)[0]
  
  Object.assign(gasto,gastoEditar)
  mostrarModal()
}

const gastosFiltrado = computed(()=>{
  if(filtro.value){
    return gastos.value.filter(gasto => gasto.categoria===filtro.value)
  }
  return gastos.value
})

</script>

<template>
  <div :class="{fijar:modal.mostrar}">
    <header>
      <h1>Hello World</h1>
      <div class="contenedor-header contenedor sombra">
        <Presupuesto v-if="monto === 0" @definir-monto="definirMonto"></Presupuesto>
        <ControlPresupuesto v-else :monto="monto" :disponible="disponible" :gastado="gastado"></ControlPresupuesto>
      </div>

    </header>
    
    <main v-if="monto > 0">
      
      <div class="Listado-gastos contenedor">
        <Filtros v-model:filtro="filtro"></Filtros>
        <h2>{{ gastos.length > 0 ? 'Gastos' : 'No hasy gastos'}}</h2>
        <Gasto v-for="gasto in gastosFiltrado" :key="gasto.id" :gasto="gasto" @seleccionar-gasto="seleccionarGasto">

        </Gasto>
      </div>
      <div class="crear-gasto">
        <img :src="iconoNuevoGasto" alt="icono nuevo gasto" @click="mostrarModal">
      </div>

      <Modal v-if="modal.mostrar && modal.animar" 
      @ocultar-modal="ocultarModal" 
      @guardar-gasto="guardarGasto"
      :modal="modal"
      :monto='monto' 
      :id="gasto.id"
      @delete-gasto="deleteGasto"
      v-model:nombre="gasto.nombre"
      v-model:cantidad="gasto.cantidad"
      v-model:categoria="gasto.categoria"
      >
      </Modal>
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

.fijar{
  overflow: hidden;
  height: 100vh;
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

.crear-gasto {
  position: fixed;
  bottom: 5rem;
  right: 5rem;
}

.crear-gasto img {
  width: 5rem;
  cursor: pointer;
}

.Listado-gastos{
  
  margin-top: 10rem;
}
.Listado-gastos h2{
  font-weight: 900;
  color: var(--gris-oscuro);
}
</style>
