import {configureStore} from "@reduxjs/toolkit"
import developmentReducer from "./development/developmentSlice"

export const store = configureStore({
	reducer: {
		development: developmentReducer,
	},
})

window.store = store
