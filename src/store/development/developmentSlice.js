import {createSlice} from "@reduxjs/toolkit"

const developmentSlice = createSlice({
	name: "development",
	initialState: {
		developer: {},
		developers: [],
	},
	reducers: {
		addDevelopers(state, action) {
			state.developers = action.payload
		},
		findDeveloper(state, action) {
			state.developer = state.developers.find((developer) => developer.guid === action.payload)
		},
	},
	extraReducers: () => {},
})

export const {addDevelopers, findDeveloper} = developmentSlice.actions

export default developmentSlice.reducer
