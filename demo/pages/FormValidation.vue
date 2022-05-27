<template>
  <p-form class="form-validation" @submit="submit">
    <template #heading>
      Form with Vee Validation!
    </template>

    <p-label label="First Name">
      <p-text-input v-model="firstName" />
    </p-label>

    <p-label label="Last Name">
      <p-text-input v-model="lastName" />
    </p-label>

    <p-label label="Birthday">
      <p-date-input v-model="dateOfBirth" />
    </p-label>

    <p-label label="Email">
      <p-text-input v-model="emailAddress" />
    </p-label>

    <p-label label="Username (async)">
      <p-text-input v-model="username" />
    </p-label>

    <p-label label="Credit Card">
      <p-text-input v-model="creditCardNumber" />
    </p-label>

    <p-label label="I agree to the terms and conditions.">
      <p-checkbox v-model="agreeToTerms" />
    </p-label>

    <code class="form-validation__json">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <pre v-html="JSON.stringify({ firstName, lastName, dateOfBirth }, null, 2)" />
    </code>
  </p-form>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'


  const submit = (values: unknown): void => console.log(values)

  const firstName = ref<string>()
  const lastName = ref<string>()
  const dateOfBirth = ref<Date>()
  const emailAddress = ref<string>()
  const username = ref<string>()
  const agreeToTerms = ref<boolean>()
  const creditCardNumber = ref<string>()
</script>

<style>
.form-validation { @apply
  p-4
}

.form-validation__json { @apply
  rounded
  border
  bg-prefect-200
  border-prefect-400
  text-prefect-800
  p-4
}
</style>