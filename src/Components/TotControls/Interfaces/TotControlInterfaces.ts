/** @format */

export interface IControl {
	className?: string;
	disabled?: boolean;
	key?: any;
	name?: string;
}

export interface IInputControl extends IControl {
	LabelText?: string;
	HasFocus?: boolean;
	ErrorText?: string;
}
