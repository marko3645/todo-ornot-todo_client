import * as React from "react";
import { FormInputLinkService } from "../../Services/FormInputLinkService";
import {
  ValidationService,
  ValidationServiceBuilder,
  IAsyncValidator
} from "../../Services/ValidationService";

import {IInputControl} from '../TotControls/Interfaces/TotControlInterfaces';

interface ViewComponentBaseState {
  IsFormInValid: any; //Should be boolean. Compiler complains because of intersecting types if it explicitly set as boolean
}

export class ViewComponentBase<P, S, I> extends React.Component<
  P & ViewComponentBaseState,
  S & ViewComponentBaseState
> {
  protected _inputLinkService: FormInputLinkService;
  protected _inputs: I;
  protected _validator: ValidationService;

  constructor(props: Readonly<P & ViewComponentBaseState>, inputs?: any) {
    super(props);
    if (inputs) {
      this.SetupInputLinkService(inputs);
    }
  }

  protected SetupInputLinkService(inputs: any) {
    this._inputs = inputs;
    this._inputLinkService = new FormInputLinkService(this._inputs);
  }

  protected async OnInputChange(val: any, key: string, noValidate?: boolean) {
    this._inputLinkService.SetValueFor(key, val);

    if (!noValidate) {
      let isFormValid = await this._validator.RunAllValidators(key);
      this.setState({
        IsFormInValid: !isFormValid
      });
    }
  }

  protected GetValueFor(inputKey:string){
      return this._inputLinkService.GetValueFor(inputKey);
  }
  

  protected BuildValidationService(
    ...validationServiceBuilders: ValidationServiceBuilder[]
  ) {
    let builder = new ValidationServiceBuilder();
    this._validator = builder.MergeAll(validationServiceBuilders).Build();
  }

  protected BuildNotEmptyFor(inputKey: string) {
    let builder = new ValidationServiceBuilder(inputKey);
    return builder.NotEmpty(
      () => this._inputLinkService.GetValueFor(inputKey),
      inputKey
    );
  }

  protected ErrorText(key: string) {
    let errorText = this._validator.Error.AllTop(key);
    return errorText;
  }


  protected GetInputProps<InputState>(key:string, extraProps?:InputState){
    let inputProps:InputState & IInputControl = {
        name:key,
        ErrorText:this.ErrorText(key),
        OnChange:(val: any, key: string) => this.OnInputChange(val, key),
        ... extraProps
    }
    return inputProps;
  }

} 
