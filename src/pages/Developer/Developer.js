import React, {useEffect, useRef} from "react"
import {useLocation} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux"
import {addDevelopers, findDeveloper} from "../../store/development/developmentSlice"
import developmentData from "../Development/API/development.json"
import {Header} from "../../components/Header/Header"
import {ExportButton} from "../../components/Header/ExportButton"
import {TableComponent} from "../../components/Table"
import {Breadcrumbs, Link, Stack, Typography} from "@mui/material"
import NavigateNextIcon from "@mui/icons-material/NavigateNext"

/**страница разработчика */
export const Developer = () => {
	const location = useLocation()
	const dispatch = useDispatch()
	const componentRef = useRef()

	//массив разработчиков
	const developers = useSelector((state) => state.development.developers)

	//объект с информации о разработчике
	const developer = useSelector((state) => state.development.developer)

	useEffect(() => {
		if (developers.length === 0) {
			dispatch(addDevelopers(developmentData))
		}
		dispatch(findDeveloper(location.pathname.replace("/developer/:", "")))
	}, [developers, dispatch, location.pathname])

	return (
		<>
			{developer.guid && (
				<div ref={componentRef}>
					<Stack spacing={2}>
						<Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
							<Link underline="hover" color="#42526E" href={"/development"} style={{fontSize: 16, lineHeight: "24px"}}>
								План развития сотрудников
							</Link>
							<Typography color="#253858" style={{fontSize: 16, lineHeight: "24px"}}>
								{developer.developer}
							</Typography>
						</Breadcrumbs>
					</Stack>
					<Header title={`${developer.position} - ${developer.developer}`}>
						<ExportButton componentRef={componentRef} documentTitle={"План развития сотрудника"} />
					</Header>
					<TableComponent
						rows={developer.info}
						columnNames={[
							{ru: "период", en: "stage"},
							{ru: "Направление", en: "position"},
							{
								ru: "Действия",
								en: "actions",
							},
							{ru: "Обсуждение с lead (применение в проектах)", en: "linkToProject"},
						]}
					/>
				</div>
			)}
		</>
	)
}
