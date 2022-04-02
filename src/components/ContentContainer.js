import React from "react"
import {Box, Container} from "@mui/material"
import PropTypes from "prop-types"

/**компонент  ContentContainer*/
export const ContentContainer = ({children}) => {
	return (
		<Box
			component="main"
			sx={{
				flexGrow: 1,
				height: "100vh",
				overflow: "auto",
			}}>
			<Container maxWidth={false} sx={{pt: "55px", pl: "45px !important", m: 0}}>
				{/**ТУТ КОНТЕНТ */}
				{children}
			</Container>
		</Box>
	)
}

ContentContainer.propTypes = {
	children: PropTypes.node,
}
