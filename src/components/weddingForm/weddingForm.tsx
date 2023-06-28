import { FC, useEffect, useState } from "react";
import styles from './weddingForm.module.css'
import { Field, Form, Formik } from "formik";
import AddressModal from "../addressModal/addressModal";
import photo from '../../images/form.jpg'
import FoodModal from "../foodModal/foodModal";
import { getAttendantGroup, updateGuest } from "../../services/attendants";
import { useNavigate, useParams } from "react-router-dom";
import { useMedia } from "../../hooks/useMedia";

interface WeddingFormProps { }

interface InitialValues {
    menus: [],
    room: boolean,
    brunch: boolean,
    songlist: string
    comment: string,
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

interface GroupParams {
    id: string
}

const initialValues: InitialValues = {
    menus: [],
    room: false,
    brunch: false,
    songlist: "",
    comment: ""
}

const WeddingForm: FC<WeddingFormProps> = () => {
    const isMobile = useMedia('(max-width: 1039px)')
    const [guestsMenus, setGuestsMenus] = useState<any>([])
    const [group, setGroup] = useState<any>({})
    const totalGuests: number = group.size
    const { id } = useParams<keyof GroupParams>() as GroupParams
    const navigate = useNavigate()

    useEffect(() => {
        getAttendantGroup(id)
            .then(response => {
                if (response === 410) {
                    navigate('/notFound')
                } else {
                    setGroup(response)
                }
            })
    }, [id, navigate, guestsMenus])

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

    const submitForm = async (values: InitialValues) => {
        const { room, brunch, songlist, comment } = values
        const isFormSended = await updateGuest(id, guestsMenus, room, brunch, songlist, comment)
        if (isFormSended) {
            navigate('/congrats')
        }
    }

    return (
        <div className={styles.wedding} data-testid="wedding">
            {!isMobile ? <figure className={styles.photo} >
                <img src={photo} alt="wedding"></img>
            </figure> : null}
            <div className={styles.container}>
                <div className={styles.group}>
                    <h3>Hola {group.group}</h3>
                    <h3>Nº Personas: {group.size}</h3>
                </div>
                <Formik
                    initialValues={initialValues}
                    onSubmit={submitForm}>
                    <Form className={styles.form}>
                        {totalGuests === 1 ? <div className={styles.room}>
                            <label>¿Necesitas alojamiento?
                                <Field type="checkbox" name="room" />
                            </label>
                        </div> : <div className={styles.room}>
                            <label>¿Necesitáis alojamiento?
                                <Field type="checkbox" name="room" />
                            </label>
                        </div>}
                        <div className={styles.menuContainer}>
                            {totalGuests === 1 ? <label >* Elije menú</label> : <label >* Elije menú para cada uno de los asistentes </label>}
                            {guestsMenus.length !== totalGuests ? <div className={styles.menu}>
                                <FoodModal callback={addMenu} />
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
                        {
                            totalGuests === 1 ? <><div className={styles.brunch}>
                                <label>
                                    ¿Te quedas al brunch del 8 de octubre?
                                    <Field type="checkbox" name="brunch" />
                                </label>
                            </div>
                                <div className={styles.bso}>
                                    <label>Ayúdanos a construir una banda sonora para la boda con aquellas canciones que sean tus favoritas:</label>
                                    <Field as="textarea" name="songlist" rows="10" placeholder="Ejemplos:
                            Alejandro Sanz: ¿Y Si Fuera ella? / 
                            Star Wars: La Marcha Imperial" />
                                </div>
                            </> : <><div className={styles.brunch}>
                                <label>
                                    ¿Os quedáis al brunch del 8 de octubre?
                                    <Field type="checkbox" name="brunch" />
                                </label>
                            </div>
                                <div className={styles.bso}>
                                    <label>Ayúdadnos a construir una banda sonora para la boda con aquellas canciones que sean vuestras favoritas:</label>
                                    <Field as="textarea" name="songlist" rows="10" placeholder="Ejemplos:
                            Alejandro Sanz: ¿Y Si Fuera ella? / 
                            Star Wars: La Marcha Imperial" />
                                </div>
                            </>
                        }
                        <div className={styles.comment}>
                            <label>Comentarios adicionales:</label>
                            <Field as="textarea" name="comment" rows="10" placeholder="Si se necesita alguna dieta especial por intoleracias o alergias, o cualquier otra observación que no haya sido contemplada en este formulario, aquí puedes reflejarlo para que se tenga en cuenta" />
                        </div>
                        <div className={styles.mandatory}><p>* El campo menú es obligatorio</p></div>
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

