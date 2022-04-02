import React from "react"
import {NavLink} from "react-router-dom"
import {ListItemText, ListItemIcon, List, ListItemButton} from "@mui/material"
import {styled} from "@mui/material/styles"
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic" //иконка Основные показатели
import ListAltIcon from "@mui/icons-material/ListAlt" //иконка Отчеты
import TrendingUpIcon from "@mui/icons-material/TrendingUp" //иконка План развития сотрудников

const Nav = styled(List)({
	paddingTop: "32px",
	margin: "0px 7px 0 7px",

	"& .MuiListItemButton-root": {
		marginBottom: "5px",
		borderRadius: "64px",
		padding: "10px 0px 10px 20px",
		transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

		"&.active": {
			background: "#004385",
		},

		"&:hover": {
			background: "rgba(0, 75, 135, 0.5)",
		},
	},

	"& .MuiListItemText-root .MuiTypography-root": {
		fontWeight: 600,
		fontSize: "14px",
		color: "#FFFFFF",
	},

	"& .MuiListItemIcon-root": {
		minWidth: "60px",
	},
	"& .MuiSvgIcon-root": {
		color: "#89A8C6",
	},
})

/** компонент NavList*/
export const NavList = () => {
	return (
		<Nav component="nav">
			<ListItemButton component={NavLink} to={"/main"} key="main">
				<ListItemIcon>
					<AutoAwesomeMosaicIcon />
				</ListItemIcon>
				<ListItemText primary="Основные показатели" />
			</ListItemButton>

			<ListItemButton component={NavLink} to={"/reports"} key="reports">
				<ListItemIcon>
					<ListAltIcon />
				</ListItemIcon>
				<ListItemText primary="Отчеты" />
			</ListItemButton>

			<ListItemButton component={NavLink} to={"/development"} key="development">
				<ListItemIcon>
					<TrendingUpIcon />
				</ListItemIcon>
				<ListItemText primary="План развития сотрудников" />
			</ListItemButton>
		</Nav>
	)
}
