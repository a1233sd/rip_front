import { configureStore, ThunkDispatch } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userReducer from "./slices/userSlice.ts";
import decreesReducer from "./slices/decreesSlice.ts";
import studentsReducer from "./slices/studentsSlice.ts";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Настройка persist для хранения данных пользователя
const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["id", "username", "email"], // Поля, которые сохраняются в localStorage
};

// Настройка store
export const store = configureStore({
  reducer: {
    user: persistReducer(persistConfig, userReducer), // persist применяется только к userReducer
    decrees: decreesReducer, // Сохранение для работы с приказами
    students: studentsReducer, // Сохранение для работы со студентами
  },
});

// Типизация состояния и диспетчера
export type RootState = ReturnType<typeof store.getState>;
export type AppThunkDispatch = ThunkDispatch<RootState, never, never>;

// Создание persister для синхронизации состояния
export const persister = persistStore(store);

// Кастомные хуки для типизированного доступа к dispatch и selector
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
