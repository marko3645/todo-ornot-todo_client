/** @format */

import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ThemeManager } from "../../Theme";
import LoginBg from "../../../assets/LoginBg.jpg";
import { RegistrationForm } from "./RegistrationForm";

interface ILoginState {
	ShowingLogin;
}

const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('${LoginBg}');
    background-size: cover;
    background-position: center;
`;

const BackgroundContainer = styled.div`
	width: 100vw;
	height: 100vh;

	position: fixed;
	left: 0;
	right: 0;

	background: linear-gradient(137.17deg, rgba(66, 185, 131, 0.33) 22.24%, rgba(83, 79, 163, 0.22) 100%);
`;

const FormContainer = styled.div`
	width: 600px;

	margin-left: 14%;
	height: 100%;
	background: ${(props) => props.theme.colors.Background_Light};

	display: flex;
	flex-direction: column;

	color: ${(props) => props.theme.colors.Text_Primary};

	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);

	display: flex;
	flex-direction: column;
`;

export class Login extends React.Component {
	state: ILoginState = {
		ShowingLogin: true
	};

	render() {
		return (
			<ThemeProvider theme={ThemeManager.GetDefaultTheme()}>
				<MainContainer>
					<BackgroundContainer>
						{/* <FormContainer>
							<LoginForm />
						</FormContainer> */}
						<FormContainer>
							<RegistrationForm />
						</FormContainer>
					</BackgroundContainer>
				</MainContainer>
			</ThemeProvider>
		);
	}
}
