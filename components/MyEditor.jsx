"use client";
import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import BlockStyleControls from "./EditorComponents/BlockStyleControls";

import { useMyContext } from "@state/MyContext";
import InlineStyleControls from "./EditorComponents/InlineStyleControls";
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inter", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
    border: "2px",
  },
};

const ImageBlock = ({ contentState, block, blockProps }) => {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const data = entity.getData();
  const src = data.src;
  const { setEditorState, editorState } = blockProps;

  const handleEditImage = () => {
    const imageUrl = window.prompt("Edit image URL:", src);
    if (imageUrl) {
      const contentStateWithEntity = contentState.createEntity(
        "IMAGE",
        "IMMUTABLE",
        { src: imageUrl }
      );
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      const newEditorState = EditorState.set(editorState, {
        currentContent: contentStateWithEntity,
      });
      setEditorState(
        AtomicBlockUtils.replaceAtomicBlock(
          newEditorState,
          block.getKey(),
          entityKey
        )
      );
    }
  };

  return (
    <div
      style={{ maxWidth: "100%", display: "block", cursor: "pointer" }}
      onClick={handleEditImage}
    >
      <img
        src={src}
        alt="Embedded"
        style={{ maxWidth: "100%", display: "block" }}
      />
    </div>
  );
};

const MyEditor = ({ readOnly = false }) => {
  const { setRawContent, type, setType, blogInput } = useMyContext();
  const [editorState, setEditorState] = useState(() =>
    type === "add"
      ? EditorState.createEmpty()
      : EditorState.createWithContent(
          convertFromRaw(JSON.parse(blogInput.blog))
        )
  );
  const onChange = (newEditorState) => {
    setEditorState(newEditorState);
    const contentState = editorState.getCurrentContent();
    setRawContent(convertToRaw(contentState));
  };
  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };
  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  const toggleInlineStyle = (inlineStyle) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const insertImage = () => {
    const imageUrl = window.prompt("Enter image URL:");
    if (imageUrl) {
      const contentStateWithEntity = editorState
        .getCurrentContent()
        .createEntity("IMAGE", "IMMUTABLE", { src: imageUrl });
      const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
      setEditorState(
        AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, " ")
      );
    }
  };
  const blockRendererFn = (block) => {
    if (block.getType() === "atomic") {
      return {
        component: ImageBlock,
        editable: false,
        props: { contentState, setEditorState, editorState }, // Pass the required props
      };
    }
    return null;
  };

  const getBlockStyle = (block) => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return null;
    }
  };

  return (
    <div className=" RichEditor-root grid sm:grid-cols-4 grid-cols-1  gap-4 ">
      <div className="grid gap-2 3xs:grid-cols-1 sm:col-span-1  dark:shadow-celestial-blue dark:shadow-md  shadow-xl border-celestial-blue sticky top-0 left-0 z-10 bg-black p-2 rounded self-start">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />

        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        {/* <div>
          <button onClick={insertImage} type="button" className="btnSp">
            Insert Image
          </button>
        </div> */}
      </div>
      <div className="col-span-3">
        <Editor
          editorState={editorState}
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          onChange={onChange}
          spellCheck={true}
          placeholder="Write Your Blog Here..."
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={blockRendererFn}
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};
export default MyEditor;
