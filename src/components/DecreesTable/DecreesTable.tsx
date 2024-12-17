import { useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { formatDate } from "src/utils/utils.ts";
import CustomTable from "components/CustomTable";
import { T_Decree } from "src/utils/types.ts";

export const DecreesTable = ({ decrees }: { decrees: T_Decree[] }) => {
    const navigate = useNavigate();

    const handleClick = (decree_id: number) => {
        navigate(`/decrees/${decree_id}`);
    };

    const statuses: Record<number, string> = {
        1: "Черновик",
        2: "В работе",
        3: "Завершён",
        4: "Отклонён",
        5: "Удалён",
    };

    const columns = useMemo(
        () => [
            {
                Header: "№",
                accessor: "id",
            },
            {
                Header: "Статус",
                accessor: "status",
                Cell: ({ value }: { value: number }) => statuses[value] || "Неизвестен",
            },
            {
                Header: "Дата создания",
                accessor: "date_created",
                Cell: ({ value }: { value: string }) => formatDate(value),
            },
            {
                Header: "Дата формирования",
                accessor: "date_formation",
                Cell: ({ value }: { value: string }) => formatDate(value),
            },
            {
                Header: "Дата завершения",
                accessor: "date_complete",
                Cell: ({ value }: { value: string }) => formatDate(value),
            },
            {
                Header: "Номер",
                accessor: "number",
            },
        ],
        []
    );

    return <CustomTable columns={columns} data={decrees} onClick={handleClick} />;
};
