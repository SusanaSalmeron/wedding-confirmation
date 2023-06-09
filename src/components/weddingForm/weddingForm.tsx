import { FC, useState } from "react";
import styles from './weddingForm.module.css'
import { Field, Form, Formik } from "formik";
import AddressModal from "../addressModal/addressModal";
import photo from '../../images/form.jpg'
import FoodModal from "../foodModal/foodModal";



interface WeddingFormProps { }

interface InitialValues {
    room: boolean,
    menu: [],
    brunch: boolean,
    comment: string
}

interface MenuView {
    name: string,
    image: string
}

interface GuestMenu {
    guestName: string,
    menuType: string,
    allergies: string[]
}

const initialValues: InitialValues = {
    room: false,
    menu: [],
    brunch: false,
    comment: ""
}

/* const menuViews: MenuView[] = [
    { name: "Principal", image: basic },
    { name: "Infantil", image: children },
    { name: "Veggie", image: vegetarian },

] */


const WeddingForm: FC<WeddingFormProps> = () => {
    const [guestsMenus, setGuestsMenus] = useState<any>([])

    const addMenu = (menu: any) => {
        let selectedMenus = [...guestsMenus]
        selectedMenus.push(menu)
        setGuestsMenus(selectedMenus)
    }

    return (
        <div className={styles.wedding} data-testid="wedding">
            <figure className={styles.photo} >
                <img src={photo} alt="wedding"></img>
            </figure>
            <div className={styles.container}>
                <div className={styles.group}>
                    <h3>Hola Susana,Rubén</h3>
                    <h3>Nº Personas: 2</h3>
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
                        <div className={styles.menuContainer}>
                            <label >Elije menú para cada uno de los asistentes </label>
                            <div className={styles.menu}>
                                <p>Añade menú</p> <FoodModal callback={addMenu} />
                                {JSON.stringify(guestsMenus)}
                            </div>
                        </div>
                        <div className={styles.brunch}>
                            <label>
                                ¿Os vais a quedar al brunch del 8 de octubre?
                                <Field type="checkbox" name="brunch" />
                            </label>
                        </div>
                        <div className={styles.comment}>
                            <label>Comentarios adicionales:</label>
                            <Field as="textarea" name="comment" rows="6" placeholder="Si se necesita alguna dieta especial por intoleracias o alergias, o cualquier otra observación que no haya sido contemplada en este formulario, aquí puedes reflejarlo para que se tenga en cuenta" />
                        </div>
                        <div className={styles.warning}>
                            <h3>ATENCION</h3>
                            <h4>CONDICIONES: NO ACEPTAMOS REGALOS BAJO NINGUN CONCEPTO</h4>
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
                            <AddressModal />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default WeddingForm

