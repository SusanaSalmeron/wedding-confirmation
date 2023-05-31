import { FC } from "react";
import styles from './videoIntro.module.css'
import ReactPlayer from "react-player";



interface VideoIntroProps { }

const VideoIntro: FC<VideoIntroProps> = () => {
    return (
        <div className={styles.video}>
            <ReactPlayer>


            </ReactPlayer>


        </div>
    )
}

export default VideoIntro