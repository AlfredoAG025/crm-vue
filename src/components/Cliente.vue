<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
    cliente: {
        type: Object
    }
})

defineEmits(['actualizar-estado', 'eliminar-cliente'])

const nombreCompleto = computed(() => {
    return props.cliente.apellido + ' ' + props.cliente.nombre
})

const estadoCliente = computed(() => {
    return props.cliente.estado;
})
</script>

<template>
    <tr>
        <td class="py-4 pl-4 pr-3 text-sm whitespace-nowrap sm:pl-0">
            <p class="font-medium text-gray-900">{{ nombreCompleto }}</p>
            <p class="text-gray-500"> {{ cliente.email }}</p>
        </td>
        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap">
            <p class="font-bold text-gray-900">{{ cliente.empresa }}</p>
            <p class="text-gray-600">
                {{ cliente.puesto }}
            </p>
        </td>
        <td class="px-3 py-4 text-sm whitespace-nowrap">
            <button @click="$emit('actualizar-estado', { id: cliente.id, estado: cliente.estado })"
                class="inline-flex px-2 text-xs font-semibold leading-5 rounded-full"
                :class="[estadoCliente ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
                {{ estadoCliente ? 'Activo' : 'Inactivo' }}
            </button>
        </td>
        <td class="px-3 py-4 text-sm text-gray-500 whitespace-nowrap ">
            <RouterLink :to="{ name: 'editar-cliente', params: { id: cliente.id } }"
                class="mr-5 text-indigo-600 hover:text-indigo-900">Editar
            </RouterLink>
            <button @click="$emit('eliminar-cliente', cliente.id)"
                class="text-red-600 hover:text-red-900">Eliminar</button>
        </td>
    </tr>
</template>
