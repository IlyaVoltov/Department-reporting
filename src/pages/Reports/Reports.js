import React, {useState, useEffect, useRef} from "react"
import {Grid} from "@mui/material"
import {Header} from "../../components/Header/Header"
import {SelectComponent} from "../../components/Header/SelectComponent"
import {CardItem} from "../../components/CardItem"
import {ReportItem} from "./components/ReportItem"
import {SearchComponent} from "../../components/Header/SearchComponent"
import data from "../../json/main.json"
import reports from "./API/reports.json"
import {ExportButton} from "../../components/Header/ExportButton"

export const Reports = () => {
	const componentRef = useRef()

	//вычисляем название текущего месяца
	const currentMonth = data.monthList[new Date().getMonth()]
	//значение селекта месяц
	const [month, setMonth] = useState(currentMonth)

	//значение селекта причина
	const [reasonValue, setReasonValue] = useState("Тема отчета")

	// значение в строке поиска
	const [searchValue, setSearchValue] = useState("")

	//отфильтрованые данные по отчетам в зависимости от месяца
	const [filteredReports, setFilteredReports] = useState([])

	//отфильтрованые поиском Отчеты
	const [filteredItems, setFiltered] = useState([])

	//добавляем старый список Отчетов (не отфильтрованный) при первой отрисовке страницы
	useEffect(() => {
		const filteredRep = reports[month]

		setFilteredReports(filteredRep ? filteredRep : [])
		setSearchValue("")
		setReasonValue("Тема отчета")
	}, [month])

	//смена месяца  в селекте
	const handleChangeValue = (e) => {
		setMonth(e.target.value)
	}

	//смена причины Отчета в селекте
	const handleChangeReasonValue = (e) => {
		setReasonValue(e.target.value)
	}
	//смена значения в поисковой строке
	const handleChangeSearchValue = (e) => {
		setSearchValue(e.target.value)
	}

	// фильтрация Отчетов по поиску
	useEffect(() => {
		let newReports
		let name = "Отчет"
		if (searchValue !== "") {
			newReports = filteredReports.filter((report) => {
				//поиск по номеру Отчета
				const number = report.reportNumber.toLowerCase().replace(/ /g, "")

				//поиск по номеру со словом Отчет
				const reportNumberWithWord = `${name} ${number}`.toLowerCase().replace(/ /g, "")

				//поиск по номеру со словом Отчет и №
				const reportNumberWithWordAndSymbol = `${name} № ${number}`.toLowerCase().replace(/ /g, "")

				//поиск по описанию
				const description = report.description.toLowerCase().replace(/ /g, "")

				//вводимый в поиск запрос
				const filter = searchValue.toLowerCase().replace(/ /g, "")

				return (
					number.includes(filter) ||
					description.includes(filter) ||
					reportNumberWithWord.includes(filter) ||
					reportNumberWithWordAndSymbol.includes(filter)
				)
			})
		} else {
			newReports = filteredReports
		}

		// фильтрация по причине
		if (reasonValue !== "Тема отчета") {
			newReports = newReports.filter((c) => c.reasonRus === reasonValue)
		}

		setFiltered(newReports)
	}, [searchValue, reasonValue, filteredReports])

	return (
		<div ref={componentRef}>
			<Header title={"Отчеты"}>
				<SearchComponent searchValue={searchValue} handleChangeSearchValue={handleChangeSearchValue} />
				<SelectComponent valueList={data.monthList} chosenValue={month} handleChangeValue={handleChangeValue} />
				<SelectComponent
					defaultValue={"Тема отчета"}
					valueList={data.type}
					chosenValue={reasonValue}
					handleChangeValue={handleChangeReasonValue}
				/>
				<ExportButton documentTitle={"Основные показатели"} componentRef={componentRef} />
			</Header>

			{filteredItems.length > 0 ? (
				<Grid container spacing={3} id={"pdf-container"} sx={{mb: "36px"}}>
					{filteredItems &&
						filteredItems.map((item, i) => (
							<CardItem itemWidth={12} title={`Отчет №${item.reportNumber}`} key={i}>
								<ReportItem item={item} />
							</CardItem>
						))}
				</Grid>
			) : (
				<Grid container spacing={3}>
					<CardItem itemWidth={12} title={"Поиск по вашему запросу не дал результатов"} />
				</Grid>
			)}
		</div>
	)
}
