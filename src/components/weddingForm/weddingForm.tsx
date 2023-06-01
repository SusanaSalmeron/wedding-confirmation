import { FC } from "react";
import styles from './weddingForm.module.css'
import { Field, Form, Formik } from "formik";



interface WeddingFormProps {
}

interface InitialValues {
    room: boolean,
    menu: [{}],
    brunch: boolean,
    comment: string
}

interface Menu {
    name: string,
    image: string
}

const initialValues: InitialValues = {
    room: false,
    menu: [{ value: 0 }],
    brunch: false,
    comment: ""
}

const menus: Menu[] = [
    { name: "Principal", image: "" },
    { name: "Infantil", image: "" },
    { name: "Vegetariano", image: "" }

]

const WeddingForm: FC<WeddingFormProps> = () => {
    return (
        <div className={styles.wedding} data-testid="wedding">
            <div className={styles.container}>
                <div className={styles.group}>
                    <h2>Hola Susana y Rubén</h2>
                    <h2>Nº Personas: 2</h2>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}>
                    <Form className={styles.form}>
                        <div className={styles.room}>
                            <label>¿Necesitáis alojamiento?
                                <Field type="checkbox" name="room" />
                            </label>

                        </div>
                        <div className={styles.menu}>
                            <label >Elije menú para cada uno de los asistentes </label>
                            {menus.map((menu, i) => {
                                return <>
                                    <label >{menu.name}</label>
                                    <Field key={i} id={i} type="number" min={0} max={2} name={"menu" + i}>
                                    </Field>
                                </>
                            })}

                        </div>
                        <div className={styles.brunch}>
                            <label>
                                ¿Os vais a quedar al brunch del 8 de octubre?
                                <Field type="checkbox" name="brunch" />
                            </label>
                        </div>
                        <div className={styles.comment}>
                            <label>Comentarios adicionales:</label>
                            <Field as="textarea" name="comment" rows="10" placeholder="Si se necesita alguna dieta especial por intoleracias o alergias, o cualquier otra observación que no haya sido contemplada en este formulario, aquí puedes reflejarlo para que se tenga en cuenta" />
                        </div>
                        <div className={styles.warning}>
                            <h2>ATENCION</h2>
                            <h3>CONDICIONES: NO ACEPTAMOS REGALOS BAJO NINGUN CONCEPTO</h3>
                            <h5>-AQUELLOS QUE INCUMPLAN LAS CONDICIONES PREVIAMENTE ACEPTADAS SE ARRIESGA A LA PENA DE CATAPULTA DESDE EL CASTILLO-</h5>
                        </div>
                        <div className={styles.terms}>
                            <label>
                                ¿Aceptáis las condiciones?
                                <Field type="checkbox" name="terms" />
                            </label>
                        </div>
                        <div className={styles.button}>
                            <button type="submit">Enviar</button>
                        </div>
                    </Form>
                </Formik>

            </div>
        </div>
    )
}

export default WeddingForm

