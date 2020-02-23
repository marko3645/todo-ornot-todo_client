/** @format */

import * as React from "react";
import styled from "styled-components";
import { TotButton, TotLink, TotTextbox, TotForm } from "../../TotControls";
import GoogleLogo from "../../../assets/GoogleLogo.jsx";
import { AjaxUtils } from "../../../Utils/AjaxUtils";

interface LoginFormState {
	isLogginIn?: boolean;
}

const HeadingContainer = styled.div`
	margin-left: auto;
	margin-right: auto;
	margin-top: 70px;
	margin-bottom: 70px;

	& > .TotHeading__Container {
		font-weight: bold;
		font-size: 80px;
		display: flex;
		font-family: "Roboto", sans-serif;

		> span {
			margin: 0px 2px;
		}

		.TotHeading__Bar {
			width: 7px;
			height: 90px;
			margin-top: auto;
			margin-bottom: auto;

			&_Left {
				background: ${(props) => props.theme.colors.Primary};
			}

			&_Right {
				background: ${(props) => props.theme.colors.Secondary};
			}
		}
	}
	.TotHeading__Text {
		color: ${(props) => props.theme.colors.Text_Primary};
		font-family: "Roboto", sans-serif;

		&_Top {
			transform: translateX(-25%);
		}

		&_Bottom {
			transform: translateX(65%);
		}
	}
`;

const Form = styled(TotForm)`
	width: 90%;
	margin-left: auto;
	margin-right: auto;
	display: flex;
	flex-direction: column;
`;

const StyledTextbox = styled(TotTextbox)`
	> input {
		font-size: 14pt;
	}
`;

const TxtUsername = styled(StyledTextbox)`
	margin-bottom: 45px;
`;

const TxtPassword = styled(StyledTextbox)`
	margin-bottom: 5px;
`;

const ForgotPasswordLink = styled(TotLink)`
	margin-left: auto;
`;

const LoginActionContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 30px;

	& span {
		display: inline-flex;
		align-items: center;
		font-family: "Roboto", sans-serif;
		font-weight: bold;
		color: ${(props) => props.theme.colors.Text_Primary};
	}
`;

const BtnLogin = styled(TotButton)`
	width: 100px;
	transition: 0.2s;
`;

const SignUpButtonContainer = styled.div`
	display: flex;

	& > div {
		margin-right: auto;
		margin-left: 5px;
	}
	& > span {
		margin-left: auto;
		display: inline-flex;
		align-items: center;
		margin-right: 5px;
		font-family: "Roboto", sans-serif;
	}
`;

const BottomFormSeparator = styled.div`
	height: 2px;
	background: ${(props) => props.theme.colors.Border_Primary};
	margin: 50px 0px;
	margin-bottom: 5px;
`;

const GoogleLogoContainer = styled(TotButton)`
	width: 130px;
	margin-left: auto;
	> button {
		display: inline-flex;
		align-items: center;
		justify-content: space-evenly;
	}
`;

const GoogleGLogo = styled(GoogleLogo)`
	height: 24px;
`;

export class LoginForm extends React.Component<LoginFormState, LoginFormState> {
	constructor(props) {
		super(props);
		this.OnLoginClick = this.OnLoginClick.bind(this);
		this.state = { ...this.props };
	}

	render() {
		return (
			<React.Fragment>
				<HeadingContainer>
					<div className="TotHeading__Text_Top TotHeading__Text">Welcome to</div>
					<div className="TotHeading__Container">
						<div className="TotHeading__Bar_Left TotHeading__Bar"></div>
						<span>TOT</span>
						<div className="TotHeading__Bar_Right TotHeading__Bar"></div>
					</div>
					<div className="TotHeading__Text_Bottom TotHeading__Text">todo or not todo</div>
				</HeadingContainer>
				<Form disabled={this.state.isLogginIn}>
					<TxtUsername LabelText="Email" />
					<TxtPassword LabelText="Password" Type="password" />
					<ForgotPasswordLink Href="" LabelText="Forgot Password?" />
					<LoginActionContainer>
						{this.BuildLoginButton()}
						<SignUpButtonContainer>
							<span>Don't have an account yet?</span>
							<TotButton type="outlined" LabelText="SIGN UP" />
						</SignUpButtonContainer>
					</LoginActionContainer>
					<BottomFormSeparator />
					<GoogleLogoContainer type={"outlined"}>
						{/* <span>Sign in with</span> */}
						<GoogleGLogo />
						Google
						{/* <span>oogle</span> */}
					</GoogleLogoContainer>
				</Form>
			</React.Fragment>
		);
	}

	//Build methods
	private BuildLoginButton() {
		let preloader = {
			isLoading: this.state.isLogginIn,
			text: "LoggingIn..."
		};

		return <BtnLogin LabelText="LOGIN" onClick={this.OnLoginClick} preloader={preloader} />;
	}

	//Event handlers

	private async OnLoginClick() {
		this.setState({
			isLogginIn: true
		});

		AjaxUtils.Post({
			EdnPoint: "api/users/login",
			Data: {
				Username: "Makro",
				Password: "Coetzee"
			}
		})
			.catch((err) => {})
			.then((value) => {});
	}
}
