import React from "react";
import Switch from "@material-ui/core/Switch";
import {Route} from "react-router";
import useTheme from "@material-ui/core/styles/useTheme";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";


const Page = () => {
    const theme = useTheme();

    return (
        <div style={{
            minHeight: "100%", backgroundColor: theme.palette.primary.light

        }}>
            <Button>RAZ</Button>

        </div>
    )
}
export default Page;