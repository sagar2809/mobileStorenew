import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';

import styled from 'styled-components';
import {ButtonContainer} from './Button';


class Navbar extends Component {
    render() {
        return (
            <NavWrapper className = "navbar navbar-expand-sm navbar-dark px-sm-5">
                <Link to = "/"><img className = "navbar-brand" src = {logo} alt ="store"/></Link>
                <ul className = "navbar-nav align-items-center">
                    <li className = "nav-item ml-5">
                        <Link to = "/" className ="nav-link">Product</Link>
                    </li>
                </ul>
                <Link to = "/cart" className = "ml-auto">
                    <ButtonContainer>
                        <span className = "mr-2"><i className ="fas fa-cart-plus"></i></span>
                         My Cart
                    </ButtonContainer>
                </Link>

            </NavWrapper>
        );
    }
}

//style.tagname

const NavWrapper = styled.nav `
background : var(--mainBlue);
.nav-link{
    color : var(--mainWhite)!important;
    font-size : 1.3rem;
    text-transform : capitalize !important;
}
`

export default Navbar;
//