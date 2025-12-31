import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "../../../../app/store/store"
import { register } from "../registerSlice"
import { Button, Form, Input, Alert, message } from 'antd';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function RegistrationUi() {

    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const { loading, error, success } = useSelector((state: RootState) => state.auth)
    const onFinish = (values: any) => {
        dispatch(register(values))
    }
    useEffect(() => {
        if (success) {
            message.success("Ргистарция успешна")
            navigate("/login")
        }
    }, [success])

    return (
        <Form
            layout="vertical"
            onFinish={onFinish}
            style={{ maxWidth: 400, margin: '50px auto' }}
        >
            <h2>Регистрация</h2>

            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message="Регистрация успешна" />}

            <Form.Item name="userName" label="Username" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
                <Input />
            </Form.Item>

            <Form.Item
                name="phoneNumber"
                label="Номер телефона"
                rules={[
                    { required: true, message: 'Введите номер телефона' },
                ]}
            >
                <Input placeholder="+992xxxxxxxxx" />
            </Form.Item>

            <Form.Item name="password" label="Пароль" rules={[{ required: true, min: 4 }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                label="Подтвердите пароль"
                dependencies={['password']}
                rules={[
                    { required: true },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('Пароли не совпадают');
                        },
                    }),
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading} block>
                Зарегистрироваться
            </Button>
        </Form>
    );
}