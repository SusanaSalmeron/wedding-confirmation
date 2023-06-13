import { FC, useEffect, useState } from "react";
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
    comment: string,
    songs: []
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
    comment: "",
    songs: []
}

const WeddingForm: FC<WeddingFormProps> = () => {
    const [guestsMenus, setGuestsMenus] = useState<any>([])
    const totalGuests: number = 2

    const addMenu = (menu: any) => {
        let selectedMenus = [...guestsMenus]
        selectedMenus.push(menu)
        setGuestsMenus(selectedMenus)
    }

    const handleDelete = (e: any) => {
        const indexToDelete = e.target.parentNode.id
        let AllSelectedMenus = [...guestsMenus]
        AllSelectedMenus.splice(indexToDelete, 1)
        setGuestsMenus(AllSelectedMenus)
    }

    const submitForm = (values: InitialValues) => {
        console.log({
            room: values.room,
            menu: guestsMenus,
            brunch: values.brunch,
            comment: values.comment,
            songs: values.songs
        }
        )
    }

    useEffect(() => {

    }, [guestsMenus])


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
                    onSubmit={submitForm}>
                    <Form className={styles.form}>
                        <div className={styles.room}>
                            <label>¿Necesitáis alojamiento?
                                <Field type="checkbox" name="room" />
                            </label>
                        </div>
                        <div className={styles.menuContainer}>
                            <label >Elije menú para cada uno de los asistentes </label>
                            {guestsMenus.length !== totalGuests ? <div className={styles.menu}>
                                <p>Añade menú</p> <FoodModal callback={addMenu} />
                            </div> : null}
                            <div className={styles.guestContainer}>
                                {guestsMenus.length ? guestsMenus.map((menu: any, i: any) => (
                                    <>
                                        <div className={styles.guest}>
                                            <div>{menu?.guestName}</div>
                                            <div className={styles.tooltip}>Menú: {menu?.menuType}
                                                <br></br>
                                                Alergias: {menu?.allergies.length ? menu?.allergies.map((m: any, i: any) => (
                                                    <p>{m}</p>
                                                )) : "Ninguna"}</div>
                                        </div>
                                        <div className={styles.delete}>
                                            <button type="button" onClick={handleDelete} id={i}><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                    </>
                                )) : null}
                            </div>
                        </div>
                        <div className={styles.brunch}>
                            <label>
                                ¿Os vais a quedar al brunch del 8 de octubre?
                                <Field type="checkbox" name="brunch" />
                            </label>
                        </div>
                        <div className={styles.bso}>
                            <label>Ayúdadnos a construir una banda sonora para la boda con aquellas canciones que sean vuestras favoritas:</label>
                            <Field as="textarea" name="songs" rows="6" placeholder="Ejemplos:
                            Alejandro Sanz: ¿Y Si Fuera ella? / 
                            Star Wars: La Marcha Imperial" />
                        </div>
                        <div className={styles.comment}>
                            <label>Comentarios adicionales:</label>
                            <Field as="textarea" name="comment" rows="6" placeholder="Si se necesita alguna dieta especial por intoleracias o alergias, o cualquier otra observación que no haya sido contemplada en este formulario, aquí puedes reflejarlo para que se tenga en cuenta" />
                        </div>

                        <div className={styles.button}>
                            <button
                                disabled={guestsMenus.length !== totalGuests}
                                className={guestsMenus.length === totalGuests ? styles.enabled : styles.disabled}
                            >Enviar</button>
                            <AddressModal />
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default WeddingForm

