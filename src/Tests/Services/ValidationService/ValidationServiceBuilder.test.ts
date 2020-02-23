/** @format */
import { ValidationServiceBuilder, IValidator, IAsyncValidator } from "../../../Services/ValidationService";

describe("ValidationServiceBuilder tests", () => {
	let validationServiceBuilder: ValidationServiceBuilder;
	beforeEach(() => {
		validationServiceBuilder = new ValidationServiceBuilder();
	});

	describe("General tests", () => {
		test("AddValidator adds validator correctly", () => {
			let validator: IValidator = {
				GetValueFunction: () => "1",
				Validate: (value) => false
			};

			let validationService = validationServiceBuilder.AddValidator(validator).Build();
			let isValid = validationService.RunNormalValidators();
			expect(isValid).toBeFalsy();
		});

		test("AddAsyncValidator adds async validator correctly", async () => {
			let validator: IAsyncValidator = {
				GetValueFunction: () => "1",
				ValidateAsync: async (value) => false
			};
			let validationservice = validationServiceBuilder.AddAsyncValidator(validator).Build();
			let isValid = await validationservice.RunAsyncValidators();
			expect(isValid).toBeFalsy();
		});
	});

	describe("NotEmpty tests", () => {
		test("NotEmpty on string returns falsy with empty string", () => {
			let getMethod = () => "";
			let isValid = GetValidityForNotEmptyGetMethod(getMethod);
			expect(isValid).toBeFalsy();
		});

		test("NotEmpty on number returns truthy with valid number (including 0)", () => {
			let getMethod = () => 0;
			let isValid = GetValidityForNotEmptyGetMethod(getMethod);

			expect(isValid).toBeTruthy();
		});

		test("NotEmpty on null returns falsy", () => {
			let getMethod = () => null;
			let isValid = GetValidityForNotEmptyGetMethod(getMethod);
			expect(isValid).toBeFalsy();
		});

		test("NotEmpty on boolean returns falsy for false boolean", () => {
			let getMethod = () => false;
			let isValid = GetValidityForNotEmptyGetMethod(getMethod);
			expect(isValid).toBeFalsy();
		});

		function GetValidityForNotEmptyGetMethod(getMethod) {
			let validationservice = validationServiceBuilder.NotEmpty(getMethod).Build();
			return validationservice.RunNormalValidators();
		}
	});
});
