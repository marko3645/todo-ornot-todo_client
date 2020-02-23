/** @format */
import config from "react-global-configuration";

export enum ConfigKeys {
	Server_URL
}

export class ConfigUtils {
	public static Get(key: ConfigKeys) {
		return config.get(key.toString());
	}
}
