import * as React from "react";
import { DragSource, ConnectDragSource } from "react-dnd";
import ItemTypes from "./ItemTypes";
import { white } from "ansi-colors";

const style = {
  position: "absolute",
  cursor: "move"
};

const boxSource = {
  beginDrag(props) {
    const { id, left, top } = props;
    return { id, left, top };
  }
};

export default DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(
  class Box extends React.Component {
    render() {
      const {
        hideSourceOnDrag,
        left,
        top,
        connectDragSource,
        isDragging,
        children
      } = this.props;
      if (isDragging && hideSourceOnDrag) {
        return null;
      }

      return (
        connectDragSource &&
        connectDragSource(
          <div class="logo" style={{ ...style, left, top }}>
            {children}
          </div>
        )
      );
    }
  }
);
