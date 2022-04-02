import React from "react"
import {Avatar} from "@mui/material"

/**функция создает аватар */
export const createAvatar = (letter, index, size) => {
	let color = ["#004D98", "#5B8C00", "#FADB14", "#CF1322", "#531DAB", "#FA541C"]

	let currentColor = index % color.length

	return <Avatar sx={{bgcolor: color[currentColor], height: size, width: size, fontSize: "14px", fontWeight: "600"}}>{letter}</Avatar>
}
