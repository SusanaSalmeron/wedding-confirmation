import { FC } from "react";
import styles from './footer.module.css'
import logo from '../../images/footer.png'



interface FooterProps { }

const Footer: FC<FooterProps> = () => {
    return (
        <div className={styles.footer} data-testid="footer">
            <footer className={styles.logo}>
                <figure>
                    <img src={logo} alt="footer"></img>
                </figure>

            </footer>
        </div>
    )
}


export default Footer;