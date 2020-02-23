/** @format */

import { ConfigUtils, ConfigKeys } from "../../Utils/ConfigUtils";
import config from "react-global-configuration";

test("should return a populated value", () => {
	let mockServerUrl = "https://localhost:5001";

	let configObject = {};
	configObject[ConfigKeys.Server_URL.toString()] = mockServerUrl;
	config.set(configObject);
	let configServerUrl = ConfigUtils.Get(ConfigKeys.Server_URL);
	expect(configServerUrl).toBe(mockServerUrl);
});
