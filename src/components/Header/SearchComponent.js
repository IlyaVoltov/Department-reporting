import React from "react"
import PropTypes from "prop-types"
import {Grid, TextField} from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import {styled} from "@mui/material/styles"

export const CustomTextField = styled(TextField)(() => ({
	width: "100%",
	color: "#004D98",
	fontWeight: "400",
	fontSize: "14px",
	lineHeight: "130%",
	".css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
		borderColor: "#004D98",
		borderRadius: 64,
	},
	"&:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "#004D98",
	},
	".css-1clhqpn-MuiInputBase-root-MuiOutlinedInput-root": {
		height: 36,
		color: "#004D98",
	},
}))

export const SearchComponent = ({searchValue, handleChangeSearchValue}) => {
	return (
		<Grid item xs={4}>
			<CustomTextField
				value={searchValue}
				onChange={handleChangeSearchValue}
				InputProps={{startAdornment: <SearchIcon style={{height: 36}} color={"primary"} />}}
			/>
		</Grid>
	)
}

SearchComponent.propTypes = {
	searchValue: PropTypes.string,
	handleChangeSearchValue: PropTypes.func,
}
