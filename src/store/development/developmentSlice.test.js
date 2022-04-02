import developmentReducer, {findDeveloper} from "./developmentSlice"
import {addDevelopers} from "./developmentSlice"
import developmentData from "../../pages/development/API/development.json"

describe("Тестирование редъюсера: developmentReducer", () => {
	it("addDevelopers", () => {
		const startState = {
			developer: {},
			developers: [],
		}

		const action = addDevelopers(developmentData)
		const endState = developmentReducer(startState, action)
		expect(endState.developers.length).toBe(5)
	})

	it("findDeveloper", () => {
		const startState = {
			developer: {},
			developers: developmentData,
		}

		const action = findDeveloper("11")
		const endState = developmentReducer(startState, action)
		expect(endState.developer.guid).toBe("11")
	})

	it("тест addDevelopers", () => {
		const startState = {
			developer: {},
			developers: [],
		}
		expect(developmentReducer(startState, addDevelopers(developmentData))).toEqual({
			developer: {},
			developers: developmentData,
		})
	})

	it("тест findDeveloper", () => {
		const startState = {
			developer: {},
			developers: developmentData,
		}
		expect(developmentReducer(startState, findDeveloper("11"))).toEqual({
			developer: developmentData[0],
			developers: developmentData,
		})
	})
})
