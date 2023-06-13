import * as yup from 'yup'

export default function ValidationFormForModalForm() {
    let formSchema = yup.object().shape({
        guestName: yup.string()
            .required("Por favor, introduce tu nombre")
            .min(3, 'Debe contener al menos 3 caracteres')
            .max(40, 'Debe contener máx.  40 caracteres'),
        menuType: yup.string()
            .required("Por favor, elige un menu"),
        allergies: yup.array(),
    })
    return formSchema
}