import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";

function StoryContent({
  content,
  fontType,
  textSizeSm,
  textSizeMd,
  textTrackingSm,
  textTrackingMd,
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
  });

  if (!editor) return null;

  return (
    <div
      className={`prose ${fontType} ${textSizeSm} ${textTrackingSm} md:${textSizeMd} ${textTrackingMd}`}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}

export default StoryContent;
