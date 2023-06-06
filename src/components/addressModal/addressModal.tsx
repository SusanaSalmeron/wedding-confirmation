import { FC, useState } from "react";
import ReactModal from 'react-modal';
import styles from './addressModal.module.css'


interface AddressModalProps { }

ReactModal.setAppElement('#root');

const AddressModal: FC<AddressModalProps> = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div>
                <button onClick={toggleModal}>Dirección</button>
                <ReactModal
                    isOpen={isOpen}
                    onRequestClose={toggleModal}
                    contentLabel="Address"
                    className={styles.address}
                >
                    <div className={styles.close}>
                        <h2>¿Dónde se va a celebrar la boda?</h2>

                        <button onClick={toggleModal}>X</button>
                    </div>
                </ReactModal >
            </div >
        </>
    )
}

export default AddressModal