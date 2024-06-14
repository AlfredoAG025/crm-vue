<script setup>
import { onMounted, ref, computed } from 'vue'

import ClienteService from '../services/ClienteService'

import RouterLink from '../components/ui/RouterLink.vue'
import Heading from '../components/ui/Heading.vue'
import Cliente from '../components/Cliente.vue'

import { useRouter } from 'vue-router'

const router = useRouter()
const clientes = ref([])

defineProps({
    titulo: {
        type: String,
    }
})

onMounted(() => {
    ClienteService.obtenerClientes()
        .then(({ data }) => clientes.value = data)
        .catch(error => console.log('Hubo un error.'))
})

const existenClientes = computed(() => {
    return clientes.value.length > 0
})

const actualizarEstado = ({ id, estado }) => {
    ClienteService.cambiarEstado(id, { estado: !estado })
        .then(({ data }) => {
            console.log(data)
            const index = clientes.value.findIndex(cliente => cliente.id === id)
            clientes.value[index].estado = !estado
        })
        .catch((error) => console.log(error))
}

const eliminarCliente = (id) => {
    if (confirm('Seguro de eliminar el cliente?')) {
        ClienteService.eliminarCliente(id).then(({ data }) => {
            console.log(data)
            clientes.value = clientes.value.filter(cliente => cliente.id !== id)
        })
            .catch(error => console.log(error))
    }
}

</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="agregar-cliente">
                Agregar Cliente
            </RouterLink>
        </div>
        <Heading class="mt-5">{{ titulo }}</Heading>

        <div v-if="existenClientes" class="flow-root p-5 mx-auto mt-10 bg-white shadow">
            <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <table class="min-w-full divide-y divide-gray-300">
                        <thead>
                            <tr>
                                <th scope="col" class="p-2 text-sm font-extrabold text-left text-gray-600">Nombre</th>
                                <th scope="col" class="p-2 text-sm font-extrabold text-left text-gray-600">Empresa</th>
                                <th scope="col" class="p-2 text-sm font-extrabold text-left text-gray-600">Estado</th>
                                <th scope="col" class="p-2 text-sm font-extrabold text-left text-gray-600">Acciones</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            <Cliente @actualizar-estado="actualizarEstado" @eliminar-cliente="eliminarCliente"
                                v-for="cliente in clientes" :key="cliente.id" :cliente="cliente" />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <p v-else class="mt-10 text-center">No hay clientes</p>
    </div>
</template>