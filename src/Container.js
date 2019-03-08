import * as React from "react";
import {
  DropTarget,
  DragDropContext,
  ConnectDropTarget,
  DropTargetMonitor,
  XYCoord
} from "react-dnd";

import HTML5Backend from "react-dnd-html5-backend";
import ItemTypes from "./ItemTypes";
import Box from "./Box";

const styles = {
  width: 300,
  height: 300,
  border: "1px solid black",
  position: "relative"
};

const boxTarget = {
  drop(props, monitor, component) {
    if (!component) {
      return;
    }
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);

    component.moveBox(item.id, left, top);
  }
};

export default DragDropContext(HTML5Backend)(
  DropTarget(ItemTypes.BOX, boxTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(
    class Container extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          boxes: {
            a: { top: 20, left: 80, title: "Drag me around" },
            b: { top: 180, left: 20, title: "Drag me too" }
          }
        };
      }

      render() {
        const { hideSourceOnDrag, connectDropTarget } = this.props;
        const { boxes } = this.state;

        return (
          connectDropTarget &&
          connectDropTarget(
            <div style={styles}>
              {Object.keys(boxes).map(key => {
                const { left, top, title } = boxes[key];
                return (
                  <Box
                    key={key}
                    id={key}
                    left={left}
                    top={top}
                    hideSourceOnDrag={hideSourceOnDrag}
                  >
                    {title}
                  </Box>
                );
              })}
            </div>
          )
        );
      }

      moveBox(id, left, top) {
        this.setState(({ boxes }) => ({
          boxes: {
            ...boxes,
            [id]: {
              ...boxes[id],
              left,
              top
            }
          }
        }));
      }
    }
  )
);
