import {Developer} from "./Developer"
import {screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import {Provider} from "react-redux"
import developmentData from "../Development/API/development.json"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {Route, Routes} from "react-router-dom"
import React from "react"
import {MemoryRouter} from "react-router-dom"
import {addDevelopers} from "../../store/development/developmentSlice"

//делаем копия хранилища редакса для тестирования
const mockStore = configureMockStore([thunk])

describe("Тестирование страницы: План развития сотрудников", () => {
	let store
	let component

	const App = ({store}) => (
		<MemoryRouter initialEntries={["/developer/:11"]}>
			<Provider store={store}>
				<Routes>
					<Route path={"/developer/:guid"} element={<Developer />} />
				</Routes>
			</Provider>
		</MemoryRouter>
	)

	it("Проверка на правильный рендер таблицы - должно быть 3 строки", () => {
		const store = mockStore({
			development: {
				developer: developmentData[0],
				developers: developmentData,
			},
		})
		render(<App store={store} />)
		//получение строки в дереве страницы
		const tableRow = screen.getAllByLabelText("table-row")
		//проверка на количество строк на странице
		expect(tableRow).toHaveLength(3)
	})

	it("Если произошла холодная загрузка страницы вызывается addDevelopers", () => {
		const store = mockStore({
			development: {
				developer: {},
				developers: [],
			},
		})
		store.dispatch = jest.fn()

		render(<App store={store} />)
		expect(store.dispatch).toHaveBeenCalledTimes(2)
		expect(store.dispatch).toHaveBeenCalledWith({payload: developmentData, type: "development/addDevelopers"})
	})
})
