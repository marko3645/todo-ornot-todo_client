/** @format */

import * as React from "react";
import { IInputControl } from "./Interfaces/TotControlInterfaces";
import styled from "styled-components";

interface TotLinkState extends IInputControl {
	Href: string;
}

const StyledLink = styled.a`
	color: ${(props) => props.theme.colors.Primary};
	text-decoration-color: ${(props) => props.theme.colors.Primary};
	font-family: ${(props) => props.theme.fonts.MainFont};
`;

export class TotLink extends React.Component<TotLinkState, TotLinkState> {
	render() {
		return (
			<StyledLink href={this.props.Href} className={this.props.className}>
				{this.GetChildElement()}
			</StyledLink>
		);
	}

	private GetChildElement() {
		return this.props.children || this.props.LabelText;
	}
}
