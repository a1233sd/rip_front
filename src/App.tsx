import Header from "components/Header";
import StudentsListPage from "src/pages/StudentsListPage/index.ts";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import {Breadcrumbs} from "./components/Breadcrumbs/Breadcrumbs.tsx";
import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import DecreesPage from "src/pages/DecreesPage/index.ts";
import DecreePage from "src/pages/DecreePage";
import ProfilePage from "pages/ProfilePage";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {handleCheck} from "store/slices/userSlice.ts";
import NotFoundPage from "pages/NotFoundPage";
import {AccessDeniedPage} from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import { StudentPage } from "./pages/StudentPage/StudentPage.tsx";

function App() {

    const dispatch = useAppDispatch()

    const {checked} = useAppSelector((state) => state.user)

    useEffect(() => {
        dispatch(handleCheck())
    }, []);

    if (!checked) {
        return <></>
    }

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} /> 
                        <Route path="/students/" element={<StudentsListPage />} />
                        <Route path="/students/:id/" element={<StudentPage />} />
                        <Route path="/decrees/" element={<DecreesPage />} />
                        <Route path="/decrees/:id/" element={<DecreePage />} /> 
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} /> 
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
