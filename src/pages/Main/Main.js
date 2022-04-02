import React, {forwardRef, useRef, useState, useEffect, Fragment} from "react"
import {Grid, Box, ListItem, ListItemText, Typography} from "@mui/material"
import {Header} from "../../components/Header/Header"
import {SelectComponent} from "../../components/Header/SelectComponent"
import data from "../../json/main.json"
import currentProjects from "./API/currentProjects.json"
import team from "./API/team.json"
import statistics from "./API/statistics.json"
import documents from "./API/documents.json"
import {CardItem} from "../../components/CardItem"
import {CurrentProjectItem} from "./components/CurrentProjectItem"
import {DocumentsItem} from "./components/DocumentsItem"
import {TeamItem} from "./components/TeamItem"
import {StatisticsItem} from "./components/StatisticsItem.js"
import {ExportButton} from "../../components/Header/ExportButton"
import {EmptyContainer} from "./components/EmptyContainer"

/**главная страница */
export const Main = () => {
	const componentRef = useRef()
	//вычисляем название текущего месяца
	const currentMonth = data.monthList[new Date().getMonth()]
	//значение селекта месяц
	const [month, setMonth] = useState(currentMonth)

	//отфильтрованые данные по статистике
	const [filteredStatistics, setFilteredStatistics] = useState({})

	//отфильтрованые данные по документам
	const [filteredDocuments, setFilteredDocuments] = useState([])

	//смена месяца  в селекте
	const handleChangeValue = (e) => {
		setMonth(e.target.value)
	}

	//добавляем старый список Отчетов (не отфильтрованный) при первой отрисовке страницы
	useEffect(() => {
		const filteredStat = statistics[month]
		const filteredDoc = documents[month]
		setFilteredStatistics(filteredStat ? filteredStat : {})
		setFilteredDocuments(filteredDoc ? filteredDoc : [])
	}, [month])

	return (
		<>
			<Header title={"Основные показатели"}>
				<SelectComponent valueList={data.monthList} chosenValue={month} handleChangeValue={handleChangeValue} />
				<ExportButton documentTitle={"Основные показатели"} componentRef={componentRef} />
			</Header>

			<Grid container spacing={3}>
				{filteredDocuments.length > 0 ? (
					filteredDocuments.map((item, i) => (
						<CardItem
							itemWidth={4}
							itemHeight={"180px"}
							title={item.sectionNameRu}
							important={item.sectionName === "rejectedDocuments" ? true : false}
							key={i}>
							<DocumentsItem item={item.data} important={item.sectionName === "rejectedDocuments" ? true : false} />
						</CardItem>
					))
				) : (
					<EmptyContainer />
				)}

				<CardItem itemWidth={4} title="Статистика по проектам">
					<Box
						sx={{
							display: "flex",
						}}>
						<StatisticsItem statistics={filteredStatistics} />
					</Box>
				</CardItem>
				<CardItem itemWidth={8} title="Текущие проекты" raise={true}>
					{currentProjects && currentProjects.map((item, i) => <CurrentProjectItem item={item} index={i} key={i} />)}
				</CardItem>
				<CardItem itemWidth={4} title="Штат управления разработки ПО">
					<Box
						sx={{
							display: "flex",
							pt: "12px",
						}}>
						<TeamItem team={team} />
					</Box>
				</CardItem>
			</Grid>
			<div style={{display: "none"}}>
				<PrintToPdf ref={componentRef} filteredDocuments={filteredDocuments} filteredStatistics={filteredStatistics} />
			</div>
		</>
	)
}

export const PrintToPdf = forwardRef(({filteredDocuments, filteredStatistics}, ref) => {
	return (
		<div ref={ref}>
			<Header title={"Основные показатели"} />

			<div style={{marginBottom: 20}}>
				<Grid container spacing={2}>
					{filteredDocuments &&
						filteredDocuments.map((item, i) => (
							<CardItem
								itemWidth={12}
								itemHeight={"175px"}
								title={item.sectionNameRu}
								important={item.sectionName === "rejectedDocuments"}
								key={i}>
								<DocumentsItem item={item.data} important={item.sectionName === "rejectedDocuments" ? true : false} />
							</CardItem>
						))}
				</Grid>
			</div>
			<div style={{pageBreakAfter: "always", pageBreakBefore: "always", pageBreakInside: "avoid"}}>
				<Grid container spacing={3}>
					<CardItem itemWidth={6} title="Статистика по проектам">
						<Box
							sx={{
								display: "flex",
							}}>
							<StatisticsItem statistics={filteredStatistics} />
						</Box>
					</CardItem>

					<CardItem itemWidth={6} title="Текущие проекты" raise={false}>
						{currentProjects && currentProjects.map((item, i) => <CurrentProjectItem item={item} index={i} key={i} />)}
					</CardItem>

					<CardItem itemWidth={12} itemHeight={"415px"} title="Штат управления разработки ПО">
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								mt: "-10px",
							}}>
							{team &&
								team.map((item, i) => (
									<ListItem
										key={i}
										sx={{
											p: "0px",
										}}>
										<ListItemText
											primary={
												<Fragment>
													<Typography variant="subtitle2">{item.position}</Typography>
												</Fragment>
											}
											secondary={
												<Fragment>
													<Typography variant="h7">{`${item.firstName} ${item.lastName}`}</Typography>
												</Fragment>
											}
											sx={{
												pl: "16px",
											}}
										/>
									</ListItem>
								))}
						</Box>
					</CardItem>
				</Grid>
			</div>
		</div>
	)
})
