import React from "react"
import {styled} from "@mui/material/styles"
import TableCell, {tableCellClasses} from "@mui/material/TableCell"
import {
	Box,
	IconButton,
	Link,
	Paper,
	Table,
	TableBody,
	TableContainer,
	TableFooter,
	TableHead,
	TablePagination,
	TableRow,
	useTheme,
} from "@mui/material"
import LastPageIcon from "@mui/icons-material/LastPage"
import FirstPageIcon from "@mui/icons-material/FirstPage"
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft"
import PropTypes from "prop-types"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import {useNavigate} from "react-router-dom"

export const StyledTableCell = styled(TableCell)(({theme}) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.white,
		color: "#253858",
		fontWeight: 600,
	},
	[`&.${tableCellClasses.body}`]: {
		color: "#253858",
	},
}))

const StyledTablePagination = styled(TablePagination)(() => ({
	".css-i4bv87-MuiSvgIcon-root": {
		color: "#253858",
	},
	backgroundColor: "white",
	color: "#253858",
}))

/**настройка пагинации таблицы */
function TablePaginationActions(props) {
	const theme = useTheme()
	const {count, page, rowsPerPage, onPageChange} = props

	/**клик по кнопке по возвращению на 1-ю страницу */
	const handleFirstPageButtonClick = (event) => {
		onPageChange(event, 0)
	}

	/**клик по кнопке по возвращению на предыдущую страницу */
	const handleBackButtonClick = (event) => {
		onPageChange(event, page - 1)
	}

	/**клик по кнопке по возвращению на следущую страницу */
	const handleNextButtonClick = (event) => {
		onPageChange(event, page + 1)
	}

	/**клик по кнопке по возвращению на последнюю страницу */
	const handleLastPageButtonClick = (event) => {
		onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
	}

	return (
		<Box sx={{flexShrink: 0, ml: 2.5}}>
			<IconButton onClick={handleFirstPageButtonClick} disabled={page === 0} aria-label="first page">
				{theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
			</IconButton>
			<IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
				{theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
			</IconButton>
			<IconButton onClick={handleNextButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="next page">
				{theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
			</IconButton>
			<IconButton onClick={handleLastPageButtonClick} disabled={page >= Math.ceil(count / rowsPerPage) - 1} aria-label="last page">
				{theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
			</IconButton>
		</Box>
	)
}

TablePaginationActions.propTypes = {
	count: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	page: PropTypes.number.isRequired,
	rowsPerPage: PropTypes.number.isRequired,
}

/**компонент таблицы */
export const TableComponent = ({rows, columnNames, haveIconButton = false}) => {
	const navigate = useNavigate()
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(5)

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

	/**мена страницы */
	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	/**изменение кол-ва строк в таблице на странице */
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	//отображение какие страницы отображаются в текущий момент
	function defaultLabelDisplayedRows({from, to, count}) {
		return `${from}–${to} из ${count !== -1 ? count : `более чем ${to}`}`
	}

	return (
		<TableContainer component={Paper} sx={{borderRadius: 4}}>
			<Table aria-label="collapsible table" stickyHeader>
				<TableHead style={{backgroundColor: "white"}}>
					<TableRow>
						{columnNames.map((name) =>
							name.en === "developer" ? (
								<StyledTableCell colSpan={2} key={name.en}>
									{name.ru}
								</StyledTableCell>
							) : (
								<StyledTableCell colSpan={1} key={name.en}>
									{name.ru}
								</StyledTableCell>
							)
						)}
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0 ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : rows).map((row) => (
						<TableRow key={row.guid} aria-label={"table-row"}>
							{haveIconButton && (
								<StyledTableCell component="th" scope="row" sx={{width: 40}}>
									<IconButton
										color={"primary"}
										onClick={() => navigate({pathname: `/developer/:${row.guid}`})}
										aria-label={`go-to-page-${row.guid}`}>
										<OpenInNewIcon />
									</IconButton>
								</StyledTableCell>
							)}
							{columnNames.map((name) =>
								name.en === "linkToProject" ? (
									<StyledTableCell component="th" scope="row" key={name.en}>
										<Link underline="hover" color="inherit" href={row[`${name.en}`]}>
											{row[`${name.en}`]}
										</Link>
									</StyledTableCell>
								) : (
									<StyledTableCell component="th" scope="row" key={name.en}>
										{row[`${name.en}`]}
									</StyledTableCell>
								)
							)}
						</TableRow>
					))}
					{emptyRows > 0 && (
						<TableRow style={{height: 53 * emptyRows}}>
							<TableCell colSpan={4} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<StyledTablePagination
							rowsPerPageOptions={[5, 10, 25, {label: "All", value: -1}]}
							colSpan={4}
							count={rows.length}
							rowsPerPage={rowsPerPage}
							page={page}
							SelectProps={{
								inputProps: {
									"aria-label": "rows per page",
								},
								native: true,
							}}
							labelRowsPerPage={"Строк на странице"}
							labelDisplayedRows={defaultLabelDisplayedRows}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	)
}

TableComponent.propTypes = {
	rows: PropTypes.array,
	columnNames: PropTypes.array,
	haveIconButton: PropTypes.bool,
}
