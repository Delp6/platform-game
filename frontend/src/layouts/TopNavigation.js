import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";


const links = [
    {id: 1, to: "/", name: "Home"},
    {id: 2, to: "/game", name: "Game"},
    {id: 3, to: "/about", name: "About"},
]

const TopNavigation = () => {
    return (
        <AppBar  position="static" color="primary">
            <Toolbar style={{justifyContent: "center"}}>
                {links.map(link =>
                    <Link key={link.id} to={link.to} component={RouterLink} color="textPrimary"
                          underline="none" style={{paddingLeft: "2rem", paddingRight: "2rem"}}>{link.name}</Link>
                )}
            </Toolbar>
        </AppBar>
    )
}
export default TopNavigation;