import React from "react";
import PhaserMain from "../phaser/PhaserMain";
import {useTheme} from "@material-ui/core";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {ScreenTooSmall} from "../components/ScreenTooSmall";

const GamePage = () => {

    const minWidth = useMediaQuery('(min-width:960px)');
    const minHeight = useMediaQuery('(min-width:600px)');

    const theme = useTheme();
    return (
        <div style={{
            minHeight: "100%",
            backgroundColor: theme.palette.primary.light,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }}>
            {(minHeight && minWidth) && <PhaserMain/>}
            {(!minHeight || !minWidth) && <ScreenTooSmall/>}
        </div>
    )
}
export default GamePage;
