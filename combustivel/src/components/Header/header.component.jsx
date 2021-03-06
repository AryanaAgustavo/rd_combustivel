import React from "react";
import { Link, withRouter, } from "react-router-dom";
import './header.styles.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import CartIcon from './cart-icon/cart-icon.component';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import CustomButton from '../../components/custom-button/custom-button.component';
import { connect } from 'react-redux';
import AddressSlider from '../../components/address-card-slide/address-card-slide.component';

import {
    Navbar, Container
} from 'reactstrap'
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { toggleCartOff, toggleCartIn } from "../../redux/cart/cart.actions";
import { setHidden } from "../../redux/address/address.actions";


const handleSignOut = () => {
    // let user = sessionStorage.getItem('user')
    // user ? sessionStorage.clear() : sessionStorage.getItem('user');
    // window.location.reload();
}

const Header = ({ history, hidden, hide_cart, currentUser, addressSelected, setHidden }) => {
    {

        return (

            history.location.pathname === "/user-credentials" ? ("") : (
                history.location.pathname === "/dashboard" ||
                    history.location.pathname === "/dashboard/novo-endereco" ||
                    history.location.pathname === "/carrinho/checkout" ||
                    history.location.pathname === "/carrinho/checkout/success-page" ||
                    history.location.pathname === "/dashboard/edit-usuario" ? (

                        <Navbar className="bg-main navbar">
                            <AddressSlider />

                            <Link to="/" className="logo"></Link>
                            {
                                history.location.pathname === "/dashboard" ? (
                                    <div className="d-flex user-bag">
                                        <Link onClick={() => {
                                            history.push("/logout")
                                        }
                                        }
                                            className="navbar-span align-self-bottom get-exit"
                                            id="usuario-navbar">Sair</Link>
                                    </div>
                                ) : (
                                        <div className="d-flex user-bag">
                                        </div>
                                    )
                            }
                        </Navbar>
                    ) : (
                        <>
                            <AddressSlider />
                            <CartDropdown />
                            <Navbar className="bg-main navbar fixed-header">
                                <div className="hold-logo-andHere">

                                    <Link to="/" className="logo"></Link>

                                    <div className="location-where" onClick={() => currentUser ? setHidden() : ""}>
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="icon-heart" />
                                        <div className="location-where-info">
                                            {
                                                currentUser
                                                    ? (
                                                        addressSelected
                                                            ? (
                                                                <>
                                                                    <p>{addressSelected.street}</p>
                                                                    <p>{addressSelected.state}, {addressSelected.cep}, {addressSelected.city}</p>
                                                                </>
                                                            )
                                                            : (

                                                                <>
                                                                    <p>não encontramos nenhum endereço</p>
                                                                    <p>Cadastre um endereço.</p>
                                                                </>
                                                            )
                                                    )
                                                    : ""
                                    }
                                        </div>
                                    </div>
                                </div>

                                <div className="d-flex user-bag">
                                    <div className="logged navbar-brand d-flex" id="user">
                                        {
                                            currentUser ? (
                                                <>


                                                    <CartIcon />
                                                    <Link to="/dashboard"><FontAwesomeIcon icon={faUserCircle} className="icon-userCircle" /></Link>
                                                    <div className="user-login d-flex flex-column bd-highlight mb-3 Row" id="div-header-separation">
                                                        <Link to="/dashboard" className="navbar-span user-name" id="ola-navbar" >Olá, {currentUser.firstName}</Link>
                                                        <Link to="/dashboard" className="navbar-span align-self-bottom" id="usuario-navbar">Minha conta</Link>
                                                    </div>
                                                    <Link to="/logout"><FontAwesomeIcon icon={faSignOutAlt} className="icon-userCircle" /></Link>
                                                </>
                                            ) : (
                                                    <>
                                                        <CartIcon />
                                                        <Link to="/user-credentials"><FontAwesomeIcon icon={faUserCircle} className="icon-userCircle user-mobile" /></Link>
                                                        <CustomButton
                                                            handleClick={(e) => {
                                                                history.push("/user-credentials")
                                                            }}
                                                            className="login-button">
                                                            entre
                                                        </CustomButton>
                                                        <CustomButton
                                                            handleClick={(e) => {
                                                                history.push("/user-credentials")
                                                            }}
                                                            className="signin-button">

                                                            cadastre-se
                                                        </CustomButton>
                                                    </>
                                                )
                                        }

                                    </div>

                                </div>
                            </Navbar>

                            {}
                            <Navbar className="nav-menu sub-navbar navbar-expand-lg navbar-light fixed-subnav">
                                <Container className="fluid ">
                                    <ul className="navbar-nav d-flex none ">
                                        <li className="ml-4 nav-item mr-4 none">
                                            <Link className="nav-link" onClick={() => {
                                                history.push('/home/categoria/gasolina-aditivada/')
                                                window.location.reload()

                                            }}>Gasolina</Link>
                                        </li>
                                        <li className="ml-4 nav-item mr-4 none">
                                            <Link className="nav-link" onClick={() => {
                                                history.push('/home/categoria/etanol-aditivado/')
                                                window.location.reload()

                                            }}>Etanol </Link>
                                        </li>
                                        <li className="ml-4 nav-item mr-4 none" >
                                            <Link className="nav-link" onClick={() => {
                                                history.push('/home/categoria/Diesel/')
                                                window.location.reload()

                                            }}>Óleo</Link>
                                        </li>
                                        <li className="ml-4 nav-item mr-4 none">
                                            <Link className="nav-link" onClick={() => {
                                                history.push('/home/categoria/gas-natural/')
                                                window.location.reload()
                                            }}>Fluidos para motor</Link>
                                        </li>
                                    </ul>
                                </Container>
                            </Navbar>
                            <div className="safe-space-for-header"></div>

                        </>
                    )

            )
        )
    }
}

const mapStateToProps = ({ user: { currentUser }, cart: { hidden }, address: { addressSelected } }) => ({
    currentUser,
    hidden,
    addressSelected
});

const mapDispatchToProps = dispatch => ({
    bring_cart: () => dispatch(toggleCartIn()),
    hide_cart: () => dispatch(toggleCartOff()),
    setHidden: () => dispatch(setHidden()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
