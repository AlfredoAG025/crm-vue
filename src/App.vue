<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-slate-800">
    <div class="max-w-6xl py-10 mx-10 md:mx-auto">
      <h1 class="text-4xl font-extrabold text-white">
        Administrador de Clientes
      </h1>
    </div>
  </header>


  <div class="p-5 m-5 text-xl font-bold text-red-800 bg-red-200 border-2 border-red-800 rounded-md">
    <h2>Esta aplicación es solo para pruebas, por favor no guarde información personal en la API.</h2>
  </div>

  <main class="max-w-6xl mx-10 my-10 md:mx-auto">
    <RouterView />
  </main>
</template>