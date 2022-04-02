import React from "react"
import PropTypes from "prop-types"
import {Typography, Box} from "@mui/material"

//компонент отображает данные по отчетам
export const ReportItem = ({item}) => {
	const descriptionArray = item.description.split("\n")

	return (
		<Box sx={{pr: "24px"}}>
			<Typography variant="subtitle1" sx={{mb: "12px", mt: "12px"}} data-testid="reason">
				{item.reasonRus}
			</Typography>

			{descriptionArray &&
				descriptionArray.map((description, i) => (
					<Typography variant="h6" key={i} sx={{pb: "16px"}} data-testid="description">
						{description}
					</Typography>
				))}
		</Box>
	)
}

ReportItem.propTypes = {
	item: PropTypes.object,
}
