import $ from "jquery";
import "./main.css";

import { Calculator } from "./Calculator";
import "./calculator.css";

$(document).ready(() => {
  new Calculator("#calculator");
});
