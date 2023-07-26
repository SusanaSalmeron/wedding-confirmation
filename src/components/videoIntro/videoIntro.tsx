import { FC } from "react";
import styles from "./videoIntro.module.css"
import { useMedia } from "../../hooks/useMedia";



interface VideoIntroProps { }

const VideoIntro: FC<VideoIntroProps> = () => {
    const isMobile = useMedia("(max-width: 650px)")

    return (
        <div className={styles.video}>
            <div className={styles.video}>
                <video data-testid="video" width={!isMobile ? "74%" : "91%"} height={!isMobile ? "74%" : "91%"} controls autoPlay={true} loop muted playsInline src="https://d2ouuei6amuf81.cloudfront.net/assets/video.mp4" />
            </div>
        </div>
    )
}

export default VideoIntro