import React from "react"
import PropTypes from "prop-types"
import {Grid, MenuItem, Select} from "@mui/material"
import {styled} from "@mui/material/styles"

const CustomSelect = styled(Select)(() => ({
	width: 152,
	color: "#004D98",
	borderRadius: 64,
	height: 36,
	fontWeight: "400",
	fontSize: "14px",
	lineHeight: "130%",
	".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
		borderColor: "#004D98",
	},
	"&:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "#004D98",
	},
}))

/**компонент с селектом */
export const SelectComponent = ({handleChangeValue, valueList, chosenValue, defaultValue = ""}) => {
	return (
		<Grid item>
			<CustomSelect onChange={handleChangeValue} value={chosenValue}>
				{defaultValue.length > 0 && <MenuItem value={defaultValue}>{defaultValue}</MenuItem>}
				{valueList.map((value, i) => (
					<MenuItem value={value} key={i}>
						{value}
					</MenuItem>
				))}
			</CustomSelect>
		</Grid>
	)
}

SelectComponent.propTypes = {
	handleChangeValue: PropTypes.func,
	valueList: PropTypes.array,
	chosenValue: PropTypes.string,
	defaultValue: PropTypes.string,
}
