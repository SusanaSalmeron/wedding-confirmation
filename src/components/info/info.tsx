import { FC } from "react"
import Address from "../address/address"
import { dataMaps } from "../../utils"
import styles from "./info.module.css"

interface InfoProps { }

export const Info: FC<InfoProps> = () => {
    return (
        <>
            <div className={styles.warning}>
                <h4>AVISO</h4>
                <h4>Una vez tengamos confirmación de asistencia y si habéis solicitado habitación, se os comunicará el hotel que se os haya asignado</h4>
            </div>
            <div className={styles.info}>
                {
                    dataMaps.map((map: any, i: any) => {
                        return <div key={i}>
                            <Address description={map.description} link={map.link} address={map.address} map={map.map} title={map.title} />
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default Info