import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { FirebaseContext } from '../../firebase';
import { Logo } from '../ui/StyledComponents';

//MDB REACT
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse, MDBFormInline,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBContainer, MDBIcon, MDBBtn } from "mdbreact";

const Header = () => {

    //URL Actual
    const [ currentPath, setCurrentPath ] = useState('');
    useEffect(() =>{
        setCurrentPath(window.location.pathname);
    });

    const [ collapseID, setCollapseID ] = useState('');

    const toggleCollapse = collapseID => () =>
    setCollapseID(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

    const { user, firebase } = useContext(FirebaseContext);
    return (
      <MDBNavbar color="orange darken-4" dark expand="md">
        <MDBContainer>
          <MDBNavbarBrand>
            <Link href="/">
              <Logo className="white-text">P</Logo>
            </Link>
          </MDBNavbarBrand>
          <MDBNavbarNav left>
            <MDBNavItem>
              <MDBFormInline waves>
                <div className="md-form my-0">
                  <input
                    className="form-control mr-sm-2"
                    type="text"
                    placeholder="Buscar productos"
                    aria-label="Search"
                  />
                </div>
              </MDBFormInline>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarToggler onClick={toggleCollapse("navbarCollapse3")} />
          <MDBCollapse id="navbarCollapse3" isOpen={collapseID} navbar>
            <MDBNavbarNav left className="mx-4">
              <MDBNavItem active={currentPath === "/" ? true : false}>
                <Link href="/">
                  <a className="nav-link">Inicio</a>
                </Link>
              </MDBNavItem>
              <MDBNavItem active={currentPath === "/popular" ? true : false}>
                <Link href="/popular">
                  <a className="nav-link">Populares</a>
                </Link>
              </MDBNavItem>
              {user && (
                <MDBNavItem
                  active={currentPath === "/new-product" ? true : false}
                >
                  <Link href="/new-product">
                    <a className="nav-link">Nuevo Producto</a>
                  </Link>
                </MDBNavItem>
              )}
            </MDBNavbarNav>
            <MDBNavbarNav right>
              {user ? (
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" className="mr-1" />
                      {user.displayName}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default" right>
                      <MDBDropdownItem href="#!">My account</MDBDropdownItem>
                      <MDBDropdownItem
                        href="#!"
                        onClick={() => firebase.logout()}
                      >
                        Log out
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              ) : (
                <>
                  <MDBNavItem>
                    <Link href="/login">
                      <a>
                        <MDBBtn color="white" size="sm">
                          Login
                        </MDBBtn>
                      </a>
                    </Link>
                  </MDBNavItem>
                  <MDBNavItem>
                    <Link href="/new-account">
                      <a>
                        <MDBBtn outline color="white" size="sm">
                          Crear Cuenta
                        </MDBBtn>
                      </a>
                    </Link>
                  </MDBNavItem>
                </>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    );
}
export default Header;