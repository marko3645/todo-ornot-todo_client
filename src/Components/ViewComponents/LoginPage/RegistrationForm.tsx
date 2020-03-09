/** @format */
import * as React from "react";
import styled from "styled-components";
import { TotForm, TotTextbox, TotTextboxState as TextboxState, TotButton } from "../../TotControls";
import { FormInputLinkService } from "../../../Services/FormInputLinkService/FormInputLinkService";
import {
  ValidationService,
  IValidator
} from "../../../Services/ValidationService/ValidationService";
import { ValidationServiceBuilder } from "../../../Services/ValidationService/ValidationServiceBuilder";
import { AjaxUtils } from "../../../Utils/AjaxUtils";
import { ViewComponentBase } from "../ViewComponentBase";

const HeadingContainer = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 70px;
  margin-bottom: 70px;

  & > .TotHeading__Container {
    font-weight: bold;
    font-size: 48px;
    display: flex;
    font-family: "Roboto", sans-serif;
    width: 300px;
    > span {
      margin: 0px 2px;
      color: ${props => props.theme.colors.Text_Primary};
    }

    .TotHeading__Bar {
      width: 7px;
      height: 90px;
      margin-top: auto;
      margin-bottom: auto;

      &_Left {
        background: ${props => props.theme.colors.Primary};
      }

      &_Right {
        background: ${props => props.theme.colors.Secondary};
      }
    }
  }

  .TotHeading__Text {
    color: ${props => props.theme.colors.Text_Primary};
    font-family: "Roboto", sans-serif;

    &_Top {
      transform: translateX(-13%);
    }

    &_Bottom {
      transform: translateX(85%);
    }
  }
`;

const Form = styled(TotForm)`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: column;
`;

const StyledTextbox = styled(TotTextbox)`
  margin-bottom: 45px;
  > input {
    font-size: 14pt;
  }
`;

const BtnRegister = styled(TotButton)`
  width: 100px;
  transition: 0.2s;

  &.isRegistering {
    outline: none;
    width: 120px;
    transition: 0.2s;
  }
`;

const BottomFormSeparator = styled.div`
  height: 2px;
  background: ${props => props.theme.colors.Border_Primary};
  margin: 50px 0px;
`;

const LoginButtonContainer = styled.div`
  display: flex;

  & > div {
    margin-right: auto;
    margin-left: 5px;
  }
  & > span {
    margin-left: auto;
    display: inline-flex;
    align-items: center;
    margin-right: 5px;
    font-family: "Roboto", sans-serif;
    color: ${props => props.theme.colors.Text_Primary};
  }
`;

const RegistrationActionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  & span {
    display: inline-flex;
    align-items: center;
    font-family: "Roboto", sans-serif;
    font-weight: bold;
    color: ${props => props.theme.colors.Text_Primary};
  }
`;

interface RegistrationFormState {
  isRegistering?: boolean;
  isInvalid?: boolean;
  OnLoginClick: () => void;
}

class Inputs {
  public TxtEmail = "";
  public TxtPassword = "";
  public TxtConfirmPassword = "";
}

export class RegistrationForm extends ViewComponentBase<
  RegistrationFormState,
  RegistrationFormState,
  Inputs
> {
  constructor(props) {
    super(props);
    this.OnRegisterClick = this.OnRegisterClick.bind(this);
    this.OnLoginClick = this.OnLoginClick.bind(this);
    this.state = { ...this.props };

    this._inputs = new Inputs();

    this._inputLinkService = new FormInputLinkService(this._inputs);

    this.BuildValidationService(
      this.GetEmailValidationBuilder(),
      this.BuildNotEmptyFor(this._inputs.TxtPassword)
      // this.GetConfirmPasswordValidationBuilder()
    );
  }

  private GetEmailValidationBuilder() {
    let validationBuilder = this.BuildNotEmptyFor(this._inputs.TxtEmail);

    validationBuilder.AddAsyncValidator({
      GetValueFunction: () =>
        this._inputLinkService.GetValueFor(this._inputs.TxtEmail),
      ValidateAsync: async value => {
        let response: boolean = false;
        try {
          debugger;
          response = await AjaxUtils.Post({
            EdnPoint: "api/users/exists/email",
            Data: value
          });
          debugger;
        } catch (error) {
          response = false;
        }
        return response;
      },
      ErrorText: "This email address is already in use",
      Key: this._inputs.TxtEmail
    });
    return validationBuilder;
  }

  private GetConfirmPasswordValidationBuilder() {
    let validationBuilder = this.BuildNotEmptyFor(
      this._inputs.TxtConfirmPassword
    );

    let validator: IValidator = {
      GetValueFunction: () =>
        this._inputLinkService.GetValueFor(this._inputs.TxtConfirmPassword),
      Validate: confirmPasswordValue => {
        let txtPasswordValue = this._inputLinkService.GetValueFor(
          this._inputs.TxtPassword
        );
        return txtPasswordValue == confirmPasswordValue;
      },
      ErrorText: "Your passwords have to match",
      Key: this._inputs.TxtConfirmPassword
    };

    return validationBuilder.AddValidator(validator);
  }

  render() {
    return (
      <React.Fragment>
        {this.BuildHeading()}
        <Form disabled={this.state.isRegistering}>
          <StyledTextbox
            {...this.GetInputProps<TextboxState>(this._inputs.TxtEmail, {
              LabelText: "Email"
            })}
          />
          <StyledTextbox
            {...this.GetInputProps<TextboxState>(this._inputs.TxtPassword, {
              LabelText: "Password",
              Type: "password"
            })}
          />
          <StyledTextbox
            {...this.GetInputProps<TextboxState>(
              this._inputs.TxtConfirmPassword,
              { LabelText: "Confirm Password", Type: "password" }
            )}
          />
          <RegistrationActionContainer>
            {this.BuildRegisterButton()}
            <LoginButtonContainer>
              <span>Already have an account?</span>
              <TotButton
                type="outlined"
                LabelText="LOG IN"
                onClick={this.OnLoginClick}
              />
            </LoginButtonContainer>
          </RegistrationActionContainer>
          <BottomFormSeparator />
        </Form>
      </React.Fragment>
    );
  }

  private BuildHeading() {
    return (
      <HeadingContainer>
        <div className="TotHeading__Text_Top TotHeading__Text">
          Feel free to
        </div>
        <div className="TotHeading__Container">
          <div className="TotHeading__Bar_Left TotHeading__Bar"></div>
          <span>Create A Free Account</span>
          <div className="TotHeading__Bar_Right TotHeading__Bar"></div>
        </div>
        <div className="TotHeading__Text_Bottom TotHeading__Text">
          It'll be quick
        </div>
      </HeadingContainer>
    );
  }

  //Build methods
  private BuildRegisterButton() {
    let preloader = {
      isLoading: this.state.isRegistering,
      text: "Registering..."
    };

    let classNames = "";
    classNames += this.state.isRegistering ? "isRegistering" : "";

    return (
      <BtnRegister
        LabelText="REGISTER"
        className={classNames}
        onClick={this.OnRegisterClick}
        preloader={preloader}
      />
    );
  }

  //Event handlers
  private async OnRegisterClick() {
    await this._validator.RunAllValidators();
  }

  private OnLoginClick() {
    this.props.OnLoginClick();
  }
}
