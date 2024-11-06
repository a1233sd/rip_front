import {useState} from "react";
import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import StudentPage from "src/pages/StudentPage";
import StudentsListPage from "pages/StudentsListPage";
import {Route, Routes} from "react-router-dom";
import {IStudent} from "src/modules/types.ts";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import "./styles.css"

function App() {

    const [students, setstudents] = useState<IStudent[]>([])

    const [selectedStudent, setSelectedStudent] = useState<IStudent | null>(null)

    const [isMock, setIsMock] = useState(false);

    const [studentName, setStudentName] = useState<string>("")

    return (
        <div>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedStudent={selectedStudent} />
                </Row>
                <Row>
                    <Routes>
						<Route path="/" element={<HomePage />} />
                        <Route path="/students/" element={<StudentsListPage students={students} setstudents={setstudents} isMock={isMock} setIsMock={setIsMock} studentName={studentName} setStudentName={setStudentName}/>} />
                        <Route path="/students/:id" element={<StudentPage selectedStudent={selectedStudent} setSelectedStudent={setSelectedStudent} isMock={isMock} setIsMock={setIsMock}/>} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
