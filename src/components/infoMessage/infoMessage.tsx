import { FC } from "react";
import styles from './infoMessage.module.css'
import { Link } from "react-router-dom";


interface InfoMessageProps {
    message: string,
    image: string,
    alt: string,
    link: string
}

const InfoMessage: FC<InfoMessageProps> = (props: InfoMessageProps) => {
    return (
        <div className={styles.message}>
            <figure className={styles.img}>
                <div className={styles.link}>
                    {props.link ? <Link to={props.link} >Aqui tienes unos enlaces de interés sobre el evento, puedes consultarlos volviendo a la web cuando quieras</Link> : null}
                </div>
                <img src={props.image ? props.image : "https://media.giphy.com/media/l2JJKs3I69qfaQleE/giphy.gif"} alt={props.alt ? props.alt : "jedi"} />
                <figcaption>{props.message ? props.message : "Este grupo ya ha indicado su elección."}</figcaption>
            </figure>

        </div>
    )
}

export default InfoMessage