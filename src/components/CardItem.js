import React from "react"
import PropTypes from "prop-types"
import {Grid, Paper, Typography} from "@mui/material"

//создание карточки для отображения информации на основной странице
export const CardItem = ({itemWidth, itemHeight, title, children, important, raise}) => {
	return (
		<Grid item xs={itemWidth} id={"pdf-content"}>
			<Paper
				sx={{
					p: "24px 0 34px 18px",
					display: "flex",
					flexDirection: "column",
					boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.05)",
					borderRadius: "16px",
					mt: raise ? "-190px" : null,
					height: itemHeight ? itemHeight : "inherit",
				}}>
				<Typography variant="h3" gutterBottom sx={{color: important ? "#CF1322" : "#1F1F1F"}}>
					{title}
				</Typography>

				{children}
			</Paper>
		</Grid>
	)
}

CardItem.propTypes = {
	itemWidth: PropTypes.number,
	title: PropTypes.string,
	children: PropTypes.node,
	important: PropTypes.bool,
	raise: PropTypes.bool,
}
