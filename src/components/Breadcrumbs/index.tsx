import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { IStudent } from "modules/types.ts";
import { isHomePage, isTicketPage } from "utils/utils.ts";

interface BreadcrumbsProps {
    selectedStudent: IStudent | null;
}

const Breadcrumbs = ({ selectedStudent }: BreadcrumbsProps) => {
    const location = useLocation();

    return (
        <Breadcrumb className="fs-5">
            {isHomePage(location.pathname) &&
                <BreadcrumbItem>
                    <Link to="/">
                        Главная
                    </Link>
                </BreadcrumbItem>
            }

            {location.pathname.includes("/students") &&
                <BreadcrumbItem active>
                    <Link to="/students">
                        Студенты
                    </Link>
                </BreadcrumbItem>
            }

            {isTicketPage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        {selectedStudent?.name}
                    </Link>
                </BreadcrumbItem>
            }
        </Breadcrumb>
    );
};

export default Breadcrumbs;
