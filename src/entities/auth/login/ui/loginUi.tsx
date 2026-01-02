import { useDispatch, useSelector } from "react-redux";
import { login } from "../loginSlice";
import { Alert, Button, Form, Input, message, Typography } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../../../app/store/store";

const { Title, Text } = Typography;

export default function LoginUi() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, isAuth, success } = useSelector(
    (state: RootState) => state.login
  );

  const onFinish = (values: { userName: string; password: string }) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/", { replace: true });
      message.success("Успешный вход");
    }
  }, [isAuth, navigate]);

  return (
    <div className="flex justify-center items-center bg-gray-100 min-h-screen">
      <div className="bg-white shadow-xl p-10 rounded-2xl w-full max-w-md">
        <Title level={2} className="mb-6 text-center" style={{ color: "rgb(30, 118, 178)" }}>
          Вход в аккаунт
        </Title>

        {error && (
          <Alert
            type="error"
            message={error}
            style={{ marginBottom: 16, borderRadius: 8 }}
          />
        )}
        {success && !isAuth && (
          <Alert
            type="success"
            message={success}
            style={{ marginBottom: 16, borderRadius: 8 }}
          />
        )}

        <Form
          onFinish={onFinish}
          layout="vertical"
          className="space-y-4"
        >
          <Form.Item
            name="userName"
            label={<Text strong>Имя пользователя</Text>}
            rules={[{ required: true, message: "Введите имя пользователя" }]}
          >
            <Input
              placeholder="Введите имя пользователя"
              className="rounded-lg"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={<Text strong>Пароль</Text>}
            rules={[{ required: true, message: "Введите пароль" }]}
          >
            <Input.Password
              placeholder="Введите пароль"
              className="rounded-lg"
              size="large"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            size="large"
            className="rounded-lg w-full"
            style={{ backgroundColor: "rgb(30, 118, 178)" }}
          >
            Войти
          </Button>
        </Form>

        <div className="mt-6 text-gray-500 text-center">
          Нет аккаунта?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/registration")}
          >
            Зарегистрируйтесь
          </span>
        </div>
      </div>
    </div>
  );
}
