import React from "react";
import { render } from "react-dom";
import { DragDropContext } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

import DragAroundContainer from "./Container";

render(<DragAroundContainer />, document.getElementById("root"));
