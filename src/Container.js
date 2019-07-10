import * as React from "react";
import { DropTarget, DragDropContext } from "react-dnd";

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
                    quibi_mode: false,
                    boxes: {
                        a: { top: 20, left: 20, brand: "disney" },
                        b: { top: 40, left: 40, brand: "quibi" },
                        c: { top: 60, left: 60, brand: "netflix" },
                        d: { top: 80, left: 80, brand: "go90" },
                        e: { top: 100, left: 100, brand: "hbo" },
                        f: { top: 110, left: 110, brand: "hbo_max" },
                        g: { top: 120, left: 120, brand: "hulu" },
                        h: { top: 130, left: 130, brand: "filmstruck" },
                        i: { top: 140, left: 140, brand: "criterion" },
                        j: { top: 150, left: 150, brand: "youtube" },
                        k: { top: 160, left: 160, brand: "cbs" },
                        l: { top: 170, left: 170, brand: "primevideo" },
                        m: { top: 180, left: 180, brand: "itunes" },
                        n: { top: 190, left: 190, brand: "crunchyroll" },
                        o: { top: 200, left: 200, brand: "vudu" },
                        p: { top: 210, left: 210, brand: "crackle" },
                        q: { top: 220, left: 220, brand: "apple" },
                    }
                };
                this.toggle_quibi = this.toggle_quibi.bind(this);
                this.toggle_piracy = this.toggle_piracy.bind(this);
            }

            toggle_quibi() {
                this.setState(state => ({
                    quibi_mode: !state.quibi_mode
                }));
            }

            toggle_piracy() {
                this.setState(({ boxes }) => ({
                    boxes: {
                        ...boxes,
                        aa: { top: 300, left: 300, brand: "popcorntime" },
                        ab: { top: 310, left: 310, brand: "plex" }
                    }
                }));
            }

            render() {
                const { hideSourceOnDrag, connectDropTarget } = this.props;
                const { boxes } = this.state;
                const { quibi_mode } = this.state;

                return (
                    connectDropTarget &&
                    connectDropTarget( <
                        div style = { styles } > {
                            Object.keys(boxes).map(key => {
                                const { left, top, brand } = boxes[key];
                                return ( <
                                    Box key = { key }
                                    id = { key }
                                    left = { left }
                                    top = { top }
                                    hideSourceOnDrag = { hideSourceOnDrag } >
                                    <
                                    img src = { `images/${quibi_mode ? "quibi" : brand}.png` }
                                    alt = { brand }
                                    /> < /
                                    Box >
                                );
                            })
                        } <
                        button className = "quibi"
                        onClick = { this.toggle_quibi } >
                        TOGGLE QUIBI MODE <
                        /button> <
                        button className = "piracy"
                        onClick = { this.toggle_piracy } >
                        ADD PIRACY <
                        /button> <
                        div className = "scale" >
                        <
                        div className = "dotted-line" / >
                        <
                        /div> < /
                        div >
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