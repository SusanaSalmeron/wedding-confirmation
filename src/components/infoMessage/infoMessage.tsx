import { FC } from "react";
import styles from './infoMessage.module.css'


interface InfoMessageProps {
    message: string
}

const InfoMessage: FC<InfoMessageProps> = (props: InfoMessageProps) => {
    return (
        <div className={styles.message}>
            <figure className={styles.img}>
                <img src="https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif" alt="jedi" />
                <figcaption>{props.message ? props.message : "Gracias por contestar. Esta no es la boda que estás buscando."}</figcaption>
            </figure>
        </div>
    )
}

export default InfoMessage