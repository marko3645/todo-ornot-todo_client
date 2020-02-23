/** @format */

interface FormInputLink {
	elementKey: any;
	elementValue?: any;
}

export class FormInputLinkService {
	private _formInputLinks: FormInputLink[];

	constructor(accessor: any) {
		this._formInputLinks = [];
		FormInputLinkService.PopulateValueAccessor(accessor);
		Object.keys(accessor).forEach((formElementKey) => {
			this._formInputLinks.push({
				elementKey: formElementKey
			});
		});
	}

	public static PopulateValueAccessor(accessor: any) {
		Object.keys(accessor).forEach((prop) => {
			accessor[prop] = prop;
		});
		return accessor;
	}

	public GetValueFor(key: any) {
		return this.GetLinkFor(key).elementValue;
	}

	public SetValueFor(key: any, value: any) {
		this.GetLinkFor(key).elementValue = value;
	}

	private GetLinkFor(key: any): FormInputLink {
		let inputLink = this._formInputLinks.find((link: FormInputLink) => link.elementKey === key);
		return inputLink;
	}
}
