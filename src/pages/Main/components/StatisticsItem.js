import React from "react"
import PropTypes from "prop-types"
import {Typography, Box} from "@mui/material"
import {styled} from "@mui/material/styles"
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined"
import CommitOutlinedIcon from "@mui/icons-material/CommitOutlined"
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined"
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined"

const Container = styled(Box)({
	display: "flex",
	flexDirection: "column",
	marginTop: "20px",
	paddingRight: "74px",
})

const ContentContainer = styled(Box)({
	display: "flex",
	flexDirection: "column",
	marginTop: "20px",
})

export const StatisticsItem = ({statistics}) => {
	return (
		<>
			{statistics && (
				<ContentContainer>
					<ItemContainer containerTitle="Доски">
						<>
							<Item title="Созданные задачи" number={statistics.createdTasks}>
								<ListAltOutlinedIcon color="primary" />
							</Item>
							<Item title="Выполненые задачи" number={statistics.completedTasks} isHighlighted={true}>
								<FactCheckOutlinedIcon color="primary" />
							</Item>
						</>
					</ItemContainer>

					<Box
						sx={{
							mt: "32px",
						}}>
						<ItemContainer containerTitle="Репозитории">
							<>
								<Item title="Открытые pull requests" number={statistics.pullRequests}>
									<ShareOutlinedIcon color="primary" />
								</Item>
								<Box
									sx={{
										ml: "-25px",
									}}>
									<Item title="Commits" number={statistics.commits}>
										<CommitOutlinedIcon color="primary" sx={{transform: "rotate(90deg)"}} />
									</Item>
								</Box>
							</>
						</ItemContainer>
					</Box>
				</ContentContainer>
			)}
		</>
	)
}

const ItemContainer = ({containerTitle, children}) => {
	return (
		<>
			<Typography variant="subtitle1">{containerTitle}</Typography>
			<Box
				sx={{
					display: "flex",
				}}>
				{children}
			</Box>
		</>
	)
}

const Item = ({title, number, children, isHighlighted}) => {
	return (
		<Container>
			<Box sx={{display: "flex"}}>
				{children}

				<Typography
					variant="h2"
					gutterBottom
					sx={{
						color: !isHighlighted ? "#004D98" : "#5B8C00",
						pl: "12px",
						mt: "-2px",
					}}>
					{number ? number : "-"}
				</Typography>
			</Box>

			<Typography variant="h6">{title}</Typography>
		</Container>
	)
}

StatisticsItem.propTypes = {
	statistics: PropTypes.object,
}
ItemContainer.propTypes = {
	containerTitle: PropTypes.string,
	children: PropTypes.node,
}
Item.propTypes = {
	title: PropTypes.string,
	number: PropTypes.number,

	isHighlighted: PropTypes.bool,
}
