import React from "react"
import {Typography} from "@mui/material"
import {CardItem} from "../../../components/CardItem"

//компонент отображает контент при пустых данных
export const EmptyContainer = () => {
	const titleList = ["Входящие документы", "Черновики", "Отклоненные", "На согласовании", "Ожидают подписи"]
	return titleList.map((title, i) => (
		<CardItem itemWidth={4} itemHeight={"180px"} title={title} important={title === "Отклоненные" ? true : false} key={i}>
			<Typography variant="h6" gutterBottom sx={{mt: "18px"}}>
				Нет данных
			</Typography>
		</CardItem>
	))
}
