import {ThemeManager} from '../../Components/Theme'

describe("ThemeManager tests", () => {
    test("DefaultTheme returns the default theme", () => {
        let actualTheme = ThemeManager.GetDefaultTheme();
        let actualThemeName = actualTheme.ThemeInfo.Name;
        let expectedThemeName = "Default"
        expect(expectedThemeName).toBe(actualThemeName);
    });
});