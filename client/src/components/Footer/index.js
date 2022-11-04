/** @format */

import { footerData } from "../../data/static-data";

import "../../css/Footer/index.css";
import { Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";

const Footer = () => {
  // const currentYear = new Date().getFullYear();

  const pathname = useLocation().pathname;

  return (
    <footer style={{ display: `${pathname === "/" ? "none" : ""}` }}>
      <div className="content">
        <Typography variant="h5">{footerData.text}</Typography>
        <ul>
          <li>
            <a
              href="https://www.instagram.com/islam_safwatt"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/islam.safwattt/"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/islam_safwatt"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/islam-safwat-020b3a157/"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedInIcon />
            </a>
          </li>
        </ul>
        <ul>
          {footerData.pages.map((item, index) => (
            <li key={index}>
              <Link to={item}>
                <Typography variant="body1">{item}</Typography>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="developer">
        <Typography variant="body1">
          Developed by
          <a
            href="https://www.instagram.com/sahlabdelrahman"
            target="_blank"
            rel="noreferrer"
          >
            {" "}
            Sahl Abdelrahman
          </a>
        </Typography>
      </div>
    </footer>
  );
};

export default Footer;
