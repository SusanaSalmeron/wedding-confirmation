import { FC, useEffect } from "react";
import styles from "./home.module.css";
import VideoIntro from "../videoIntro/videoIntro";
import { useNavigate, useParams } from "react-router-dom";
import { deleteGuest, getAttendantGroup } from "../../services/attendants";

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
        const groupDeleted = await deleteGuest(id)
        if (groupDeleted) {
            navigate("/thanks")
        }
    }

    useEffect(() => {
        getAttendantGroup(id)
            .then(response => {
                if (response.code === 410) {
                    navigate("/message")
                }
                if (response.code === 404) {
                    navigate("/notFound")
                }
            })
    })

    return (
        <div className={styles.home} data-testid="home">
            <div className={styles.video}>
                <VideoIntro />
            </div>
            <div className={styles.buttons}>
                <button type="button" className={styles.left} onClick={buttonLeftHandler}>Vamos a asistir</button>
                <button type="button" className={styles.right} onClick={buttonRightHandler}>No asistiremos</button>
            </div>
        </div>
    )
}

export default Home;