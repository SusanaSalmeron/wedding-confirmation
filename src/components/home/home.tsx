import React, { FC, useEffect } from 'react';
import styles from './home.module.css';
import VideoIntro from '../videoIntro/videoIntro';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteGuest, getAttendantGroup } from '../../services/attendants';
/* import wedding from '../../media/wedding.mp4' */

interface HomeProps { }

interface GroupParams {
    id: string
}

const Home: FC<HomeProps> = () => {
    const navigate = useNavigate()
    const { id } = useParams<keyof GroupParams>() as GroupParams

    const buttonLeftHandler = () => {
        navigate(`/${id}/form`)
    }

    const buttonRightHandler = async () => {
        console.log("hola")
        const groupDeleted = await deleteGuest(id)
        console.log(groupDeleted)
        if (groupDeleted) {
            navigate('/thanks')
        }
    }

    useEffect(() => {
        getAttendantGroup(id)
            .then(response => {
                if (response === 410) {
                    navigate('/message')
                }
                if (response === 404) {
                    navigate('/notFound')
                }
            })
    })

    return (
        <div className={styles.home} data-testid="home">
            <div className={styles.video}>
            </div>
            {/* <VideoIntro /> */}
            <div className={styles.buttons}>
                <button type="button" className={styles.left} onClick={buttonLeftHandler}>Vamos a asistir</button>
                <button type="button" className={styles.right} onClick={buttonRightHandler}>No vamos a asistir</button>
            </div>

        </div>
    )
}

export default Home;