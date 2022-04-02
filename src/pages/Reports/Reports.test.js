import React from "react"
import "@testing-library/jest-dom"
import axios from "axios"
import {fireEvent, render, screen} from "@testing-library/react"
import {expect, jest} from "@jest/globals"
import {Reports} from "./Reports"

jest.mock("axios")

describe("Reports", () => {
	it("renders Reports Header", () => {
		render(<Reports />)

		expect(screen.getByRole("heading", {name: /Отчеты/i})).toBeInTheDocument() //title
		expect(screen.getByRole("textbox")).toBeInTheDocument() //search
		expect(screen.getByText("Тема отчета")).toBeInTheDocument() //select1
		expect(screen.getByText("Экспортировать")).toBeInTheDocument() //кнопка
	})

	it("input work check", () => {
		render(<Reports />)

		const input = screen.getByRole("textbox")
		expect(input.value).toBe("") // empty before
		fireEvent.change(input, {target: {value: "Hi"}})
		expect(input.value).toBe("Hi") //after
		fireEvent.change(input, {target: {value: ""}})
		expect(input.value).toBe("") // empty after
	})

	it("renders Reports card content", async () => {
		const data = [
			{
				reportNumber: "1",
				reasonRus: "Проблема",
				description: "description1",
			},
			{
				reportNumber: "2",
				reasonRus: "Предложение",
				description: "description2",
			},
			{
				reportNumber: "3",
				reasonRus: "Решение",
				description: "description3",
			},
		]

		axios.get.mockImplementationOnce(() => Promise.resolve({data: {hits: data}}))

		render(<Reports />)

		const items = await screen.findAllByText(/Отчет №/)

		expect(items).toHaveLength(3)
	})
})
