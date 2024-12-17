import {
    Button,
    Card,
    CardBody,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from "reactstrap";
import React, {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "src/store/store.ts";
import {handleLogin} from "store/slices/userSlice.ts";
import {Link, useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated);

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const usernameField = e.currentTarget.elements[0] as HTMLInputElement;
        const passwordField = e.currentTarget.elements[1] as HTMLInputElement;

        const data = {
            username: usernameField.value,
            password: passwordField.value,
        };

        const result = await dispatch(handleLogin(data));

        if (result.type === "login/fulfilled") {
            navigate("/");
        } else if (result.type === "login/rejected" && result.payload?.status === 401) {
            alert("Ошибка авторизации: неверные логин или пароль."); // Уведомление браузера
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/students/");
        }
    }, [isAuthenticated]);

    return (
        <Container>
            <Row className="justify-content-center">
                <Col md="4">
                    <Card>
                        <CardBody>
                            <Form onSubmit={handleSubmit}>
                                <h3 className="text-center">Форма входа</h3>
                                <FormGroup className="mt-4">
                                    <Label for="username-input">Введите логин</Label>
                                    <Input
                                        placeholder="Логин"
                                        type="text"
                                        id="username-input"
                                        required
                                    />
                                </FormGroup>
                                <FormGroup className="mt-4">
                                    <Label for="password-input">Введите пароль</Label>
                                    <Input
                                        placeholder="Пароль"
                                        type="password"
                                        id="password-input"
                                        required
                                    />
                                </FormGroup>
                                <Row className="justify-content-center mt-4">
                                    <Link to="/register/" style={{textAlign: "center"}}>
                                        Еще нет аккаунта? Зарегистрироваться
                                    </Link>
                                </Row>
                                <Row className="justify-content-center mt-4">
                                    <Button color="primary" className="w-50">
                                        Войти
                                    </Button>
                                </Row>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};
