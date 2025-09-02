import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isLoginOpen: boolean;
    isOpened: boolean;
}

const initialState: ModalState = {
    isLoginOpen: false,
    isOpened: false
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openLogin: (state) => {
            state.isLoginOpen = true;
        },
        closeLogin: (state) => {
            state.isLoginOpen = false;
        },
        toggleLogin: (state) => {
            state.isLoginOpen = !state.isLoginOpen;
        },
        setOpened: (state) => {
            state.isOpened = true;
        }
    },
});

export const { openLogin, closeLogin, toggleLogin, setOpened } = modalSlice.actions;
export default modalSlice.reducer;
