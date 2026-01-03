import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { renderToReactElement } from "@tiptap/static-renderer";
import React from "react";

function StoryContent({ content }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  if (!editor) return null;

  return (
    <EditorContent editor={editor} />
    // <div className="prose" dangerouslySetInnerHTML={{ __html: content }} />
  );
}

export default StoryContent;
