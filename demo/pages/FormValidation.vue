<template>
  <p-form class="form-validation" @submit="submit">
    <template #heading>
      Form Validation Example
    </template>

    <p-label label="Name" :message="errors.name" :state="nameState">
      <p-text-input v-model="name" :state="nameState" />
    </p-label>

    <p-label label="Email" :message="errors.emailAddress" :state="emailAddressState">
      <p-text-input v-model="emailAddress" :state="emailAddressState" />
    </p-label>

    <p-label label="Birthday" :message="errors.dateOfBirth" :state="dateOfBirthState">
      <p-date-input v-model="dateOfBirth" :state="dateOfBirthState" />
    </p-label>

    <p-label label="Username (async)" :message="errors.username" :state="usernameState">
      <p-text-input v-model="username" :state="usernameState" />
    </p-label>

    <p-label label="Favorite Tags" :message="errors.tags" :state="tagsState">
      <p-tags-input v-model:tags="tags" :state="tagsState" />
    </p-label>

    <p-label label="I agree to the terms and conditions." :message="errors.agreeToTerms" :state="agreeToTermsState">
      <p-checkbox v-model="agreeToTerms" />
    </p-label>

    <code class="form-validation__json" :class="classes">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <pre v-html="JSON.stringify({ name, dateOfBirth, emailAddress, username, tags, agreeToTerms }, null, 2)" />
    </code>

    <template #footer>
      <p-button inset @click="handleReset">
        Reset
      </p-button>
      <p-button type="submit" :loading="isSubmitting">
        Submit
      </p-button>
    </template>
  </p-form>
</template>

<script lang="ts" setup>
  import { addYears, format } from 'date-fns'
  import { useForm, useField } from 'vee-validate'
  import { computed } from 'vue'
  import { isEmail, isRequired, withMessage, lessThan } from '@/services/validate'

  const { handleSubmit, handleReset, isSubmitting, meta, errors, submitCount } = useForm()

  const submit = handleSubmit(values => console.log(values))

  async function validateEmail(value: string): Promise<boolean> {
    return await mockServerUsernameCheck(value)
  }

  function mockServerUsernameCheck(value: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value === 'stackoverfloweth')
      }, 2000)
    })
  }

  const minDate = addYears(new Date(), -18)
  const rules = {
    name: [withMessage(isRequired, 'Name is Required')],
    dateOfBirth: [
      withMessage(isRequired, 'Birthday is Required'),
      withMessage(lessThan(minDate), `Must be at least 18 years old (${format(minDate, 'MM/dd/yyyy')})`),
    ],
    emailAddress: [
      withMessage(isRequired, 'Email Address is required'),
      withMessage(isEmail, 'Email Address is invalid'),
    ],
    username: [
      withMessage(isRequired, 'Username is Required'),
      withMessage(validateEmail, 'Username is already taken (try stackoverfloweth)'),
    ],
    tags: [withMessage(isRequired, 'At least 1 tag is required')],
    agreeToTerms: [withMessage(isRequired, 'Compliance is required')],
  }

  const { value:name, meta:nameState } = useField<string>('name', rules.name)
  const { value:dateOfBirth, meta:dateOfBirthState } = useField<Date>('dateOfBirth', rules.dateOfBirth)
  const { value:emailAddress, meta:emailAddressState } = useField<string>('emailAddress', rules.emailAddress)
  const { value:username, meta:usernameState } = useField<string>('username', rules.username)
  const { value:tags, meta:tagsState } = useField<string[]>('tags', rules.tags, { initialValue: [] })
  const { value:agreeToTerms, meta:agreeToTermsState } = useField<boolean>('agreeToTerms', rules.agreeToTerms)

  const classes = computed(() => ({
    'form-validation__json--failed': !meta.value.valid && submitCount.value > 0,
    'form-validation__json--passed': meta.value.valid && submitCount.value > 0,
  }))
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

.form-validation__json--failed { @apply
  bg-red-200
  border-red-400
  text-red-800
}

.form-validation__json--passed { @apply
  bg-green-200
  border-green-400
  text-green-800
}
</style>