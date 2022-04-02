import React, {Fragment, useState} from "react"
import PropTypes from "prop-types"
import {Stack, IconButton, DialogContent, Dialog, DialogTitle, ListItem, ListItemText, Typography, Box} from "@mui/material"
import {createAvatar} from "../utils/createAvatar"
import {styled} from "@mui/material/styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const Title = styled(DialogTitle)({
	fontWeight: "600",
	fontSize: "20px",
	lineHeight: "32px",
	color: "#1F1F1F",
	letterSpacing: "0.15px",
	padding: "29px 16px 16px 38px",
})

const CBox = styled(Box)({
	display: "flex",
	alignItems: "center",
	margin: "-56px 0px 56px 56px",
})

const CIconButton = styled(IconButton)({
	marginLeft: "2px",
	"&:hover": {
		background: "rgba(0, 75, 135, 0.1);",
	},
})

//компонент для отрисовки окна Состав управления
export const TeamItem = ({team}) => {
	return (
		<>
			<Stack direction="row" spacing={1}>
				{team && team.map((item, i) => <TeamItemAvatarContent item={item} index={i} key={i} />)}
			</Stack>

			<ExpandBttn team={team} />
		</>
	)
}

//компонент для отрисовки аватара
const TeamItemAvatarContent = ({item, index}) => {
	let avatarName = `${item.firstName[0]}${item.lastName[0]}`

	return createAvatar(avatarName, index, 42)
}

//компонент для отрисовки кнопки, открывающей окно с инфо
const ExpandBttn = ({team}) => {
	//состояние модального окна (октрыто/закрыто)
	const [open, setOpen] = useState(false)

	return (
		<>
			<CBox sx={{}}>
				<Typography
					variant="h2"
					sx={{
						color: "#004D98",
					}}>
					{team.length ? team.length : null}
				</Typography>
				<CIconButton onClick={() => setOpen(true)}>
					<ExpandMoreIcon />
				</CIconButton>
			</CBox>

			<Dialog
				onClose={() => setOpen(false)}
				open={open}
				fullWidth
				maxWidth={"xs"}
				PaperProps={{
					style: {borderRadius: 16},
				}}>
				<Title>Штат управления разработки ПО</Title>
				<DialogContent>
					{team &&
						team.map((item, i) => (
							<ListItem key={i}>
								<TeamItemAvatarContent item={item} index={i} />
								<ListItemText
									primary={
										<Fragment>
											<Typography variant="subtitle2">{item.position}</Typography>
										</Fragment>
									}
									secondary={
										<Fragment>
											<Typography variant="h7">{`${item.firstName} ${item.lastName}`}</Typography>
										</Fragment>
									}
									sx={{
										pl: "16px",
									}}
								/>
							</ListItem>
						))}
				</DialogContent>
			</Dialog>
		</>
	)
}

TeamItem.propTypes = {
	team: PropTypes.array,
}

ExpandBttn.propTypes = {
	team: PropTypes.array,
}

TeamItemAvatarContent.propTypes = {
	item: PropTypes.object,
	index: PropTypes.number,
}
