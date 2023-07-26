import { FC } from "react";
import styles from "./header.module.css";
import logo from "../../images/header.png"


interface HeaderProps { }

const Header: FC<HeaderProps> = () => {
    return (
        <div className={styles.header} data-testid="header">
            <header className={styles.logo}>
                <figure>
                    <img src={logo} alt="header"></img>
                </figure>
            </header>
        </div>
    )
}

export default Header;