import React, { FC, CSSProperties } from "react";
import GridLoader from "react-spinners/GridLoader";


interface SpinnerProps { }

const override: CSSProperties = {
    margin: "0",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
};

const Spinner: FC<SpinnerProps> = (props: SpinnerProps) => {
    return (
        <div data-testid="spinner">
            <GridLoader
                cssOverride={override}
                color={"darkslategray"}
                aria-label="Loading Spinner"
                data-testid="loader"
                size={80}

            />
        </div>
    )
};

export default Spinner;