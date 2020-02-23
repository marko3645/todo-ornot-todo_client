/** @format */

import * as React from "react";
import { IControl } from "./Interfaces/TotControlInterfaces";

interface TotFormState extends IControl {}

export interface FormContext {
	disabled?: boolean;
}
export const FormContextProvider: React.Context<FormContext> = React.createContext({});
export class TotForm extends React.Component<TotFormState, TotFormState> {
	constructor(props: TotFormState) {
		super(props);

		this.state = { ...this.props };
	}

	render() {
		let contextValue: FormContext = {
			disabled: this.props.disabled
		};
		return (
			<FormContextProvider.Provider value={contextValue}>
				<form className={this.props.className}>{this.props.children}</form>
			</FormContextProvider.Provider>
		);
	}
}
