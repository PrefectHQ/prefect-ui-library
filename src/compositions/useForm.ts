import { scrollToValidationError } from '@prefecthq/prefect-design'
import { useForm as useVeeForm } from 'vee-validate'

export const useForm: typeof useVeeForm = (options) => {
  const { handleSubmit, ...rest } = useVeeForm(options)

  const submit: typeof handleSubmit = (onSuccess, onError) => {
    const onSuccessWrapped: typeof onSuccess = (values, context) => {
      return onSuccess(values, context)
    }

    const onErrorWrapped: typeof onError = (context) => {
      if (onError) {
        onError(context)
      }

      scrollToValidationError()
    }

    return handleSubmit(onSuccessWrapped, onErrorWrapped)
  }

  return {
    ...rest,
    handleSubmit: submit,
  }
}