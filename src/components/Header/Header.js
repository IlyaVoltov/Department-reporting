import React from "react"
import PropTypes from "prop-types"
import {Grid, Typography} from "@mui/material"

/** заголовок страница и фильтры */
export const Header = ({title, children}) => {
	return (
		<div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 30}}>
			<Typography variant={"h2"}>{title}</Typography>
			<Grid
				container
				justifyContent={"flex-end"}
				alignItems={"center"}
				spacing={2}
				id={"pdf-no-content"}
				// style={{width: "calc(100% - 400px)"}}
			>
				{children}
			</Grid>
		</div>
	)
}

Header.propTypes = {
	title: PropTypes.string,
	handleExport: PropTypes.func,
	children: PropTypes.node,
}
