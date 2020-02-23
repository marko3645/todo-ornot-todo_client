/** @format */

import { FormInputLinkService } from "../../../Services/FormInputLinkService";

describe("FormInputLinkService tests", () => {
	interface IAccessor {
		InputOne: string;
	}

	let accessor: IAccessor;

	let inputLinkService: FormInputLinkService;

	beforeEach(() => {
		accessor = {
			InputOne: ""
		};

		inputLinkService = new FormInputLinkService(accessor);
	});

	//Constructor tests
	test("Accessor gets populated correctly", () => {
		expect(accessor.InputOne).toBe("InputOne");
	});

	//Method tests

	test("PopulateValueAccessor populates values correctly", () => {
		accessor = {
			InputOne: ""
		};

		FormInputLinkService.PopulateValueAccessor(accessor);

		expect(accessor.InputOne).toBe("InputOne");
	});

	test("GetValueFor before setting gets value correctly", () => {
		let value = inputLinkService.GetValueFor(accessor.InputOne);

		expect(value).toBeFalsy();
	});

	test("GetValueFor after setting gets value correctly", () => {
		let testValue = "This is a test";
		inputLinkService.SetValueFor(accessor.InputOne, testValue);
		let value = inputLinkService.GetValueFor(accessor.InputOne);
		expect(value).toBe(testValue);
	});
});
