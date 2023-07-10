import { FC } from "react";
import styles from './footer.module.css'
import logo from '../../images/footer.png'
import { Link } from "react-router-dom";



interface FooterProps { }

const Footer: FC<FooterProps> = () => {
    return (
        <div className={styles.footer} data-testid="footer">
            <footer className={styles.logo}>
                <figure>
                    <img src={logo} alt="footer"></img>
                </figure>
                <div className={styles.copyright}>
                    <Link to="https://github.com/SusanaSalmeron?tab=repositories">©2023 by Pochi</Link>
                </div>
            </footer>
        </div>
    )
}


export default Footer;