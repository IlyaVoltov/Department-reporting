import React, {useEffect, useRef} from "react"
import {Header} from "../../components/Header/Header"
import {ExportButton} from "../../components/Header/ExportButton"
import developmentData from "./API/development.json"
import {useDispatch, useSelector} from "react-redux"
import {addDevelopers} from "../../store/development/developmentSlice"
import {TableComponent} from "../../components/Table"
import {Typography} from "@mui/material"

/**Страница - План развития сотрудников */
export const Development = () => {
	const dispatch = useDispatch()
	const componentRef = useRef()

	//массив разработчиков
	const developers = useSelector((state) => state.development.developers)

	useEffect(() => {
		dispatch(addDevelopers(developmentData))
	}, [dispatch])

	return (
		<div ref={componentRef}>
			<Header title={"План развития сотрудников"}>
				<ExportButton componentRef={componentRef} documentTitle={"План развития сотрудников"} />
			</Header>
			{developers.length > 0 ? (
				<TableComponent
					haveIconButton={true}
					rows={developers}
					columnNames={[
						{ru: "Разработчик", en: "developer"},
						{ru: "Направление", en: "position"},
						{ru: "Работает в команде с", en: "workStartDate"},
					]}
				/>
			) : (
				<Typography variant="h3">Данные отсутствуют</Typography>
			)}
		</div>
	)
}
