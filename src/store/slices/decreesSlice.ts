import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_Decree, T_Student } from "src/utils/types.ts";
import { api } from "modules/api.ts";
import { AxiosResponse } from "axios";

export type T_DecreesFilters = {
    date_formation_start: string;
    date_formation_end: string;
    status: number;
};

type T_DecreesSlice = {
    draft_decree_id: number | null;
    students_count: number | null;
    decree: T_Decree | null;
    decrees: T_Decree[];
    filters: T_DecreesFilters;
    save_mm: boolean;
};

const initialState: T_DecreesSlice = {
    draft_decree_id: null,
    students_count: null,
    decree: null,
    decrees: [],
    filters: {
        status: 0,
        date_formation_start: "2023-01-01",
        date_formation_end: "2024-12-31",
    },
    save_mm: false,
};

// Получение одного декрета
export const fetchDecree = createAsyncThunk<T_Decree, string>(
    "decrees/fetchDecree",
    async function (decree_id) {
        const response: AxiosResponse<T_Decree> = await api.decrees.decreesRead(decree_id);
        return response.data;
    }
);

// Получение списка декретов
export const fetchDecrees = createAsyncThunk<T_Decree[], void>(
    "decrees/fetchDecrees",
    async function (_, thunkAPI) {
        const state = thunkAPI.getState() as { decrees: T_DecreesSlice };
        const response: AxiosResponse<T_Decree[]> = await api.decrees.decreesList({
            query: {
                status: state.decrees.filters.status,
                date_formation_start: state.decrees.filters.date_formation_start,
                date_formation_end: state.decrees.filters.date_formation_end,
            },
        });
        return response.data;
    }
);


// Обновление значения value для student_decree
export const updateStudentValue = createAsyncThunk<void, { student_id: string; value: number }>(
    "decrees/updateStudentValue",
    async function ({ student_id, value }, thunkAPI) {
        const state = thunkAPI.getState() as { decrees: T_DecreesSlice };
        const decreeId = state.decrees.decree?.id?.toString();

        if (!decreeId) {
            throw new Error("Decree ID is not available");
        }

        // Отправляем новое значение value на сервер
        await api.decrees.decreesUpdateStudentUpdate(decreeId, student_id, { value });
    }
);

// Удаление студента из черновика декрета
export const removeStudentFromDraftDecree = createAsyncThunk<T_Student[], string>(
    "decrees/removeStudent",
    async function (student_id, thunkAPI) {
        const state = thunkAPI.getState() as { decrees: T_DecreesSlice };
        const decreeId = state.decrees.decree?.id;

        if (!decreeId) {
            throw new Error("Decree ID is not available");
        }

        const response: AxiosResponse<T_Student[]> = await api.decrees.decreesDeleteStudentDelete(
            decreeId.toString(),
            student_id
        );
        return response.data;
    }
);

// Удаление черновика декрета
export const deleteDraftDecree = createAsyncThunk<void, void>(
    "decrees/deleteDraftDecree",
    async function (_, thunkAPI) {
        const state = thunkAPI.getState() as { decrees: T_DecreesSlice };
        const decreeId = state.decrees.decree?.id;
        // Проверяем, есть ли ID у декрета
        if (!decreeId) {
            throw new Error("Decree ID is not available");
        }

        try {
            // Преобразуем ID в строку для вызова API
            await api.decrees.decreesDeleteDelete(decreeId.toString());
        } catch (error) {
            console.error("Error deleting decree:", error);
            throw error;
        }
    }
);

// Отправка черновика декрета
export const sendDraftDecree = createAsyncThunk<void, void>(
    "decrees/sendDraftDecree",
    async function (_, thunkAPI) {
        const state = thunkAPI.getState() as { decrees: T_DecreesSlice };
        const decreeId = state.decrees.decree?.id;

        if (!decreeId) {
            throw new Error("Decree ID is not available");
        }

        await api.decrees.decreesUpdateStatusUserUpdate(decreeId.toString());
    }
);

// Обновление декрета
export const updateDecree = createAsyncThunk<void, Partial<T_Decree>>(
    "decrees/updateDecree",
    async function (data, thunkAPI) {
        const state = thunkAPI.getState() as { decrees: T_DecreesSlice };
        const decreeId = state.decrees.decree?.id;

        if (!decreeId) {
            throw new Error("Decree ID is not available");
        }

        await api.decrees.decreesUpdateUpdate(decreeId.toString(), data);
        console.log("update decree !!")
    }
);

const decreesSlice = createSlice({
    name: "decrees",
    initialState,
    reducers: {
        saveDecree: (state, action: PayloadAction<{ draft_decree_id: number; students_count: number }>) => {
            state.draft_decree_id = action.payload.draft_decree_id;
            state.students_count = action.payload.students_count;
        },
        removeDecree: (state) => {
            state.decree = null;
        },
        triggerUpdateMM: (state) => {
            state.save_mm = !state.save_mm;
        },
        updateFilters: (state, action: PayloadAction<T_DecreesFilters>) => {
            state.filters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchDecree.fulfilled, (state, action: PayloadAction<T_Decree>) => {
            state.decree = action.payload;
        });
        builder.addCase(fetchDecrees.fulfilled, (state, action: PayloadAction<T_Decree[]>) => {
            state.decrees = action.payload;
        });
        builder.addCase(removeStudentFromDraftDecree.fulfilled, (state, action: PayloadAction<T_Student[]>) => {
            if (state.decree) {
                state.decree.students = action.payload;
            }
        });
        builder.addCase(sendDraftDecree.fulfilled, (state) => {
            state.decree = null;
        });
    },
});

export const { saveDecree, removeDecree, triggerUpdateMM, updateFilters } = decreesSlice.actions;

export default decreesSlice.reducer;
