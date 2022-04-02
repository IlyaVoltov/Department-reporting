import React from "react"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import {Button, Grid} from "@mui/material"
import PropTypes from "prop-types"
import ReactToPrint from "react-to-print"

export const ExportButton = ({handleExport, componentRef, documentTitle}) => {
	return (
		<Grid item>
			<Button sx={{borderRadius: 64, height: 36}} variant="contained" onClick={handleExport} endIcon={<FileDownloadIcon />}>
				<ReactToPrint trigger={() => <div>Экспортировать</div>} content={() => componentRef.current} documentTitle={documentTitle} />
			</Button>
		</Grid>
	)
}

ExportButton.propTypes = {
	handleExport: PropTypes.func,
	componentRef: PropTypes.object,
}
