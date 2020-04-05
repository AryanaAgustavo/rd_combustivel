import React from 'react';
import { withRouter, Link } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import CustomButton from '../../components/custom-button/custom-button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons'

import './checkout-success.styles.scss';

const SuccessOrderPage = ({ history }) => {
    return (
        <Container>


            <div className="success-order">
                <div className="success-icon-container">
                    <div className="success-icon">
                        <FontAwesomeIcon icon={faShoppingBag} className="icon-success" />
                        <h5>Compra realizada</h5>
                    </div>
                </div>
                <div className="success-choices">
                <CustomButton
                    onClick={() => history.push("/")}
                >
                    continuar comprando
                </CustomButton>
                <div className="spacer"></div>
                <Link to="/dashboard">
                    ver minha conta
                </Link>
                </div>

            </div>
        </Container>
    )
}

export default withRouter(SuccessOrderPage);
