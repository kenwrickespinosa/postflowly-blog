import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Placeholder from "@tiptap/extension-placeholder";
import { FaBold } from "react-icons/fa6";
import { FaUnderline } from "react-icons/fa6";
import { FaItalic } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import Image from "@tiptap/extension-image";
import { Input } from "../ui/input";

function StoryEditor({ content, onChange, editorRef }) {
  const fileInputRef = useRef(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create formData to send to your backend
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/story/upload-image", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");

      // Insert the image at the cursor
      editor.chain().focus().setImage({ src: data.url, alt: "Failed to load image" }).run();
    } catch (err) {
      console.error(err);
    } finally {
      event.target.value = ""; // reset input
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "Write your story...",
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
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
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={
              editor.isActive("italic")
                ? "bg-neutral-400 text-white hover:bg-neutral-600 cursor-pointer"
                : "bg-inherit text-black hover:bg-muted cursor-pointer"
            }
          >
            <FaImage />
          </Button>
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageUpload}
          />
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
