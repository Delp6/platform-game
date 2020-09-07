import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import {useTheme} from "@material-ui/core";

const links = [
    {id: 1, to: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO", name: "secret link", local: false},
]

const Footer = () => {

    const theme = useTheme();

    return (
        <AppBar position="static">
        <Toolbar style={{justifyContent: "center"}}>
            {links.map(link =>
                <Link key={link.id} href={link.to} color="secondary" component={Button}
                      underline="none" style={{paddingLeft: "2rem", paddingRight: "2rem", color: theme.palette.text.primary}}>{link.name}</Link>
            )}
        </Toolbar>
        </AppBar>
    )
}
export default Footer;