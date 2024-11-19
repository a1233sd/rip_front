import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { IStudent } from "modules/types.ts";
import { isHomePage, isTicketPage } from "utils/utils.ts";

interface BreadcrumbsProps {
    selectedStudent: IStudent | null;
}

const Breadcrumbs = ({ selectedStudent }: BreadcrumbsProps) => {
    const location = useLocation();

    const isReprimandsPage = location.pathname.includes("/reprimands");
    // Сохраняем имя студента в переменную
    const studentName = selectedStudent ? selectedStudent.name : null;

    return (
        <Breadcrumb className="fs-5">
            {/* Главная */}
            <BreadcrumbItem>
                <Link to="/">Главная</Link>
            </BreadcrumbItem>

            {/* Студенты */}
            {location.pathname.includes("/students") && (
                <BreadcrumbItem>
                    <Link to="/students">Студенты</Link>
                </BreadcrumbItem>
            )}

            {/* Страница студента */}
            {isTicketPage(location.pathname) && selectedStudent && (
                <BreadcrumbItem>
                    <Link to={`/students/${selectedStudent.id}`}>{selectedStudent.name}</Link>
                </BreadcrumbItem>
            )}

            {/* Страница выговоров */}
            {isReprimandsPage && (
                <BreadcrumbItem active>
                    <Link to={`${location.pathname}`}>Выговоры</Link>
                </BreadcrumbItem>
            )}
        </Breadcrumb>
    );
};

export default Breadcrumbs;
