import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import {IconContext} from "react-icons";
import {MdCheckCircle} from "react-icons/md";

function AddedToCartModal(props) {
    
    return (
        <Modal
            size="sm"
            show={props.show}
            onHide={props.onModalExit}
            aria-labelledby="example-modal-sizes-title-sm"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Added to cart!
                    <IconContext.Provider value={{className: "success-icon"}}>
                        <MdCheckCircle/>
                    </IconContext.Provider>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.name} has been added to cart!</Modal.Body>
        </Modal>
    );
}

export default AddedToCartModal;