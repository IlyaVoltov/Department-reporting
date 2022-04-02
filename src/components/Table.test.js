import {render} from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import developersData from "../pages/Development/API/development.json"
import {TableComponent} from "./Table"
import {MemoryRouter} from "react-router-dom"

describe("Тестирование страницы: План развития сотрудников", () => {
	const Application = () => (
		<MemoryRouter initialEntries={["/development"]}>
			<TableComponent
				haveIconButton={false}
				rows={developersData}
				columnNames={[
					{ru: "Разработчик", en: "developer"},
					{ru: "Направление", en: "position"},
					{ru: "Работает в команде с", en: "workStartDate"},
				]}
			/>
		</MemoryRouter>
	)

	it("Проверка на  рендер приложения", () => {
		const tree = render(<Application />)
		//проверка на количество строк на странице
		expect(tree).toMatchSnapshot()
	})
})
