import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./helpers/AppContext";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import Main from "./Main";
import "semantic-ui-css/semantic.min.css";
import "./assets/fonts/fonts.css";
import "./index.less";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <AppProvider>
            <MantineProvider>
                <Main />
            </MantineProvider>
        </AppProvider>
    </React.StrictMode>
);
