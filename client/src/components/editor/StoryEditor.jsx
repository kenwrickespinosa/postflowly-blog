import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import Placeholder from "@tiptap/extension-placeholder";
import { FaBold } from "react-icons/fa6";
import { FaUnderline } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa6";

function StoryEditor({ content, onChange, editorRef }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your story...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  });

  useEffect(() => {
    if (editorRef) editorRef.current = editor;
  }, [editor, editorRef]);

  if (!editor) return null;

  return (
    <div>
      <div className="flex flex-col items-center gap-12">
        <div className="flex justify-center items-center gap-4">
          <Button
          type="button"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold")
                ? "bg-neutral-400 text-white hover:bg-neutral-600 cursor-pointer"
                : "bg-inherit text-black hover:bg-muted cursor-pointer"
            }
          >
            <FaBold />
          </Button>
          <Button
          type="button"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={
              editor.isActive("underline")
                ? "bg-neutral-400 text-white hover:bg-neutral-600 cursor-pointer"
                : "bg-inherit text-black hover:bg-muted cursor-pointer"
            }
          >
            <FaUnderline />
          </Button>
          <Button
          type="button"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic")
                ? "bg-neutral-400 text-white hover:bg-neutral-600 cursor-pointer"
                : "bg-inherit text-black hover:bg-muted cursor-pointer"
            }
          >
            <FaItalic />
          </Button>
        </div>
        <div>
          <EditorContent
            editor={editor}
            className="w-[320px] overflow-y-auto border-none my-6 md:w-225 md:text-2xl prose focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}

export default StoryEditor;
