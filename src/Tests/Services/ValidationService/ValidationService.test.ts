/** @format */
import { ValidationService } from "../../../Services/ValidationService/ValidationService";
import { IValidator, IAsyncValidator } from "@services/ValidationService";

describe("ValidationService Tests", () => {
	let testValue: string;
	let testedValue: string;
	let errorText: string = "Invalid value";
	let validationService: ValidationService;
	let validators: IValidator[];
	let asyncValidators: IAsyncValidator[];
	let validatorKey: string = "1";
	let asyncValidatorKey: string = "2";
	beforeEach(() => {
		testValue = "Test value";
		testedValue = testValue;
		PopulateValidators();
		PopulateAsyncValidators();
		validationService = new ValidationService(validators, asyncValidators);

		function PopulateValidators() {
			validators = [
				{
					GetValueFunction: () => {
						return testValue;
					},
					Validate: (value: string) => {
						return value == testedValue;
					},
					ErrorText: errorText,
					Key: validatorKey
				}
			];
		}

		function PopulateAsyncValidators() {
			asyncValidators = [
				{
					GetValueFunction: () => {
						return testValue;
					},
					ValidateAsync: async (value) => {
						return value === testedValue;
					},
					ErrorText: errorText,
					Key: asyncValidatorKey
				}
			];
		}
	});

	//Constructor
	test("Error text provider gets created successfully", () => {
		expect(validationService.Error).toBeTruthy();
	});

	//Normal validators
	test("Run Normal Validators returns truthy validity with correct values", () => {
		expect(validationService.RunNormalValidators()).toBeTruthy();
		expect(validationService.ValidValidators.length).toBe(1);
		expect(validationService.InvalidValidators.length).toBe(0);
	});

	test("Run Normal Validators returns falsey validity with incorrect values", () => {
		testedValue = "no";
		let isValid = validationService.RunNormalValidators();
		expect(isValid).toBeFalsy();
		expect(validationService.ValidValidators.length).toBe(0);
		expect(validationService.InvalidValidators.length).toBe(1);
	});

	test("Normal validators runs only validators with given key", () => {
		testedValue = "no";
		validators.push({
			GetValueFunction: () => {
				return;
			},
			Validate: (value: string) => {
				return false;
			},
			ErrorText: "dd",
			Key: "2"
		});

		validationService = new ValidationService(validators, asyncValidators);
		validationService.RunNormalValidators("2");
		expect(validationService.Error.Normal.length).toBe(1);
	});

	//Async validators
	test("Run async validators returns truthy validity with correct values", async () => {
		let isValid = await validationService.RunAsyncValidators();
		expect(isValid).toBeTruthy();
		expect(validationService.ValidAsyncValidators.length).toBe(1);
		expect(validationService.InvalidAsyncValidators.length).toBe(0);
	});

	test("Run async validators returns falsey validity with incorrect values", async () => {
		testedValue = "no";
		let isValid = await validationService.RunAsyncValidators();
		expect(isValid).toBeFalsy();
		expect(validationService.ValidAsyncValidators.length).toBe(0);
		expect(validationService.InvalidAsyncValidators.length).toBe(1);
	});

	test("Async validators runs only validators with given key", () => {
		testedValue = "no";
		asyncValidators.push({
			GetValueFunction: () => {
				return;
			},
			ValidateAsync: async (value: string) => {
				return false;
			},
			ErrorText: "dd",
			Key: "2"
		});

		validationService = new ValidationService(validators, asyncValidators);
		validationService.RunAsyncValidators("2");
		expect(validationService.Error.Async.length).toBe(1);
	});

	//Test run all validators
	test("Run all validators returns truthy with correct values", async () => {
		let isvalid = await validationService.RunAllValidators();
		expect(isvalid).toBeTruthy();
	});

	test("Run all validators returns falsey with incorrect values", async () => {
		testedValue = "no";
		let isvalid = await validationService.RunAllValidators();
		expect(isvalid).toBeFalsy();
	});

	//Error text provider

	test("Invalid validator has correct error message", () => {
		testedValue = "no";
		validationService.RunNormalValidators();
		let errors: string[] = validationService.Error.Normal(validatorKey);
		expect(errors[0]).toBe(errorText);
	});

	test("Invalid async validator has correct error message", async () => {
		testedValue = "no";
		await validationService.RunAsyncValidators();
		let errors: string[] = validationService.Error.Async(asyncValidatorKey);
		expect(errors[0]).toBe(errorText);
	});

	test("AllTop get the first error message", () => {
		testedValue = "no";
		validators.push({
			GetValueFunction: () => {
				return;
			},
			Validate: (value: string) => {
				return false;
			},
			ErrorText: "dd",
			Key: "0"
		});

		validationService = new ValidationService(validators, asyncValidators);
		validationService.RunNormalValidators();
		let receivedErrorText: string = validationService.Error.AllTop();
		expect(receivedErrorText).toBe("dd");
	});

	test("all gets all invalid values", async () => {
		testedValue = "no";
		await validationService.RunAllValidators();
		let receivedErrors = validationService.Error.All();
		expect(receivedErrors.length).toBe(2);
	});

	test("error text gets sorted to have the first added value to be first in the error array on same key values", () => {
		testedValue = "no";
		validators.push({
			GetValueFunction: () => {
				return;
			},
			Validate: (value: string) => {
				return false;
			},
			ErrorText: "dd",
			Key: "1"
		});
		validationService.RunNormalValidators("1");
		expect(validationService.Error.Normal()[0]).toBe(errorText);
	});

	test("IncludeEmptyErrorStrings includes empty error strings when true", () => {
		validators = [
			{
				GetValueFunction: () => {
					return;
				},
				Validate: (value: string) => {
					return false;
				},
				ErrorText: "",
				Key: "3"
			}
		];

		validationService = new ValidationService(validators, asyncValidators);
		validationService.RunNormalValidators();
		let errorTexts = validationService.Error.Normal(null, true);
		expect(errorTexts.length).toBe(1);
	});

	test("IncludeEmptyErrorStrings does not include empty error strings when false", () => {
		validators = [
			{
				GetValueFunction: () => {
					return;
				},
				Validate: (value: string) => {
					return false;
				},
				ErrorText: "",
				Key: "3"
			}
		];

		validationService = new ValidationService(validators, asyncValidators);
		validationService.RunNormalValidators();
		let errorTexts = validationService.Error.Normal(null, false);
		expect(errorTexts.length).toBe(0);
	});
});
