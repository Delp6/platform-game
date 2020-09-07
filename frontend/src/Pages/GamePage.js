import React from "react";
import PhaserMain from "../phaser/PhaserMain";
import {useTheme} from "@material-ui/core";


const GamePage = () => {


    const theme = useTheme();
    return (
        <div style={{
            minHeight: "calc(100% - 64px)", backgroundColor: theme.palette.primary.light
        }}>
            <PhaserMain />
            <div style={{
                color: theme.palette.text.primary, maxWidth: "960px", display: "block",
                margin: "auto", paddingTop: "20px"
            }}>
                This is simple platform game created using phaser3 javaScript game engine. The goal of
                this
                project was to learn building games. I create this game using free assets from <a
                href="https://www.kenney.nl/">www.kenney.nl</a> and <a href="https://craftpix.net/">www.craftpix.net</a>.
            </div>
            <div style={{
                color: theme.palette.text.primary, maxWidth: "960px", display: "block",
                margin: "auto", paddingTop: "20px", paddingBottom: "20px"
            }}>
                <p>Working on:</p>
                <p>- adding players ranking</p>
                <p>- more levels </p>
                <p>- more enemies</p>
            </div>
        </div>
    )
}
export default GamePage;