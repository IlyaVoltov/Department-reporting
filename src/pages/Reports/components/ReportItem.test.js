import React from "react"
import "@testing-library/jest-dom"
import {render, screen} from "@testing-library/react"
import {expect} from "@jest/globals"
import {ReportItem} from "./ReportItem"

describe("ReportItem", () => {
	it("renders ReportItem component", async () => {
		const data = {
			reportNumber: "1",
			reasonRus: "Проблема",
			description: "Описание",
		}

		render(<ReportItem item={data} />)

		expect(screen.getByTestId("reason")).toBeInTheDocument()

		expect(screen.getByTestId("description")).toBeInTheDocument()

		expect(screen.getByRole("heading", {name: /Проблема/i})).toBeInTheDocument()

		expect(screen.getByRole("heading", {name: /Описание/i})).toBeInTheDocument()
	})
})
