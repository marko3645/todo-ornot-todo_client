/** @format */

import * as React from "react";
import { render } from "react-dom";
import config from "react-global-configuration";
import { ConfigKeys } from "./Utils/ConfigUtils";

import { Login } from "./Components/ViewComponents/LoginPage/Login";

let configObject = {};
configObject[ConfigKeys.Server_URL.toString()] = "http://localhost:5000";

config.set(configObject);

render(<Login />, document.getElementById("main"));
