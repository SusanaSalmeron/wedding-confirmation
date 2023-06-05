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

    const buttonRightHandler = () => {
        navigate('/message')
    }

    return (
        <div className={styles.home} data-testid="home">
            <VideoIntro />
            <div className={styles.buttons}>
                <button type="submit" className={styles.left} onClick={buttonLeftHandler}>Vamos a asistir</button>
                <button type="submit" className={styles.right} onClick={buttonRightHandler}>No vamos a asistir</button>
            </div>

        </div>
    )
}

export default Home;