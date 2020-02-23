/** @format */
import { IValidator, IAsyncValidator, ValidationService } from "./ValidationService";
export class ValidationServiceBuilder {
	private _validators: IValidator[];
	private _asyncValidators: IAsyncValidator[];

	constructor() {
		this._validators = [];
		this._asyncValidators = [];
	}

	public Build(): ValidationService {
		return new ValidationService(this._validators, this._asyncValidators);
	}

	public AddValidator(validator: IValidator) {
		this._validators.push(validator);
		return this;
	}

	public AddAsyncValidator(validator: IAsyncValidator) {
		this._asyncValidators.push(validator);
		return this;
	}

	public NotEmpty(getValueFunction: () => string | number | boolean, key?: string): ValidationServiceBuilder {
		let validator: IValidator = {
			GetValueFunction: getValueFunction,
			Validate: (value) => {
				switch (typeof value) {
					case "string": {
						return !!value;
					}
					case "number": {
						return true;
					}
					case "boolean": {
						return value;
					}
					default: {
						return false;
					}
				}
			},
			ErrorText: "Please fill this field",
			Key: key
		};

		this._validators.push(validator);
		return this;
	}
}
