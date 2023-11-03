import { Component } from "react";
import Logo from "./logo/Logo";
import IconNavBar from "./iconNavBar/IconNavBar";
import { AppBar, Box, Toolbar } from "@mui/material";


class Header extends Component {
    render() {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{background: "white"}}>
                        <Toolbar>
                            <Logo></Logo>
                            <IconNavBar></IconNavBar>
                        </Toolbar>
                    </AppBar>
                </Box>
            </>
        )
    }
}

export default Header;