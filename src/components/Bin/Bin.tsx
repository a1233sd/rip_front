import { Link } from "react-router-dom";
import { Badge, Button } from "reactstrap";

type Props = {
    isActive: boolean;
    draft_decree_id: number | null; // Используем число или null
    students_count: number | null; // Используем число или null
};

export const Bin = ({ isActive, draft_decree_id, students_count }: Props) => {
    if (draft_decree_id ==null) {
        return <Button color={"secondary"} className="w-50" disabled>Корзина</Button>;
    }

    return (
        <Link to={`/decrees/${draft_decree_id}/`} className="w-50">
            <Button color={"primary"} className="w-100 bin">
                Корзина
                <Badge>
                    {students_count ?? 0} {/* Если students_count null, отображаем 0 */}
                </Badge>
            </Button>
        </Link>
    );
};
