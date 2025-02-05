import { useClassroomUpdateMutation } from '@hooks/use-query'
import { useForm } from '@mantine/form'
import { notifyInformation } from '@utilities/functions'

interface FormInterface {
  name: string
  grade: string
  homeroomTeacherId: string
  year: string
}

export function useClassroomUpdateForm() {
  const form = useForm<FormInterface>({
    initialValues: {
      name: '',
      grade: '0',
      homeroomTeacherId: '0',
      year: new Date().getFullYear().toString(),
    },
    validate: {
      name: (value) => (value.length > 0 ? null : 'Invalid name'),
      grade: (value) =>
        Number(value) > 0 && Number(value) < 13 ? null : 'Invalid grade',
      homeroomTeacherId: (value) =>
        value.length > 0 ? null : 'A teacher must be chosen',
      year: (value) => (value.length === 4 ? null : 'Invalid year'),
    },
    validateInputOnBlur: true,
  })

  const {
    mutation: { mutate: updateClassroom },
    state: {
      classroom: { setSelectedClassroomId },
    },
  } = useClassroomUpdateMutation()

  function loadFormValues(values: FormInterface, classroomId?: number) {
    if (classroomId) setSelectedClassroomId(classroomId)
    form.setValues(values)
  }

  const submitForm = form.onSubmit((values) => {
    updateClassroom({
      ...values,
      grade: parseInt(values.grade),
      homeroomTeacherId: parseInt(values.homeroomTeacherId),
      year: parseInt(values.year),
    })
    notifyInformation({
      message: `Submitted new information for this classroom`,
    })
  })

  return {
    form,
    loadFormValues,
    submitForm,
    inputPropsOf: form.getInputProps,
  }
}
