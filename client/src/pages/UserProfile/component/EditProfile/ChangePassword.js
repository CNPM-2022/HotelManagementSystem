import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { putChangePassword } from '../../../../services/apiServices';

function Change_password(prop) {
    const handleFocus = (e) => {
        console.log(e.target.parentNode);
        //e.target.parentNode.classList.add('hhhh')
    };

    const handleError = (e) => {
        document.getElementsByClassName(e.target.id)[0].classList.remove('errorMsg');
    };

    /* const handleChangePassword = async (id, newPassword) => {
        try {
            const res = await putChangePassword(id, newPassword);

            const data = res.data;
            console.log(data)

            if (res.status !== 200) {
                throw new Error(res.message || 'Something went wrong');
            }

            if (data.success) {
                toast.success(data.message)
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    } */

    const formik = useFormik({
        initialValues: {
            password: '',
            newPassword: '',
            comfirmedNewPassword: '',
        },

        validationSchema: Yup.object({
            newPassword: Yup.string()
                .required('Please fill in the password field')
                .matches(
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
                    'Password must be 7-19 characters and contain at least one letter, one number and a special character',
                ),
            comfirmedNewPassword: Yup.string()
                .required('Please comfirm your password')
                .oneOf([Yup.ref('newPassword'), null], 'Password must match'),
        }),

        onSubmit: async (newPassword) => {
            const userID = JSON.parse(window.localStorage.getItem('user')).user.id;
            try {
                const res = await putChangePassword(userID, {
                    password: newPassword.password,
                    newPassword: newPassword.newPassword,
                });
                const data = res.data;
                console.log(data);

                if (res.status !== 200) {
                    throw new Error(res.message || 'Something went wrong');
                }

                if (data.success) {
                    toast.success(data.message);
                    prop.handleClose();
                } else {
                    toast.error(data.message);
                }
            } catch (err) {
                toast.error(err.message);
            }
        },
    });

    return (
        <Modal show={prop.show} onHide={prop.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="fw-bolder">Thay đổi mật khẩu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={formik.handleSubmit} id="changepassword">
                    <Form.Group className="mb-4" controlId="password">
                        <Form.Label>Mật khẩu hiện tại</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu"
                            name="password"
                            onFocus={handleFocus}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="newPassword">
                        <Form.Label>Mật khẩu mới</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Nhập mật khẩu mới"
                            name="newPassword"
                            value={formik.values.newPassword}
                            onChange={formik.handleChange}
                            onFocus={handleError}
                        />
                        <div className="errorMsg newPassword">
                            {formik.errors.newPassword && (
                                <p className="text-danger ms-4"> {formik.errors.newPassword} </p>
                            )}
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-4 " controlId="comfirmedNewPassword">
                        <Form.Label>Xác nhận mật khẩu</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Xác nhận mật khẩu mới"
                            name="comfirmedNewPassword"
                            value={formik.values.comfirmedNewPassword}
                            onChange={formik.handleChange}
                            onFocus={handleError}
                        />
                        <div className="errorMsg comfirmedNewPassword">
                            {formik.errors.comfirmedNewPassword && (
                                <p className="text-danger ms-4"> {formik.errors.comfirmedNewPassword} </p>
                            )}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={prop.handleClose}>
                    Đóng
                </Button>
                <Button variant="primary" type="submit" form="changepassword" /* onClick={prop.handleClose} */>
                    Thay đổi mật khẩu
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default Change_password;
