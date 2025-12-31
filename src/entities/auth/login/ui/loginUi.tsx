import { useDispatch, useSelector } from "react-redux"
import { login } from "../loginSlice";
import { Alert, Button, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../../../app/store/store";


export default function LoginUi() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { loading, error, isAuth, success } = useSelector((state) => state.login)
    const onFinish = (values: { userName: string; password: string }) => {
        dispatch(login(values))
    }

    useEffect(() => {
        if (isAuth) {
            navigate("/", { replace: true })
            message.success("Успешный Вход")
        }
    }, [isAuth, navigate])



    return (<>


        <Form onFinish={onFinish} layout="vertical" style={{ maxWidth: 400, margin: '50px auto' }} >
            <h2>Login</h2>
            {error && <Alert type="error" message={error} />}
            {success && <Alert type="success" message={success} />}

            <Form.Item name="userName" label="Username" rules={[{ required: true }]}>
                <Input />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
                <Input.Password />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={loading}>
                Войти
            </Button>
        </Form>
    </>)
}