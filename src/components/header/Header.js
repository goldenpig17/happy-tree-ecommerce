import { Component } from "react";
import Logo from "./logo/Logo";
import IconNavBar from "./iconNavBar/IconNavBar";
import { AppBar, Box, Toolbar } from "@mui/material";
import WelcomeImage from "./welcomeImage/welcomeImage";


class Header extends Component {
    render() {
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" style={{ background: "#fef7d0" }}>
                        <Toolbar sx={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            flexDirection: 'row', 
                            '@media (max-width:600px)': { 
                                flexDirection: 'column', 
                                alignItems: 'flex-start', 
                            }
                        }}>
                            <Logo></Logo>
                            <WelcomeImage />
                            <IconNavBar></IconNavBar>
                        </Toolbar>
                    </AppBar>
                </Box>
            </>
        )
    }
}

export default Header;