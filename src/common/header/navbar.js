import { useContext, useState } from "react";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Button,
  Image,
} from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { BsMoonStarsFill as DarkMode } from "react-icons/bs";
import { MdWbSunny as LightMode } from "react-icons/md";
import Style from "./css/Header.module.css";
import { SessionContext } from "../../imports";
import { ThemeContext } from "../../common/context/ThemeProvider";
import { LanguajeContext } from "../context/LanguajeProvider";
import { en_US } from "../../languaje/en_US";
import { es_EC } from "../../languaje/es_EC";
import { DefaultUserPicture } from "../../utils/GlobalStaticElements";
export default function Header() {
  const { sessionUser, LogOut } = useContext(SessionContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const { languaje, setLanguaje } = useContext(LanguajeContext);

  const location = useLocation().pathname;

  const handleTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }
    setTheme("dark");
  };
  const handleLanguaje = () => {
    if (languaje.NAME === en_US.NAME) {
      setLanguaje(es_EC);
    } else {
      setLanguaje(en_US);
    }
  };

  return (
    <Navbar
      bg={theme ? theme : "light"}
      variant={theme ? theme : "light"}
      expand="lg"
    >
      <Container>
        <Navbar.Brand>
          <Nav.Link as={Link} to="/" style={{ fontWeight: "bolder" }}>
            <Image
              style={{ height: "30px", margin: "-10px 5px -5px 0px" }}
              src={require("../../assets/images/logo.png")}
            />
            <span style={{ color: "#FF4B2B" }}> Hospital </span> Básico
            <span
              style={{
                position: "absolute",
                top: 40,
                textAlign: "right",
                marginLeft: -80,
                fontSize: 10,
              }}
            >
              de la Zona El Oro
            </span>
          </Nav.Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" active={location === "/"}>
              {languaje?.NAVBAR?.HOME}
            </Nav.Link>
            <Nav.Link as={Link} to="/doctors" active={location === "/doctors"}>
              {languaje?.NAVBAR?.DOCTORS}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/specializations"
              active={location === "/specializations"}
            >
              {languaje?.NAVBAR?.SPECIALIZATION}
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/patients"
              active={location === "/patients"}
            >
              {languaje?.NAVBAR?.PATIENTS}
            </Nav.Link>
          </Nav>
          <Nav>
            {!sessionUser ? (
              <Nav>
                <Nav.Link as={Link} to="/login" active={location === "/login"}>
                  {languaje?.NAVBAR?.LOGIN}
                </Nav.Link>
                <Nav.Link
                  as={Link}
                  to="/register"
                  active={location === "/register"}
                >
                  {languaje?.NAVBAR?.REGISTER}
                </Nav.Link>
              </Nav>
            ) : (
              <Nav>
                <label htmlFor="basic-nav-dropdown"></label>
                <NavDropdown
                  title={
                    <Image
                      src={
                        sessionUser?.image
                          ? sessionUser.image
                          : DefaultUserPicture
                      }
                      className={Style.profile_icon}
                    />
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    {sessionUser?.role?.name}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => LogOut()}
                    className="text-danger"
                  >
                    Log out
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            )}
            <Nav.Link active onClick={handleTheme}>
              {theme === "light" ? (
                <DarkMode size={20} />
              ) : (
                <LightMode size={20} />
              )}
            </Nav.Link>
            <NavDropdown
              drop="down-centered"
              title={languaje?.NAME}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => setLanguaje(en_US)}>
                {en_US.NAME + "  (English)"}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => setLanguaje(es_EC)}>
                {es_EC.NAME + "  (Español)"}
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
