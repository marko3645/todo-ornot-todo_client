/** @format */

import * as React from "react";
import styled, { ThemeProvider } from "styled-components";
import { ThemeManager } from "../../Theme";
import LoginBg from "../../../assets/LoginBg.jpg";
import { RegistrationForm } from "./RegistrationForm";
import { LoginForm } from "./LoginForm";

interface ILoginState {
  ShowingLogin;
}

const MainContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-image: url('${LoginBg}');
    background-size: cover;
    background-position: center;
`;

const BackgroundContainer = styled.div`
  width: 100vw;
  height: 100vh;

  position: fixed;
  left: 0;
  right: 0;

  background: linear-gradient(
    137.17deg,
    rgba(66, 185, 131, 0.33) 22.24%,
    rgba(83, 79, 163, 0.22) 100%
  );
`;

const FormContainer = styled.div`
  width: 600px;

  margin-left: 14%;
  height: 100%;
  background: ${props => props.theme.colors.Background_Primary};

  display: flex;
  flex-direction: column;

  color: ${props => props.theme.colors.Text_Primary};

  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;
`;

const RegistrationContainer = styled.div`
  margin-left: 14%;
  height: 100vh;
  width: 600px;
  display: flex;
  z-index: 200;
  position: absolute;
  overflow: hidden;
  transition: 0.2s cubic-bezier(1, -0.05, 1, 1.18);
  background: ${props => props.theme.colors.Background_Primary};
  border-radius: 50%;
  border-top-left-radius: 0px;
  > div {
    transition: 0.3s cubic-bezier(1, -0.05, 1, 1.18);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 600px;

    opacity: 0;
  }

  &.inactive {
    height: 0px;
    width: 0px;
  }

  &.active {
    z-index: 200;
    height: 100%;
    transition: 0.2s cubic-bezier(1, -0.05, 1, 1.18);
    border-radius: 0px;
    > div {
      transition: 0.4s cubic-bezier(1, -0.05, 1, 1.18);
      opacity: 1;
    }
  }
`;

export class Login extends React.Component {
  state: ILoginState;

  constructor(props) {
    super(props);

    this.state = {
      ShowingLogin: true
    };
  }

  render() {
    return (
      <MainContainer>
        <BackgroundContainer>
          <ThemeProvider theme={ThemeManager.GetDarkTheme()}>
            <RegistrationContainer
              className={this.state.ShowingLogin ? "inactive" : "active"}
            >
              <div>
                <RegistrationForm
                  OnLoginClick={() =>
                    this.setState({
                      ShowingLogin: true
                    })
                  }
                />
              </div>
            </RegistrationContainer>
          </ThemeProvider>
          <ThemeProvider theme={ThemeManager.GetDefaultTheme()}>
            <FormContainer>
              <LoginForm
                OnSignUpClick={() =>
                  this.setState({
                    ShowingLogin: false
                  })
                }
              />
            </FormContainer>
          </ThemeProvider>
        </BackgroundContainer>
      </MainContainer>
    );
  }
}
