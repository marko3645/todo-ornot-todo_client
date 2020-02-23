/** @format */

export interface IValidatorBase {
	GetValueFunction: () => any;
	ErrorText?: string;
	Key?: string;
}

export interface IValidator extends IValidatorBase {
	Validate: (value: any) => boolean;
}

export interface IAsyncValidator extends IValidatorBase {
	ValidateAsync: (value: any) => Promise<boolean>;
}

export class ValidationService {
	private _validators: IValidator[] = [];
	private _asyncValidatos: IAsyncValidator[] = [];

	public InvalidValidators: IValidator[] = [];
	public InvalidAsyncValidators: IAsyncValidator[] = [];

	public ValidValidators: IValidator[] = [];
	public ValidAsyncValidators: IAsyncValidator[] = [];

	public Error: ErrorTextProvider;

	constructor(validators: IValidator[], asyncValidators: IAsyncValidator[]) {
		this._validators = validators;
		this._asyncValidatos = asyncValidators;
		this.Error = new ErrorTextProvider(this);
	}

	public RunNormalValidators(key?: string): boolean {
		let isValid = true;
		this.InvalidValidators = [];
		this.ValidValidators = [];

		let validatorsToRun = !key ? this._validators : (this.GetValidatorsToRun(key, this._validators) as IValidator[]);

		validatorsToRun.forEach((validator: IValidator) => {
			let value = validator.GetValueFunction();
			if (!validator.Validate(value)) {
				isValid = false;
				this.InvalidValidators.push(validator);
			} else {
				this.ValidValidators.push(validator);
			}
		});
		return isValid;
	}

	public async RunAsyncValidators(key?: string): Promise<boolean> {
		let isValid = true;

		this.InvalidAsyncValidators = [];
		this.ValidAsyncValidators = [];

		let validatorsToRun: IAsyncValidator[] = !key ? this._asyncValidatos : (this.GetValidatorsToRun(key, this._asyncValidatos) as IAsyncValidator[]);

		for (let i = 0; i < validatorsToRun.length; i++) {
			let validator = validatorsToRun[i];
			let value = validator.GetValueFunction();
			let isValidatorValid = await validator.ValidateAsync(value);
			if (isValidatorValid) {
				this.ValidAsyncValidators.push(validator);
			} else {
				isValid = false;
				this.InvalidAsyncValidators.push(validator);
			}
		}
		return isValid;
	}

	private GetValidatorsToRun(key: string, sample: IValidatorBase[]) {
		return sample.filter((validator) => validator.Key == key);
	}

	public async RunAllValidators(key?: string): Promise<boolean> {
		let isNormalValid = this.RunNormalValidators(key);

		let isAsyncValid = await this.RunAsyncValidators(key);

		return isNormalValid && isAsyncValid;
	}
}

export class ErrorTextProvider {
	private _validationService: ValidationService;

	constructor(validationService) {
		this._validationService = validationService;
	}

	public AllTop(key?: string, includeEmptyErrorStrings: boolean = false) {
		return this.All(key, includeEmptyErrorStrings)[0];
	}

	public All(key?: string, includeEmptyErrorStrings: boolean = false): string[] {
		let invalidValidators: IValidatorBase[] = this._validationService.InvalidValidators;
		invalidValidators.push(...this._validationService.InvalidAsyncValidators);

		let errorTexts = this.GetErrorTexts(invalidValidators, includeEmptyErrorStrings, key);

		return errorTexts;
	}

	public Normal(key?: string, includeEmptyErrorStrings: boolean = false): string[] {
		return this.GetErrorTexts(this._validationService.InvalidValidators, includeEmptyErrorStrings, key);
	}

	public Async(key?: string, includeEmptyErrorStrings: boolean = false): string[] {
		return this.GetErrorTexts(this._validationService.InvalidAsyncValidators, includeEmptyErrorStrings, key);
	}

	private GetErrorTexts(validators: IValidatorBase[], includeEmptyErrorStrings: boolean, key?: string) {
		let filterFunction = this.GetFilterFunction(includeEmptyErrorStrings, key);

		let filteredValidators = validators.filter(filterFunction);

		this.SortValidators(filteredValidators);

		let mappedErrorTexts = filteredValidators.map((validator) => validator.ErrorText);
		return mappedErrorTexts;
	}

	private SortValidators(validators: IValidatorBase[]) {
		return validators.sort((a, b) => {
			if (a.Key < b.Key) {
				return -1;
			} else if (a.Key > b.Key) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	private GetFilterFunction(includeEmptyErrorStrings: boolean, key?: string) {
		return (validator: IValidatorBase) => {
			return (validator.Key == key || !key) && (includeEmptyErrorStrings || validator.ErrorText);
		};
	}
}
