/** @format */

import { ITheme } from "styled-components";

declare module "styled-components" {
	export interface ITheme {
		ThemeInfo: {
			Name:string
		}
		colors: {
			Primary: string;
			primary_Light: string;
			Primary_MediumAlpha: string;
			Primary_MediumNoAlpha: string;

			Secondary: string;
			Secondary_Medium_Alpha: string;
			Secondary_Medium_NoAlpha: string;

			Disabled: string;

			Text_Primary: string;
			Text_Secondary: string;

			Text_Error: string;

			Label: string;

			Border_Primary: string;
			Border_Hovered: string;

			Background_Primary: string;
		};
		fonts: {
			MainFont: string;
		};
	}
}

export class ThemeManager {
	public static GetDefaultTheme(): ITheme {
		return this.DefaultTheme;
	}

	public static GetDarkTheme():ITheme{
		return this.DarkTheme;
	}

	public static DefaultTheme:ITheme = {
		ThemeInfo: {
			Name: "Default"
		},
		colors: {
			Primary: "#42B983",
			primary_Light: "#4BE19D",
			Primary_MediumAlpha: "rgba(66, 185, 131, 0.75)",
			Primary_MediumNoAlpha: "rgba(66, 185, 131, 0)",

			Secondary: "#534FA3",
			Secondary_Medium_Alpha: "rgba(83, 79, 163, 0.75)",
			Secondary_Medium_NoAlpha: "rgba(83, 79, 163, 0.75)",

			Disabled: "#d4d4d4",

			Text_Primary: "#353535",
			Text_Secondary: "#ffffff",
			Text_Error: "crimson",

			Border_Primary: "#888888",
			Border_Hovered: "#353535",

			Background_Primary: "#ffffff",

			Label: "#555555"
		},
		fonts: {
			MainFont: '"Roboto", sans-serif'
		}
	}

	public static DarkTheme:ITheme = {
		ThemeInfo: {
			Name: "Dark"
		},
		colors: {
			Primary: "#42B983",
			primary_Light: "#4BE19D",
			Primary_MediumAlpha: "rgba(66, 185, 131, 0.75)",
			Primary_MediumNoAlpha: "rgba(66, 185, 131, 0)",

			Secondary: "#534FA3",
			Secondary_Medium_Alpha: "rgba(83, 79, 163, 0.75)",
			Secondary_Medium_NoAlpha: "rgba(83, 79, 163, 0.75)",

			Disabled: "#d4d4d4",

			Text_Primary: "#ffffff",
			Text_Secondary: "#ffffff",
			Text_Error: "crimson",

			Border_Primary: "#DDDDDD",
			Border_Hovered: "#FFFFFF",

			Background_Primary: "#353535",

			Label: "#DDDDDD"
		},
		fonts: {
			MainFont: '"Roboto", sans-serif'
		}
	}
}
