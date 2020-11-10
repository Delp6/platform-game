import React from "react";
import DesktopAccessDisabledIcon from '@material-ui/icons/DesktopAccessDisabled';


export const ScreenTooSmall = () => {

    return (
        <div style={{color: "white", fontSize: "3rem", textAlign: "center"}}>
            <DesktopAccessDisabledIcon style={{fontSize: "12rem"}}/>
        <p>Sorry, your screen is too tiny.</p>
    </div>
    )
}
