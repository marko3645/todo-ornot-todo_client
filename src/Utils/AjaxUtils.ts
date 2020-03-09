/** @format */

import axios, { Method } from "axios";
import { ConfigUtils, ConfigKeys } from "./ConfigUtils";

export interface AjaxRequestParams {
	EdnPoint: string;
	Data?: any;
	BaseUrl?: string;
	Method?: Method;
	DataType?: string;
	ContentType?: string;
}
export class AjaxUtils {
	public static async Post<R>(request: AjaxRequestParams): Promise<R> {
		request.BaseUrl = request.BaseUrl ?? ConfigUtils.Get(ConfigKeys.Server_URL);
		request.DataType = request.DataType || "json";
		request.ContentType = request.ContentType || "application/json";
		request.Method = request.Method || "POST";
		
		let requestData = request.ContentType.toLowerCase() == "application/json" ? JSON.stringify(request.Data) : request.Data;

		return axios.post<AjaxRequestParams, R>(`${request.BaseUrl}/${request.EdnPoint}`, requestData, {
			method: request.Method,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}
