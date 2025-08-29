import { createSlice } from "@reduxjs/toolkit";

interface ModalState {
    isLoginOpen: boolean;
}

const initialState: ModalState = {
    isLoginOpen: false,
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
    },
});

export const { openLogin, closeLogin, toggleLogin } = modalSlice.actions;
export default modalSlice.reducer;
