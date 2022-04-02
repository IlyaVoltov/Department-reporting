import {render} from "@testing-library/react"
import "@testing-library/jest-dom"
import React from "react"
import {ExportButton} from "./ExportButton"
import {Header} from "./Header"
import {SearchComponent} from "./SearchComponent"
import {SelectComponent} from "./SelectComponent"
import data from "../../json/main.json"

describe("Тестирование страницы: План развития сотрудников", () => {
	const Application = () => (
		<Header title={"План развития сотрудников"}>
			<ExportButton documentTitle={"План развития сотрудников"} />
			<SearchComponent />
			<SelectComponent valueList={data.monthList} chosenValue={data.monthList[new Date().getMonth()]} />
		</Header>
	)

	it("Проверка на  рендер приложения", () => {
		const tree = render(<Application />)
		//проверка на количество строк на странице
		expect(tree).toMatchSnapshot()
	})
})
