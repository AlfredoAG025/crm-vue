<script setup>
import { onMounted, reactive } from 'vue'

import ClienteService from '../services/ClienteService'

import { FormKit } from '@formkit/vue'
import { useRouter, useRoute } from 'vue-router'
import RouterLink from '../components/ui/RouterLink.vue'
import Heading from '../components/ui/Heading.vue'

const router = useRouter()
const route = useRoute()

const { id } = route.params

const formData = reactive({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    empresa: '',
    puesto: '',
    estado: 0,
})

defineProps({
    titulo: {
        type: String,
    }
})

onMounted(() => {
    ClienteService.obtenerCliente(id)
        .then(({ data }) => Object.assign(formData, data))
        .catch(error => console.log(error))
});

const handleSubmit = (data) => {
    ClienteService.actualizarCliente(id, {
        ...data,
        estado: formData.estado
    })
        .then(() => router.push({ name: 'inicio' }))
        .catch((error) => console.log(error))
}

</script>

<template>
    <div>
        <div class="flex justify-end">
            <RouterLink to="inicio">
                Volver
            </RouterLink>
        </div>
        <Heading class="mt-5">{{ titulo }}</Heading>

        <div class="mx-auto mt-10 bg-white shadow">
            <div class="mx-auto md:w-2/3 py-20 px-6">
                <FormKit @submit="handleSubmit" type="form" submit-label="Guardar Cambio"
                    incomplete-message="No se pudo enviar, revisa los mensajes." :value="formData">

                    <FormKit type="text" label="Nombre" name="nombre" placeholder="Nombre de Cliente"
                        validation="required" :validation-messages="{
                            required: 'El Nombre del Cliente es Obligatorio.'
                        }" v-model="formData.nombre" />

                    <FormKit type="text" label="Apellido" name="apellido" placeholder="Apellido del Cliente"
                        validation="required" :validation-messages="{
                            required: 'El Apellido del Cliente es Obligatorio.'
                        }" v-model="formData.apellido" />

                    <FormKit type="email" label="Email" name="email" placeholder="Email del Cliente"
                        validation="required|email" :validation-messages="{
                            required: 'El Email del Cliente es Obligatorio.',
                            email: 'Coloca un email válido'
                        }" v-model="formData.email" />

                    <FormKit type="text" label="Teléfono" name="telefono" placeholder="Télefono XXX-XXX-XXXX"
                        validation="*matches:/^[0-9]{3}-[0-9]{3}-[0-9]{4}/" :validation-messages="{
                            matches: 'El Formato no es válido.'
                        }" v-model="formData.telefono" />

                    <FormKit type="text" label="Empresa" name="empresa" placeholder="Empresa del Cliente"
                        v-model="formData.empresa" />

                    <FormKit type="text" label="Puesto" name="puesto" placeholder="Puesto del Cliente"
                        v-model="formData.puesto" />
                </FormKit>
            </div>

        </div>
    </div>
</template>

<style>
.formkit-wrapper {
    max-width: 100%;
}
</style>