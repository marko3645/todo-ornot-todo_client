/** @format */

import { AjaxUtils, AjaxRequestParams } from "../../Utils/AjaxUtils";
import axios, { AxiosResponse } from "axios";
import { ConfigKeys } from "../../Utils/ConfigUtils";
import config from "react-global-configuration";

describe("AjaxUtils tests", () => {
	let nonDefaultRequest: AjaxRequestParams = {
		EdnPoint: "nowhere",
		Data: null,
		BaseUrl: "test",
		Method: "get",
		DataType: "jsonn",
		ContentType: "application/json charset=utf-8"
	};

	let defaultRequest: AjaxRequestParams = {
		EdnPoint: "nowhere"
	};

	beforeAll(() => {
		//Setup config
		let mockServerUrl = "https://localhost:5001";

		let configObject = {};
		configObject[ConfigKeys.Server_URL.toString()] = mockServerUrl;
		config.set(configObject);
	});

	beforeEach(() => {
		//Override axios method
		axios.post = async (url: string, requestData: any, headers: AxiosResponse<any>) => {
			return requestData;
		};
	});

	test("Non default data gets set correctly", async () => {
		let originalRequest = { ...nonDefaultRequest };
		await AjaxUtils.Post(nonDefaultRequest);
		expect(originalRequest).toEqual(nonDefaultRequest);
	});

	test("Default data gets set correctly", async () => {
		let originalRequest = { ...defaultRequest };
		await AjaxUtils.Post(defaultRequest);
		expect(originalRequest).not.toEqual(defaultRequest);
	});
});
