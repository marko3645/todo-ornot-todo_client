/** @format */
import * as React from "react";
import styled from "styled-components";
import { TotForm, TotTextbox, TotButton } from "../../TotControls";
import { FormInputLinkService } from "../../../Services/FormInputLinkService/FormInputLinkService";
import { ValidationService } from "../../../Services/ValidationService/ValidationService";
import { ValidationServiceBuilder } from "../../../Services/ValidationService/ValidationServiceBuilder";

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

class Inputs {
  public TxtUsername = "";
  public TxtPassword = "";
  public TxtConfirmPassword = "";
}

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

export class RegistrationForm extends React.Component<
  RegistrationFormState,
  RegistrationFormState
> {
  private InputLinkService: FormInputLinkService;
  private Inputs: Inputs;
  private ValidationService: ValidationService;

  constructor(props) {
    super(props);
    this.OnRegisterClick = this.OnRegisterClick.bind(this);
    this.OnLoginClick = this.OnLoginClick.bind(this);
    this.state = { ...this.props };

    this.Inputs = new Inputs();

    this.InputLinkService = new FormInputLinkService(this.Inputs);

    this.ValidationService = this.BuildValidationService();
  }

  private async OnTextboxChange(val, key) {
    this.InputLinkService.SetValueFor(key, val);

    if (!(await this.ValidationService.RunAllValidators(key))) {
      this.setState({
        isInvalid: false
      });
    }
  }

  private BuildValidationService() {
    let builder = new ValidationServiceBuilder();
    return builder
      .NotEmpty(
        this.BuildGetValueFunction(this.Inputs.TxtUsername),
        this.Inputs.TxtUsername
      )
      .NotEmpty(
        this.BuildGetValueFunction(this.Inputs.TxtPassword),
        this.Inputs.TxtPassword
      )
      .NotEmpty(
        this.BuildGetValueFunction(this.Inputs.TxtConfirmPassword),
        this.Inputs.TxtConfirmPassword
      )
      .Build();
  }

  private BuildGetValueFunction(input: string) {
    return () => this.InputLinkService.GetValueFor(input);
  }

  private ErrorText(key: string) {
    return this.ValidationService.Error.AllTop(key);
  }

  render() {
    return (
      <React.Fragment>
        {this.BuildHeading()}
        <Form disabled={this.state.isRegistering}>
          <StyledTextbox
            name={this.Inputs.TxtUsername}
            LabelText="Username"
            ErrorText={this.ErrorText(this.Inputs.TxtUsername)}
            OnChange={(val, key) => this.OnTextboxChange(val, key)}
          />
          <StyledTextbox
            name={this.Inputs.TxtPassword}
            LabelText="Password"
			ErrorText={this.ErrorText(this.Inputs.TxtPassword)}
			Type={"password"}
          />
          <StyledTextbox
            name={this.Inputs.TxtConfirmPassword}
            LabelText="Confirm Password"
			ErrorText={this.ErrorText(this.Inputs.TxtConfirmPassword)}
			Type={"password"}
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
    await this.ValidationService.RunAllValidators();

    this.setState({
      isInvalid: true
    });
  }

  private OnLoginClick() {
    this.props.OnLoginClick();
  }
}
