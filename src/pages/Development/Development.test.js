import {Development} from "./Development"
import {Developer} from "../Developer/Developer"
import {screen, render, fireEvent} from "@testing-library/react"
import "@testing-library/jest-dom"
import {Provider} from "react-redux"
import developmentData from "./API/development.json"
import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import {Navigate, Route, Routes} from "react-router-dom"
import React from "react"
import {MemoryRouter} from "react-router-dom"

//делаем копия хранилища редакса для тестирования
const mockStore = configureMockStore([thunk])

describe("Тестирование страницы: План развития сотрудников", () => {
	const store = mockStore({
		development: {
			developer: developmentData[0],
			developers: developmentData,
		},
	})

	const App = () => (
		<MemoryRouter initialEntries={["/development"]}>
			<Provider store={store}>
				<Routes>
					<Route exact path={"/"} element={<Navigate to={"/development"} />} />
					<Route path={"/development"} element={<Development />} />
					<Route path={"/developer/:guid"} element={<Developer />} />
				</Routes>
			</Provider>
		</MemoryRouter>
	)

	it("Проверка на правильный рендер таблицы - должно быть 5 строк", () => {
		render(<App />)
		//получение строки в дереве страницы
		const tableRow = screen.getAllByLabelText("table-row")
		//проверка на количество строк на странице
		expect(tableRow).toHaveLength(5)
	})

	it("Переход на страницу выбранного разработчика", async () => {
		render(<App />)
		//кнопки по переходу на страницы других разработчиков
		const linkButton = screen.getByLabelText("go-to-page-11")
		//обработка клика по кнопке
		fireEvent.click(linkButton, {button: 0})
		// await waitFor(() => fireEvent.click(linkButton, {button: 0}))
		//ожидаем что мы перешли на новую страницу с новым тестом
		expect(screen.getByText(/мастер-класс по юнит-тестированию javascript.ninja/i)).toBeInTheDocument()
	})
})
