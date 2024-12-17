export type T_Student = {
    id: string;
    name: string;
    course: string;
    status: number;
    image: string | null;
    group: string | null;
    number: string | null;
};

export type T_Decree = {
    id: string | null;
    status: E_DecreeStatus;
    date_complete: string;
    date_created: string;
    date_formation: string;
    owner: string;
    moderator: string;
    students: T_Student[];
    field: string;
    room: string;
    number: string
};

export enum E_DecreeStatus {
    Draft = 1,
    InWork,
    Completed,
    Rejected,
    Deleted,
}

export type T_User = {
    id: number;
    username: string;
    email: string;
    is_authenticated: boolean;
    validation_error: boolean;
    validation_success: boolean;
    checked: boolean;
};

export type T_LoginCredentials = {
    username: string;
    password: string;
};

export type T_RegisterCredentials = {
    name: string;
    email: string;
    password: string;
};

export type T_StudentsListResponse = {
    students: T_Student[];
    draft_decree_id: number;
    students_count: number;
};
