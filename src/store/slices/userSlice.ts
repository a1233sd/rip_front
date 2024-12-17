import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { T_LoginCredentials, T_RegisterCredentials, T_User } from "src/utils/types.ts";
import { api } from "modules/api.ts";


const initialState: T_User = {
    id: -1,
    username: "",
    email: "",
    is_authenticated: false,
    validation_error: false,
    validation_success: false,
    checked: false,
};

// Проверка авторизации
export const handleCheck = createAsyncThunk<T_User>(
    "user/check",
    async () => {
        const response = await api.users.usersLoginCreate({ username: "", password: "" }); // Пустые значения для проверки
        return response.data as T_User;
    }
);

// Логин пользователя
export const handleLogin = createAsyncThunk<T_User, T_LoginCredentials>(
    "user/login",
    async ({ username, password }) => {
        const response = await api.users.usersLoginCreate({
            username,
            password,
        });
        return response.data as T_User;
    }
);

// Регистрация пользователя
export const handleRegister = createAsyncThunk<T_User, T_RegisterCredentials>(
    "user/register",
    async ({ username, email, password }) => {
        const response = await api.users.usersRegisterCreate({
            username, // Должно совпадать с серверным полем
            email,
            password,
        });
        return response.data as T_User;
    }
);


// Выход из системы
export const handleLogout = createAsyncThunk<void>(
    "user/logout",
    async () => {
        await api.users.usersLogoutCreate();
    }
);

// Обновление профиля пользователя
export const handleUpdateProfile = createAsyncThunk<T_User, Partial<T_User>>(
    "user/updateProfile",
    async (userData, { getState }) => {
        const state: any = getState();
        const { username, email } = userData;
        const response = await api.users.usersUpdateUpdate(state.user.id, {
            username,
            email,
        });
        return response.data as T_User;
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setValidationError: (state, action: PayloadAction<boolean>) => {
            state.validation_error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleLogin.fulfilled, (state, action: PayloadAction<T_User>) => {
            state.is_authenticated = true;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        });
        builder.addCase(handleRegister.fulfilled, (state, action: PayloadAction<T_User>) => {
            state.is_authenticated = true;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        });
        builder.addCase(handleLogout.fulfilled, (state) => {
            state.is_authenticated = false;
            state.id = -1;
            state.username = "";
            state.email = "";
            state.validation_error = false;
        });
        builder.addCase(handleCheck.fulfilled, (state, action: PayloadAction<T_User>) => {
            state.is_authenticated = true;
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.checked = true;
        });
        builder.addCase(handleCheck.rejected, (state) => {
            state.is_authenticated = false;
            state.id = -1;
            state.username = "";
            state.email = "";
            state.validation_error = false;
            state.checked = true;
        });
        builder.addCase(handleUpdateProfile.fulfilled, (state, action: PayloadAction<T_User>) => {
            state.id = action.payload.id;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.validation_error = false;
            state.validation_success = true;
        });
        builder.addCase(handleUpdateProfile.rejected, (state) => {
            state.validation_error = true;
            state.validation_success = false;
        });
    },
});

export const { setValidationError } = userSlice.actions;

export default userSlice.reducer;
