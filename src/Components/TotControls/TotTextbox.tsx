/** @format */

import * as React from "react";
import { IInputControl } from "./Interfaces/TotControlInterfaces";
import styled from "styled-components";
import { FormContextProvider, FormContext } from "./TotForm";

interface TotTextboxState extends IInputControl {
  Text?: string;
  Type?: "text" | "password";
  OnChange?: (
    val: string | number,
    key: any,
    event: React.SyntheticEvent<HTMLInputElement, Event>
  ) => void;
}

const MainContainer = styled.div`
  margin-bottom: 15px;
  font-family: ${props => props.theme.fonts.MainFont};
`;

const InnerContainer = styled.div`
  height: 52px;

  border: 1px solid ${props => props.theme.colors.Border_Primary};
  border-radius: 4px;

  display: flex;

  overflow: hidden;

  font-family: ${props => props.theme.fonts.MainFont};
  transition: 0.2s;

  padding-left: 10px;

  &.active {
    border-color: ${props => props.theme.colors.Primary};
    border-width: 2px;
    transition: 0.2s;
  }

  &.disabled {
    border-color: ${props => props.theme.colors.Disabled};
    cursor: default;
    &:hover {
      border-color: ${props => props.theme.colors.Disabled} !important;
    }

    > label {
      color: ${props => props.theme.colors.Disabled};
      user-select: none;
      cursor: default;
    }

    > input {
      background: transparent;
      color: ${props => props.theme.colors.Disabled};
    }
  }

  &:hover:not(.active) {
    border-color: ${props => props.theme.colors.Border_Hovered};
  }
`;

const Textbox = styled.input`
  height: calc(100% - 2px);
  width: 100%;
  outline: none;
  border: none;

  color: ${props => props.theme.colors.Text_Primary};
  background: ${props => props.theme.colors.Background_Primary};
`;

const Label = styled.label`
  position: absolute;

  background: ${props => props.theme.colors.Background_Primary};

  padding: 0px 4px;

  cursor: text;

  transform: translateY(calc(50% + 5px));
  transition: 0.2s;

  color: ${props => props.theme.colors.Label};

  &.active {
    transform: translate(5px, calc(-50% - 2px));
    transition: 0.2s;
    color: ${props => props.theme.colors.Primary};
  }
`;

const ErrorContainer = styled.div`
  padding-left: 15px;
  & > span {
    font-size: 8pt;
    color: ${props => props.theme.colors.Text_Error};
  }
`;

export class TotTextbox extends React.Component<
  TotTextboxState,
  TotTextboxState
> {
  //Component variables
  private TextboxRef: React.RefObject<HTMLInputElement> = React.createRef<
    HTMLInputElement
  >();

  constructor(props) {
    super(props);

    this.state = { ...this.props };

    this.BindEventHandlers();
  }
  componentDidMount() {
    this.SetInitialState();
  }

  private SetInitialState() {
    if (!this.state.Type) {
      this.setState({
        Type: "text"
      });
    }
  }

  private BindEventHandlers() {
    this.OnInputFocus = this.OnInputFocus.bind(this);
    this.OnInputBlur = this.OnInputBlur.bind(this);
    this.OnKeyUp = this.OnKeyUp.bind(this);
    this.FocusInput = this.FocusInput.bind(this);
  }

  render() {
    return (
      <FormContextProvider.Consumer>
        {(formContext: FormContext) => this.BuildComponent(formContext)}
      </FormContextProvider.Consumer>
    );
  }
  //===============================================================================================================
  //================================================ Build methods ================================================
  //===============================================================================================================

  private BuildComponent(formContext: FormContext) {
    let classNames = this.props.className || "";

    let innerContainerClassNames = "";
    innerContainerClassNames +=
      this.state.HasFocus || this.state.Text ? " active" : "";
    innerContainerClassNames +=
      this.state.disabled || formContext?.disabled ? " disabled" : "";
    return (
      <MainContainer className={classNames}>
        <InnerContainer className={innerContainerClassNames}>
          {this.BuildTextbox(formContext)}
          {this.BuildLabel(formContext)}
        </InnerContainer>
        {this.BuildError()}
      </MainContainer>
    );
  }

  private BuildTextbox(formContext: FormContext) {
    return (
      <Textbox
        onFocus={this.OnInputFocus}
        onBlur={this.OnInputBlur}
        value={this.props.Text}
        type={this.state.Type}
        onKeyUp={this.OnKeyUp}
        ref={this.TextboxRef}
        disabled={this.props.disabled || formContext?.disabled}
        name={this.props.name}
      />
    );
  }

  private BuildLabel(formContext: FormContext) {
    if (!this.state.LabelText) {
      return;
    }

    let labelClasses = "";

    labelClasses += this.state.HasFocus || this.state.Text ? " active" : "";

    return (
      <Label
        className={labelClasses}
        onClick={() => this.OnLabel_Click(formContext)}
      >
        {this.state.LabelText}
      </Label>
    );
  }

  private BuildError() {
    if (!this.props.ErrorText) {
      return;
    }

    return (
      <ErrorContainer>
        <span>* {this.props.ErrorText}</span>
      </ErrorContainer>
    );
  }

  //================================================================================================================
  //================================================ Event Handlers ================================================
  //================================================================================================================

  private OnLabel_Click(formContext: FormContext) {
    if (this.props.disabled || formContext?.disabled) {
      return;
    }
    this.FocusInput();
  }

  private FocusInput() {
    this.TextboxRef.current.focus();
    this.OnInputFocus();
  }

  private OnInputFocus() {
    this.setState({
      HasFocus: true
    });
  }

  private OnInputBlur() {
    this.setState({
      HasFocus: false
    });
  }

  private OnKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
    this.setState({
      Text: (event.target as HTMLInputElement).value
    });

    if (this.props.OnChange) {
      this.props.OnChange(
        (event.target as HTMLInputElement).value,
        this.props.name,
        event
      );
    }
  }

  private OnChange(event: React.SyntheticEvent<HTMLInputElement, Event>) {}
}
