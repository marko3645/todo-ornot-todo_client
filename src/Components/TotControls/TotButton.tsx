/** @format */

import * as React from "react";
import styled, { keyframes } from "styled-components";
import { IInputControl } from "./Interfaces/TotControlInterfaces";
import { FormContextProvider, FormContext } from "./TotForm";

interface TotButtonState extends IInputControl {
	type?: "filled" | "outlined" | "textOnly";
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	preloader?: {
		text: string;
		isLoading: boolean;
	};
}

const loadingTransition = " transition: 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55)";

const loadingKeyframes = keyframes`
	0% {
		margin-left: -60%;
		transform: skew(10deg, 10deg);
	}
	100% {
		margin-left: 60%;
		transform: skew(10deg, 10deg) ;
	}
`;

const Container = styled.div`
	height: 36px;
	display: flex;
	overflow: hidden;
`;

const Preloader = styled.div`
	border-radius: 4px;
	margin-left: -100%;
	width: 100%;
	height: 100%;
	transition: 0.2s;
	display: inline-flex;
	justify-content: center;
	align-items: center;
	font-size: 14pt;
	font-weight: bold;
	color: ${(props) => props.theme.colors.Text_Secondary};
	font-family: ${(props) => props.theme.fonts.MainFont};

	${loadingTransition};

	background: ${(props) => props.theme.colors.Primary};

	&.loading {
		margin-left: 0%;
		${loadingTransition};
		position: relative;
		&:after {
			position: absolute;
			animation: ${loadingKeyframes} 2s infinite cubic-bezier(0.81, -0.31, 0.34, 1.78);
		}
		cursor: default;
	}

	&:after {
		height: calc(100% + 10px);
		width: 20%;
		background: rgba(255, 255, 255, 0.4);
		content: " ";
	}
`;

const Button = styled.button`
	height: 100%;
	width: 100%;

	font-size: 14pt;
	font-weight: bold;

	border: none;
	cursor: pointer;

	font-family: ${(props) => props.theme.fonts.MainFont};

	border-radius: 4px;

	&.disabled {
		cursor: default;
	}

	&.filled {
		background: ${(props) => props.theme.colors.Primary};
		color: ${(props) => props.theme.colors.Text_Secondary};

		&.disabled {
			background: ${(props) => props.theme.colors.Disabled};
		}
	}

	&.outlined {
		border: 2px solid ${(props) => props.theme.colors.Primary};
		color: ${(props) => props.theme.colors.Text_Primary};
		background: transparent;

		&:hover:not(.disabled) {
			color: ${(props) => props.theme.colors.Text_Secondary};
		}

		&.disabled {
			color: ${(props) => props.theme.colors.Disabled};
			border-color: ${(props) => props.theme.colors.Disabled};
		}
	}

	&.textOnly {
		color: ${(props) => props.theme.colors.Primary};
		background: transparent;

		&.disabled {
			color: ${(props) => props.theme.colors.Disabled};
		}
	}

	&:hover:not(.disabled) {
		background: ${(props) => props.theme.colors.Primary_MediumAlpha};
		color: ${(props) => props.theme.colors.Text_Primary};

		&.filled {
			color: ${(props) => props.theme.colors.Text_Secondary};
		}
	}

	&:active {
		background: ${(props) => props.theme.colors.primary_Light};
		color: ${(props) => props.theme.colors.Text_Secondary};
	}

	${loadingTransition};
	&.loading {
		margin-right: calc(-100% - 5px);
		transition: 0.2s;
		${loadingTransition};
	}
`;

export class TotButton extends React.Component<TotButtonState, TotButtonState> {
	private BtnLoginRef: React.RefObject<HTMLButtonElement>;

	private SizableButtonContainer;

	constructor(props: TotButtonState) {
		super(props);

		this.state = { ...this.props };

		this.CreateRefs();
	}

	private CreateRefs() {
		this.BtnLoginRef = React.createRef<HTMLButtonElement>();
	}

	componentDidMount() {
		this.SetInitialState();
	}

	private SetInitialState() {}

	render() {
		return <FormContextProvider.Consumer>{(formContext: FormContext) => this.BuildComponent(formContext)}</FormContextProvider.Consumer>;
	}

	private BuildComponent(formState: FormContext) {
		return (
			<Container className={this.props.className}>
				{this.BuildPreloader()}
				{this.BuildButton(formState)}
			</Container>
		);
	}

	private BuildPreloader() {
		if (!this.props.preloader) {
			return;
		}

		let classNames = "";
		classNames += this.props.preloader.isLoading ? " loading" : "";

		return <Preloader className={classNames}>{this.props.preloader.text}</Preloader>;
	}

	private BuildButton(formState: FormContext) {
		let buttonClasses = "";
		buttonClasses += ` ${this.props.type || "filled"}`;
		buttonClasses += this.props.preloader?.isLoading ? " loading" : "" ?? "";
		buttonClasses += this.props.disabled || formState?.disabled ? " disabled" : "";

		return (
			<Button
				ref={this.BtnLoginRef}
				disabled={this.props.disabled || formState?.disabled}
				type="button"
				className={buttonClasses}
				onClick={this.props.onClick}
			>
				{this.props.children || this.props.LabelText}
			</Button>
		);
	}
}
