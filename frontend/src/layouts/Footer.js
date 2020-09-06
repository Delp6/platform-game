import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";

const links = [
    {id: 1, to: "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstleyVEVO", name: "secret link", local: false},
]

const Footer = () => {
    return (
        <AppBar position="static">
        <Toolbar style={{justifyContent: "center"}}>
            {links.map(link =>
                <Link key={link.id} href={link.to} color="secondary"
                      underline="none" style={{paddingLeft: "2rem", paddingRight: "2rem"}}>{link.name}</Link>
            )}
        </Toolbar>
        </AppBar>
    )
}
export default Footer;