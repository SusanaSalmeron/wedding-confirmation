import { FC } from "react";
import styles from "./address.module.css"
import { Link } from "react-router-dom";


interface AddressProps {
    description: string,
    link: string,
    address: string,
    map: string,
    title: string

}

const Address: FC<AddressProps> = (props: AddressProps) => {
    return (
        <div className={styles.container}>
            <div className={styles.maps}>
                <div >
                    <h2>{props.description}</h2>
                    <Link to={props.link}>{props.address}</Link>
                    <iframe
                        src={props.map}
                        loading="lazy"
                        title={props.title}
                    />
                </div>
            </div>
        </div>
    )
}

export default Address