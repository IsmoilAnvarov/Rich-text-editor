import "./Editor.css";

import { Editable, Slate, withReact, useSelected } from "slate-react";
import {
  identifyLinksInTextIfAny,
  isLinkNodeAtSelection,
} from "../utils/EditorUtils";
import { useCallback, useMemo, useRef, useState } from "react";

import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import LinkEditor from "./LinkEditor";
import React from "react";
import Row from "react-bootstrap/Row";
import Toolbar from "./Toolbar";
import { createEditor } from "slate";
import useEditorConfig from "../hooks/useEditorConfig";
import useSelection from "../hooks/useSelection";
import { withHistory } from "slate-history";
import { Button } from "react-bootstrap";

export default function Editor({ document, onChange }) {
  const editorRef = useRef(null);
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);
  const [expend, setExpend] = useState(true);
  const { renderLeaf, renderElement, KeyBindings } = useEditorConfig(editor);

  const onKeyDown = useCallback(
    (event) => KeyBindings.onKeyDown(editor, event),
    [KeyBindings, editor]
  );

  const [previousSelection, selection, setSelection] = useSelection(editor);

  const onChangeLocal = useCallback(
    (doc) => {
      onChange(doc);
      setSelection(editor.selection);
      identifyLinksInTextIfAny(editor);
    },
    [onChange, setSelection, editor]
  );

  let selectionForLink = null;
  if (isLinkNodeAtSelection(editor, selection)) {
    selectionForLink = selection;
  } else if (
    selection == null &&
    isLinkNodeAtSelection(editor, previousSelection)
  ) {
    selectionForLink = previousSelection;
  }

  return (
    <Slate editor={editor} value={document} onChange={onChangeLocal}>
      <div
        className={`editor-container ${
          expend ? "container" : "container-fluid"
        }`}
      >
        <Row>
          <Col>
            <Toolbar
              selection={selection}
              previousSelection={previousSelection}
            />
          </Col>
        </Row>

        <Col className="text-right">
          <Button onClick={() => setExpend(!expend)}>
            <i
              class={`bi bi-arrows-angle-${expend ? "expand" : "contract"}`}
            ></i>
          </Button>
        </Col>

        <Row>
          <Col>
            <div className="editor" ref={editorRef}>
              {selectionForLink != null ? (
                <LinkEditor
                  editorOffsets={
                    editorRef.current != null
                      ? {
                          x: editorRef.current.getBoundingClientRect().x,
                          y: editorRef.current.getBoundingClientRect().y,
                        }
                      : null
                  }
                  selectionForLink={selectionForLink}
                />
              ) : null}
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={onKeyDown}
              />
            </div>
          </Col>
        </Row>
      </div>
    </Slate>
  );
}
