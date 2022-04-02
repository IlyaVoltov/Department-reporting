import React, {useState} from "react"
import {styled} from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import {Box, Toolbar, Typography, IconButton} from "@mui/material"
import MenuOpenIcon from "@mui/icons-material/MenuOpen"
import MenuIcon from "@mui/icons-material/Menu"
import {NavList} from "./NavList"

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({theme, open}) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: 336,
		background: "#004D98",
		boxShadow: "inset -1px 0px 0px #004385",
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(10),
			},
		}),

		overflowX: "hidden",
	},
}))

/**компонент  SideBar*/
export const SideBar = () => {
	const [open, setOpen] = useState(true)

	/**смена состояния сайдара открыт-закрыт */
	const toggleDrawer = () => {
		setOpen(!open)
	}

	return (
		<Drawer variant="permanent" open={open}>
			<Box component="span" sx={{height: "79px", background: "#004385"}}>
				<Typography variant="h1" sx={{p: "20px"}}>
					{open ? "УР ПО" : null}
				</Typography>
			</Box>

			<NavList />

			<Toolbar
				sx={{
					display: "flex",
					justifyContent: " flex-start",
					px: [1],
					mt: "auto",
					boxShadow: "inset 0px 1px 0px #004385",
				}}>
				<IconButton onClick={toggleDrawer}>
					{open ? <MenuOpenIcon sx={{color: "#89A8C6"}} /> : <MenuIcon sx={{color: "#89A8C6"}} />}
				</IconButton>
			</Toolbar>
		</Drawer>
	)
}
