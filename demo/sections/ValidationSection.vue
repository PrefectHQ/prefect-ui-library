<template>
  <DemoSection heading="Form Validation">
    <p-form class="form-validation" @submit="submit">
      <template #heading>
        Example
      </template>

      <p-label label="Name" :message="errors.name" :state="nameState">
        <p-text-input v-model="name" :state="nameState" />
      </p-label>

      <p-label label="Favorite JSON" :message="errors.json" :state="jsonState">
        <JsonInput v-model="json" class="form-validation__json-input" show-prettify :state="jsonState" />
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
        <p-tags-input v-model="tags" :state="tagsState" />
      </p-label>

      <p-label label="I agree to the terms and conditions." :message="errors.agreeToTerms" :state="agreeToTermsState">
        <p-checkbox v-model="agreeToTerms" />
      </p-label>

      <code class="form-validation__json" :class="classes">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <pre v-html="JSON.stringify({ name, json, dateOfBirth, emailAddress, username, tags, agreeToTerms }, null, 2)" />
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
  </DemoSection>
</template>

<script lang="ts" setup>
  import { useField } from 'vee-validate'
  import { computed } from 'vue'
  import DemoSection from '../components/DemoSection.vue'
  import JsonInput from '@/components/JsonInput.vue'
  import { useForm } from '@/compositions/useForm'
  import { dateFnsTz } from '@/utilities/dates'
  import { isEmptyString } from '@/utilities/strings'
  import { fieldRules, isBefore, isEmail, isJson, isRequired, ValidationMethodFactory } from '@/utilities/validation'
  import { isNullish } from '@/utilities/variables'

  const { handleSubmit, handleReset, isSubmitting, meta, errors, submitCount } = useForm()

  const submit = handleSubmit(values => console.log(values))

  const validateEmail: ValidationMethodFactory = property => async value => {
    if (isNullish(value) || isEmptyString(value)) {
      return true
    }

    if (typeof value === 'string' && await mockServerUsernameCheck(value)) {
      return true
    }

    return `${property} is not a valid email address`
  }

  function mockServerUsernameCheck(value: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(value === 'stackoverfloweth')
      }, 2000)
    })
  }

  const minDate = dateFnsTz.addYears(new Date(), -18)
  const rules = {
    name: fieldRules('Name', isRequired),
    json: fieldRules('Favorite JSON', isRequired, isJson),
    dateOfBirth: fieldRules('Birthday', isRequired, isBefore(minDate)),
    emailAddress: fieldRules('Email Address', isRequired, isEmail),
    username: fieldRules('Username', isRequired, validateEmail),
    tags: fieldRules('Tags', [isRequired, 'At least 1 tag is required']),
    agreeToTerms: fieldRules('Compliance', isRequired),
  }

  const { value: name, meta: nameState } = useField<string>('name', rules.name)
  const { value: json, meta: jsonState } = useField<string>('json', rules.json, { initialValue: '' })
  const { value: dateOfBirth, meta: dateOfBirthState } = useField<Date>('dateOfBirth', rules.dateOfBirth)
  const { value: emailAddress, meta: emailAddressState } = useField<string>('emailAddress', rules.emailAddress)
  const { value: username, meta: usernameState } = useField<string>('username', rules.username)
  const { value: tags, meta: tagsState } = useField<string[]>('tags', rules.tags, { initialValue: [] })
  const { value: agreeToTerms, meta: agreeToTermsState } = useField<boolean>('agreeToTerms', rules.agreeToTerms)

  const classes = computed(() => ({
    'form-validation__json--failed': !meta.value.valid && submitCount.value > 0,
    'form-validation__json--passed': meta.value.valid && submitCount.value > 0,
  }))
</script>

<style>
.form-validation { @apply
  p-4
}

.form-validation__json-input {
  @apply
  resize-y
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