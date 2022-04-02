import React from "react"
import {theme} from "./Theme"
import {ThemeProvider} from "@mui/material/styles"
import {Box, CssBaseline} from "@mui/material"
import {SideBar} from "./components/SideBar"
import {ContentContainer} from "./components/ContentContainer"
import {Navigate, Route, Routes} from "react-router-dom"
import {Main} from "./pages/Main/Main"
import {Reports} from "./pages/Reports/Reports"
import {Development} from "./pages/Development/Development"
import {Developer} from "./pages/Developer/Developer"

/**компонент  App*/
export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{display: "flex"}}>
				<CssBaseline />

				<SideBar />

				<ContentContainer>
					<Routes>
						<Route exact path={"/"} element={<Navigate to={"/main"} />} />

						<Route path={"/main"} element={<Main />} />

						<Route path={"/reports"} element={<Reports />} />

						<Route path={"/development"} element={<Development />} />

						<Route path={"/developer/:guid"} element={<Developer />} />
					</Routes>
				</ContentContainer>
			</Box>
		</ThemeProvider>
	)
}
