<!-- eslint-disable vue/no-unused-properties -->
<script lang="ts" setup>
  import { SchemaProperty } from '@/schemas/types/schema'

  defineProps<{
    property: SchemaProperty & { type: 'null' },
    value: null,
  }>()

  const emit = defineEmits<{
    'update:value': [null],
  }>()

  emit('update:value', null)
</script>