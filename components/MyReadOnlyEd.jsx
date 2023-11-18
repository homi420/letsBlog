import React, { useState } from "react";
import { Editor, EditorState, ContentState, convertFromRaw } from "draft-js";
const MyReadOnlyEd = ({ blogContent }) => {
  const contentState = convertFromRaw(JSON.parse(blogContent));
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(contentState)
  );
  return <Editor editorState={editorState} readOnly={true} />;
};

export default MyReadOnlyEd;
