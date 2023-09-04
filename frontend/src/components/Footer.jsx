import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Navigate, useNavigate } from "react-router-dom";
import ContactUs from "./ContactUs";

const Footer = () => {
  const navigate = useNavigate();
  const footerStyle = {
    backgroundColor: "#333",
    color: "#fff",
    padding: "5px 0",
    textAlign: "center",
    bottom: 0,
  };

  const smallText = {
    fontSize: "14px",
    marginBottom: "8px",
  };

  const socialIconStyle = {
    marginRight: "8px",
    color: "#fff",
  };
  const handleContact = () => {
    navigate("contact");
  };

  return (
    <Box style={footerStyle}>
      <Typography variant="h6" style={smallText}>
        About Us
      </Typography>
      <Typography variant="body2" style={smallText}>
        Welcome to [Crowdfunding Platform Name], your premier destination for
        empowering individuals and organizations to bring their dreams to life.
        We are a dynamic crowdfunding website that connects passionate creators
        with a global community of supporters, providing a platform where
        innovation, creativity, and philanthropy flourish.
      </Typography>
      <Typography
        onClick={handleContact}
        variant="h6"
        style={{ ...smallText, marginTop: "5px" }}
      >
        Contact Us
      </Typography>
      <Typography variant="body2" style={smallText}>
        Email: contact@example.com
        <br />
        Phone: +1234567890
      </Typography>
      <Typography variant="h6" style={{ ...smallText, marginTop: "5px" }}>
        Follow Us
      </Typography>
      <IconButton
        style={socialIconStyle}
        component={Link}
        href="https://www.facebook.com/"
        target="_blank"
      >
        <FacebookIcon />
      </IconButton>
      <IconButton
        style={socialIconStyle}
        component={Link}
        href="https://twitter.com/"
        target="_blank"
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        style={socialIconStyle}
        component={Link}
        href="https://www.instagram.com/"
        target="_blank"
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        style={socialIconStyle}
        component={Link}
        href="https://www.linkedin.com/"
        target="_blank"
      >
        <LinkedInIcon />
      </IconButton>
    </Box>
  );
};

export default Footer;
