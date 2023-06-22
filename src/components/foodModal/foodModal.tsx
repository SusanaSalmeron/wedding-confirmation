import { FC, useState } from "react";
import ReactModal from 'react-modal';
import styles from './foodModal.module.css'
import { Field, Form, Formik, ErrorMessage } from "formik";
import images from '../../utils';
import ValidationFormForModalForm from "../../formValidations/validateModalForm";


interface FoodModalProps {
    callback: Function
}

interface GuestMenu {
    guestName: string,
    menuType: string,
    allergies: string[]
}

interface Allergies {
    name: string,
    image: string
}

const menuPics: any = {
    Principal: images.basic,
    Infantil: images.children,
    Veggie: images.vegetarian
}

const menuNames: string[] = ["Principal", "Infantil", "Veggie"]

const initialValues: any = {
    guestName: "",
    menuType: "",
    allergies: []
}

const allergies: Allergies[] = [
    { name: "Moluscos", image: images.molluscs },
    { name: "F.secos", image: images.nuts },
    { name: "Sulfitos", image: images.sulphites },
    { name: "Cacahuetes", image: images.peanuts },
    { name: "Marisco", image: images.shellfish },
    { name: "Lactosa", image: images.lactose },
    { name: "Pescado", image: images.fish },
    { name: "Huevo", image: images.egg },
    { name: "Gluten", image: images.gluten },
]

ReactModal.setAppElement('#root');

const FoodModal: FC<FoodModalProps> = ({ callback }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [allergiesState, setAllergiesState] = useState(new Array(allergies.length).fill(false))

    const toggleModal = () => {
        setIsOpen(!isOpen)
        setAllergiesState(new Array(allergies.length).fill(false))
    }

    const menuHandleSubmit = async (values: any, actions: any) => {
        const guestSelection = []
        for (let i = 0; i < allergiesState.length; i++) {
            if (allergiesState[i] === true) {
                guestSelection.push(allergies[i].name)
            }
        }
        let userSelection = {
            guestName: values.guestName,
            menuType: values.menuType,
            allergies: guestSelection
        }
        callback(userSelection)
        setIsOpen(!isOpen)
        actions.resetForm()
        setAllergiesState(new Array(allergies.length).fill(false))
    }

    const handleOnChange = (position: any) => {
        const updatedCheckedState = allergiesState.map((item, index) =>
            index === position ? !item : item
        );
        setAllergiesState(updatedCheckedState)
    }

    return (
        <>
            <div className={styles.container}>
                <button type="button" onClick={toggleModal}>+</button>
                <ReactModal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="Menu"
                    className={styles.menu}
                >
                    <div className={styles.close}>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={menuHandleSubmit}
                            validationSchema={ValidationFormForModalForm}>
                            {({ values, handleBlur, handleChange, isSubmitting, isValid, dirty }) => (
                                <Form className={styles.form}>
                                    <div className={styles.guest}>
                                        <label>* Nombre:
                                        </label>
                                        < Field
                                            name="guestName"
                                            placeholder="Ejemplo: Luke Skywalker"
                                        />
                                        <ErrorMessage
                                            className={styles.error}
                                            name='guestName'
                                            component="small"
                                        />
                                    </div>

                                    <h4 className={styles.title}>* Elije un menú:</h4>
                                    <div className={styles.foodContainer}>
                                        {menuNames.map((name, i) => (
                                            <div key={i} className={styles.item}>
                                                <input
                                                    type="radio"
                                                    id={name}
                                                    name="menuType"
                                                    value={name}
                                                    checked={values.menuType ? values.menuType === name : false}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className={styles.selection}
                                                >
                                                </input>
                                                <label htmlFor={name}>
                                                    <img src={menuPics[name]} alt={name} />
                                                    {name}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                    <ErrorMessage
                                        className={styles.error2}
                                        name='menuType'
                                        component="small"
                                    />
                                    <h4 className={styles.title}>Marca tus intolerancias o alergias:</h4>
                                    <div className={styles.allergies}>
                                        {allergies.map((allergy, i) => {

                                            return <>
                                                <div className={styles.allergyContainer} key={i}>
                                                    <img className={styles.allergy} src={allergy.image} alt={allergy.name} />
                                                    <input
                                                        type="checkbox"
                                                        id={allergy.name}
                                                        name={allergy.name}
                                                        value={allergy.name}
                                                        checked={allergiesState[i]}
                                                        onChange={() => handleOnChange(i)}
                                                    />
                                                    <figcaption>{allergy.name}</figcaption>
                                                </div>
                                            </>
                                        })}
                                    </div>
                                    <div className={styles.mandatory}><p>* Los campos nombre y menú son obligatorios</p></div>
                                    <div className={styles.send}>
                                        <button
                                            disabled={!isValid || !dirty || isSubmitting}
                                        >Añadir</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                        <button
                            type="button"
                            className={styles.button}
                            onClick={toggleModal}
                        >X</button>
                    </div>
                </ReactModal >
            </div >
        </>
    )
}

export default FoodModal