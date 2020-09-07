import React from 'react';
import '../styles/app.scss';
import {BrowserRouter as Router} from "react-router-dom";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Footer from "./Footer";
import GamePage from "../Pages/GamePage";

function App() {

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#263238",
                light: "#4f5b62",
                dark: "#000a12",
                contrastText: "#ffffff",
            },
            secondary: {
                main: "#cfd8dc",
                light: "#ffffff",
                dark: '#9ea7aa',
                contrastText: '#000',
            },
            text: {
                primary: "#ffffff"
            }

        }
    });

    return (
        <ThemeProvider theme={theme}>
            <Router style={{minHeight: "100vh"}}>
                <GamePage style={{minHeight: "100%"}}/>
                <Footer/>
            </Router>
        </ThemeProvider>
    );
}

export default App;
