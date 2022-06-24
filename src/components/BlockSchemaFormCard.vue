<template>
  <p-card class="block-schema-form-card">
    <template v-if="blockSchema">
      <BlockSchemaForm
        v-model:data="dataModel"
        v-model:name="nameModel"
        :block-schema="blockSchema"
        class="block-schema-form-card__form"
        v-on="{ submit, cancel }"
      />
    </template>

    <BlockTypeCard :block-type="blockSchema.blockType" class="block-schema-form-card__type" />
  </p-card>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import BlockSchemaForm from './BlockSchemaForm.vue'
  import BlockTypeCard from './BlockTypeCard.vue'
  import { BlockSchema, BlockDocumentData } from '@/models'

  const props = defineProps<{
    blockSchema: BlockSchema,
    data: BlockDocumentData,
    name: string,
  }>()

  const emit = defineEmits<{
    (event: 'update:data', value: BlockDocumentData): void,
    (event: 'update:name', value: string): void,
    (event: 'submit' | 'cancel'): void,
  }>()

  const nameModel = computed({
    get(): string {
      return props.name
    },
    set(value: string): void {
      emit('update:name', value)
    },
  })

  const dataModel = computed({
    get(): BlockDocumentData {
      return props.data
    },
    set(value: BlockDocumentData): void {
      emit('update:data', value)
    },
  })

  function submit(): void {
    emit('submit')
  }

  function cancel(): void {
    emit('cancel')
  }
</script>

<style>
.block-schema-form-card {
  grid-template-areas: "type"
                       "form";
}

@screen md {
  .block-schema-form-card {
    grid-template-areas: "form type";
  }
}

.block-schema-form-card { @apply
  grid
  gap-4
  md:grid-cols-[minmax(0,1fr)_250px]
}

.block-schema-form-card__form {
  grid-area: form;
}

.block-schema-form-card__type {
  align-self: start;
  grid-area: type;
}
</style>