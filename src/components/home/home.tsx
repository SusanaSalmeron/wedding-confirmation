import React, { FC } from 'react';
import styles from './home.module.css';
import VideoIntro from '../videoIntro/videoIntro';
import { useNavigate } from 'react-router-dom';
/* import wedding from '../../media/wedding.mp4' */

interface HomeProps { }

const Home: FC<HomeProps> = () => {
    const navigate = useNavigate()

    const buttonLeftHandler = () => {
        navigate('/form')
    }

    return (
        <div className={styles.home} data-testid="home">
            <VideoIntro />
            <div className={styles.buttons}>
                <button type="submit" className={styles.left} onClick={buttonLeftHandler}>Vamos a asistir</button>
                <button className={styles.right}>No vamos a asistir</button>
            </div>

        </div>
    )
}

export default Home;