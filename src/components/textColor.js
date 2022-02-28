import React from "react";
import { useEditor } from "slate-react";

import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import "./textColor.css";
import { changeColor } from "../utils/EditorUtils";

const colors = [
  ["#172B4D", "#0747A6", "#008DA6", "#006644", "#FF991F", "#BF2600", "#403294"],
  ["#97A0AF", "#4C9AFF", "#00B8D9", "#36B37E", "#FFC400", "#FF5630", "#6554C0"],
  ["#FFFFFF", "#B3D4FF", "#B3F5FF", "#ABF5D1", "#FFF0B3", "#FFBDAD", "#EAE6FF"],
];

const ColorsLayer = () => {
  const editor = useEditor();
  console.log(editor);
  return (
    <div className="colors-container container">
      {colors.map((block, inx) => (
        <div key={inx} className="row">
          {block.map((color) => (
            <div key={color} className="color col">
              <button
                onClick={changeColor.bind(this, editor, color)}
                style={{ backgroundColor: color }}
              ></button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default function TextColor({ getActiveStyles }) {
  const editor = useEditor();
  return (
    <>
      <OverlayTrigger
        trigger={"click"}
        placement={"bottom"}
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <ColorsLayer />
          </Popover>
        }
      >
        <Button
          variant={`outline-primary ${
            getActiveStyles(editor).has("color") && "active"
          }`}
        >
          <i class="bi bi-palette-fill"></i>
        </Button>
      </OverlayTrigger>
    </>
  );
}
