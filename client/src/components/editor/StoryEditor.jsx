import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React from "react";
import { Button } from "../ui/button";
import Placeholder from "@tiptap/extension-placeholder";
import { FaBold } from "react-icons/fa6";
import { FaUnderline } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa6";

function StoryEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your story...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  if (!editor) return null;

  return (
    <>
      <div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold")
                ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                : "bg-inherit text-black hover:bg-muted cursor-pointer"
            }
          >
            <FaBold />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline")
                ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                : "bg-inherit text-black hover:bg-muted cursor-pointer"
            }
          >
            <FaUnderline />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic")
                ? "bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                : "bg-inherit text-black hover:bg-muted cursor-pointer"
            }
          >
            <FaItalic />
          </Button>
        </div>
      </div>
      <EditorContent editor={editor} />
    </>
  );
}

export default StoryEditor;
