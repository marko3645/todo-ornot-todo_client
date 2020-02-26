/** @format */
import {
  IValidator,
  IAsyncValidator,
  ValidationService
} from "./ValidationService";
import { FormInputLinkService } from "@services/FormInputLinkService";

export class ValidationServiceBuilder {
  private _validators: IValidator[];
  private _asyncValidators: IAsyncValidator[];
  private _validatorKey: string;

  constructor(validatorKey?: string, ) {
    this._validators = [];
    this._asyncValidators = [];

    this._validatorKey = validatorKey;
  }

  public Build(): ValidationService {
    return new ValidationService(this._validators, this._asyncValidators);
  }

  public AddValidator(validator: IValidator) {
    this._validators.push(validator);
    return this;
  }

  public AddAsyncValidator(validator: IAsyncValidator) {
    this._asyncValidators.push(validator);
    return this;
  }

  public MergeAll(mergables:ValidationServiceBuilder[]):ValidationServiceBuilder{
	  mergables.forEach(mergable => {
		  this.Merge(mergable);
	  });
	  return this;
  }

  /**
   * Adds the validators (Normal and Async) of the mergable ValidationServiceBuilder to that of this one
   * @param mergable
   */
  public Merge(mergable: ValidationServiceBuilder): ValidationServiceBuilder {
    //Get the mergable's validators
    let mergableValidators = mergable._validators ?? [];
    let mergableAsyncValidators = mergable._asyncValidators ?? [];

    //Add the mergable's normal validators
    this._validators != null
      ? this._validators.push(...mergableValidators)
      : mergable._validators;

    //Add the mergable's async validators
    this._asyncValidators != null
      ? this._asyncValidators.push(...mergableAsyncValidators)
      : mergable._asyncValidators;

    return this;
  }

  public NotEmpty(
    getValueFunction: () => string | number | boolean,
    key?: string
  ): ValidationServiceBuilder {
    let validator: IValidator = {
      GetValueFunction: getValueFunction,
      Validate: value => {
		  
        switch (typeof value) {
          case "string": {
            return !!value;
          }
          case "number": {
            return true;
          }
          case "boolean": {
            return value;
          }
          default: {
            return false;
          }
        }
      },
      ErrorText: "Please fill this field",
      Key: key ?? this._validatorKey
    };

    this._validators.push(validator);
    return this;
  }
}
