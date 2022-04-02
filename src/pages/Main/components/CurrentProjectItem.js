import React, {useState} from "react"
import PropTypes from "prop-types"
import {
	ListItem,
	ListItemAvatar,
	ListItemText,
	ListItemButton,
	DialogContent,
	DialogContentText,
	Dialog,
	DialogTitle,
	Typography,
	Box,
} from "@mui/material"
import {createAvatar} from "../utils/createAvatar"
import {styled} from "@mui/material/styles"

const CListItemButton = styled(ListItemButton)({
	margin: "0 12px 3px -10px",
	borderRadius: "64px",
	transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

	"&:hover": {
		background: "rgba(0, 75, 135, 0.1);",
	},
})

const CDialogContentText = styled(DialogContentText)({
	color: "#000000",
	marginBottom: "18px",
})

//компонент для отрисовки окна Текущие проекты
export const CurrentProjectItem = ({item, index}) => {
	//состояние модального окна (октрыто/закрыто)
	const [open, setOpen] = useState(false)

	const descriptionArray = item.description.split("\n")

	return (
		<Box>
			<CListItemButton onClick={() => setOpen(true)}>
				<ListItemAvatar>{createAvatar(item.abbreviation, index, 32)}</ListItemAvatar>
				<ListItemText primary={item.projectName} />
			</CListItemButton>

			<Dialog
				onClose={() => setOpen(false)}
				open={open}
				fullWidth
				maxWidth={"md"}
				PaperProps={{
					style: {borderRadius: 16},
				}}>
				<DialogTitle>
					<ListItem sx={{padding: "8px 0"}}>
						<ListItemAvatar>{createAvatar(item.abbreviation, index, 32)}</ListItemAvatar>
						<Typography
							variant="h3"
							sx={{
								color: "#004D98",
							}}>
							{item.projectName}
						</Typography>
					</ListItem>
				</DialogTitle>
				<DialogContent>
					{descriptionArray && descriptionArray.map((description, i) => <CDialogContentText key={i}>{description}</CDialogContentText>)}
				</DialogContent>
			</Dialog>
		</Box>
	)
}

CurrentProjectItem.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number,
}
