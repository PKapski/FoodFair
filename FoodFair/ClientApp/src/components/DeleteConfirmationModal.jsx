import React from 'react';
import {Button, Modal} from "react-bootstrap";

function DeleteConfirmationModal(props) {

    return (
        <Modal
            show={props.show}
            onHide={props.onModalExit}
            aria-labelledby="example-modal-sizes-title-sm"
            centered>
            <Modal.Header closeButton>
                <Modal.Title>Delete confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure You want to delete the product?</Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onDelete}>
                    Delete
                </Button>
                <Button variant="secondary" onClick={props.onModalExit}>
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DeleteConfirmationModal;