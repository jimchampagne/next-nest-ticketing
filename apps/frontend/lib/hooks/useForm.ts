import { useState } from 'react'
import { ZodError, ZodSchema } from 'zod'

type UseFormResult<T> = {
  formValues: T
  errors: { [key: string]: string }
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void
  handleSubmit: (e: React.FormEvent) => void
}

export function useForm<T>(
  initialValues: T,
  schema: ZodSchema<T>,
  onSubmit: (data: T) => void,
): UseFormResult<T> {
  const [formValues, setFormValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormValues((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const validate = (): boolean => {
    try {
      schema.parse(formValues)
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof ZodError) {
        const validationErrors: { [key: string]: string } = {}
        err.errors.forEach((e) => {
          validationErrors[e.path[0]] = e.message
        })
        setErrors(validationErrors)
      }
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) {
      onSubmit(formValues)
    }
  }

  return {
    formValues,
    errors,
    handleSubmit,
    handleInputChange,
  }
}
