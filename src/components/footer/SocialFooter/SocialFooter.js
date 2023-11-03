import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';

export default function SocialFooter() {
    return (
        <>
            <div className="col-md-3">
                <div className="social_container">
                    <h5>
                        DevCamp
                    </h5>
                    <IconButton
                        size="large"
                        edge="start"
                        color="black"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <FacebookIcon></FacebookIcon>
                        <TwitterIcon></TwitterIcon>
                        <InstagramIcon></InstagramIcon>
                        <YouTubeIcon></YouTubeIcon>
                    </IconButton>
                </div>
            </div>
        </>
    );
}