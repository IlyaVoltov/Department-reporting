import React from "react"
import PropTypes from "prop-types"
import {Typography, Box} from "@mui/material"
import {styled} from "@mui/material/styles"

const DataItem = styled(Box)({
	display: "flex",
	flexDirection: "column",
	borderRight: "1px solid #CFCFCF",
	marginTop: "20px",
	paddingRight: "30px",
	paddingLeft: "15px",
	"&:last-child": {
		borderRight: "none",
	},
	"&:nth-of-type(1)": {
		paddingLeft: "0px",
	},
})

//компонент отображает данные по документам
export const DocumentsItem = ({item, important}) => {
	return (
		<Box
			sx={{
				display: "flex",
			}}>
			{item.length > 0 ? (
				item.map((a, i) => (
					<DataItem key={i}>
						<Typography
							variant="h2"
							gutterBottom
							sx={{
								color: important && (a.title === "Всего" || a.title === "Новые") ? "#CF1322" : "#004D98",
							}}>
							{a.number ? a.number : "Нет данных"}
						</Typography>
						<Typography variant="h6" gutterBottom>
							{a.title}
						</Typography>
					</DataItem>
				))
			) : (
				<DataItem>
					<Typography variant="h6" gutterBottom>
						Нет данных
					</Typography>
				</DataItem>
			)}
		</Box>
	)
}

DocumentsItem.propTypes = {
	item: PropTypes.array,
	important: PropTypes.bool,
}
