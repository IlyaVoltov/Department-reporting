import React from "react"
import "@testing-library/jest-dom"
import axios from "axios"
import {render, screen} from "@testing-library/react"
import {expect, jest} from "@jest/globals"
import {Main} from "./Main"

jest.mock("axios")

describe("Main", () => {
	it("renders Main Header", () => {
		render(<Main />)

		expect(screen.getByRole("heading", {name: /Основные показатели/i})).toBeInTheDocument() //title
		expect(screen.getByRole("button", {name: /Экспортировать/i})).toBeInTheDocument() //кнопка
	})

	it("renders Main card content", async () => {
		const data1 = [
			{
				sectionName: "incomingDocuments",
				sectionNameRu: "Входящие документы",
				data: [
					{
						title: "Всего",
						number: "472",
					},
					{
						title: "Волтов",
						number: "24",
					},
					{
						title: "Иванов",
						number: "5",
					},
				],
			},
		]

		const data2 = {
			createdTasks: 15,
			completedTasks: 12,
			pullRequests: 4,
			commits: 7,
		}

		axios.get.mockImplementationOnce(() => Promise.resolve({data: {hits: data1}}))
		axios.get.mockImplementationOnce(() => Promise.resolve({data: {hits: data2}}))

		render(<Main />)

		expect(screen.getByRole("heading", {name: /Входящие документы/i})).toBeInTheDocument()
		expect(screen.getByRole("heading", {name: /Статистика по проектам/i})).toBeInTheDocument()
	})
})
