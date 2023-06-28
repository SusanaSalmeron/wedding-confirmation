import { FC } from "react";
import styles from './infoMessage.module.css'


interface InfoMessageProps {
    message: string,
    image: string,
    alt: string
}

const InfoMessage: FC<InfoMessageProps> = (props: InfoMessageProps) => {
    return (
        <div className={styles.message}>
            <figure className={styles.img}>
                <img src={props.image ? props.image : "https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif"} alt={props.alt ? props.alt : "jedi"} />
                <figcaption>{props.message ? props.message : "Este grupo ya ha indicado su elección."}</figcaption>
            </figure>
        </div>
    )
}

export default InfoMessage