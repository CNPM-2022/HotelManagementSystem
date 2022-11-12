
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
function Change_password(prop) {
    return (
        <Modal show={prop.show} onHide={prop.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='fw-bolder'>Change password</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>New password</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your new password"
                            autoFocus
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Confirm password</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Confirm your new password"
                            autoFocus
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={prop.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={prop.handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Change_password