/** @format */

export interface IValidatorBase {
	GetValueFunction: () => any;
	ErrorText?: string;
	Key?: string;
	IsInvalid?:boolean;
}

export interface IValidator extends IValidatorBase {
	Validate: (value: any) => boolean;
}

export interface IAsyncValidator extends IValidatorBase {
	ValidateAsync: (value: any) => Promise<boolean>;
}

export class ValidationService {
	public Validators: IValidator[] = [];
	public AsyncValidatos: IAsyncValidator[] = [];

	public Error: ErrorTextProvider;

	constructor(validators: IValidator[], asyncValidators: IAsyncValidator[]) {
		this.Validators = validators;
		this.AsyncValidatos = asyncValidators;
		this.Error = new ErrorTextProvider(this);
	}

	public RunNormalValidators(key?: string): boolean {
		let isValid = true;

		let validatorsToRun = !key ? this.Validators : (this.GetValidatorsToRun(key, this.Validators) as IValidator[]);

		validatorsToRun.forEach((validator: IValidator) => {
			let value = validator.GetValueFunction();
			let isValidatorValid = validator.Validate(value);
			validator.IsInvalid = !isValidatorValid;

			if(!isValidatorValid){
				isValid = false;
			}

		});
		return isValid;
	}

	public async RunAsyncValidators(key?: string): Promise<boolean> {
		let isValid = true;

		let validatorsToRun: IAsyncValidator[] = !key ? this.AsyncValidatos : (this.GetValidatorsToRun(key, this.AsyncValidatos) as IAsyncValidator[]);

		for (let i = 0; i < validatorsToRun.length; i++) {
			let validator = validatorsToRun[i];
			let value = validator.GetValueFunction();
			let isValidatorValid = await validator.ValidateAsync(value);
			validator.IsInvalid = !(await validator.ValidateAsync(value));

			if(!isValidatorValid){
				isValid = false;
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
				
		let invalidValidators: IValidatorBase[] = this._validationService.Validators.filter(this.GetValidityFilterFunction());
		invalidValidators.push(...this._validationService.AsyncValidatos.filter(this.GetValidityFilterFunction()));

		let errorTexts = this.GetErrorTexts(invalidValidators, includeEmptyErrorStrings, key);

		return errorTexts;
	}

	public Normal(key?: string, includeEmptyErrorStrings: boolean = false): string[] {
		return this.GetErrorTexts(this._validationService.Validators.filter(this.GetValidityFilterFunction()), includeEmptyErrorStrings, key);
	}

	public Async(key?: string, includeEmptyErrorStrings: boolean = false): string[] {
		return this.GetErrorTexts(this._validationService.AsyncValidatos.filter(this.GetValidityFilterFunction()), includeEmptyErrorStrings, key);
	}

	private GetErrorTexts(validators: IValidatorBase[], includeEmptyErrorStrings: boolean, key?: string) {
		let filterFunction = this.GetKeyFilterFunction(includeEmptyErrorStrings, key);

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

	private GetKeyFilterFunction(includeEmptyErrorStrings: boolean, key?: string) {
		return (validator: IValidatorBase) => {
			return (validator.Key == key || !key) && (includeEmptyErrorStrings || validator.ErrorText);
		};
	}

	private GetValidityFilterFunction(){
		return (validator:IValidatorBase) => validator.IsInvalid;
	}
}
