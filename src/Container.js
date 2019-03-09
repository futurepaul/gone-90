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
  width: "100vw",
  height: "100vh",
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
            a: { top: 20, left: 20, brand: "disney" },
            b: { top: 40, left: 40, brand: "quibi" },
            c: { top: 60, left: 60, brand: "netflix" },
            d: { top: 80, left: 80, brand: "go90" },
            e: { top: 100, left: 100, brand: "hbo" },
            f: { top: 100, left: 100, brand: "warnermedia" },
            g: { top: 100, left: 100, brand: "hulu" },
            g: { top: 100, left: 100, brand: "filmstruck" },
            h: { top: 100, left: 100, brand: "criterion" },
            i: { top: 100, left: 100, brand: "youtube" },
            j: { top: 100, left: 100, brand: "hulu" },
            l: { top: 100, left: 100, brand: "primevideo" },
            m: { top: 100, left: 100, brand: "itunes" }
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
                const { left, top, brand } = boxes[key];
                return (
                  <Box
                    key={key}
                    id={key}
                    left={left}
                    top={top}
                    hideSourceOnDrag={hideSourceOnDrag}
                  >
                    <img src={`images/${brand}.png`} />
                  </Box>
                );
              })}
              <div class="scale">
                <div class="dotted-line" />
              </div>
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
