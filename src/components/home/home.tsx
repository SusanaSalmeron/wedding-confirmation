import React, { FC } from 'react';
import styles from './home.module.css';

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    return (
        <div className={styles.home} data-testid="home">
            <div className={styles.video}>

            </div>
        </div>
    )
}

export default Home;