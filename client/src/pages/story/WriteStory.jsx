import StoryEditor from "@/components/editor/StoryEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useRef, useState } from "react";

function WriteStory() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");

  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title and content
    if (!title.trim() || !content.length) {
      alert("Title and content are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      let coverImagePath = null;

      if (image) {
        const formData = new FormData();
        formData.append("cover", image);

        const uploadRes = await fetch(
          "http://127.0.0.1:8000/api/story/upload-cover-image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        const uploadData = await uploadRes.json();
        if (!uploadRes.ok)
          throw new Error(uploadData.message || "Failed to upload cover image");

        coverImagePath = uploadData.path;
      }

      const payload = { title, excerpt, cover_image: coverImagePath, content };

      const res = await fetch("http://127.0.0.1:8000/api/story/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to publish your story");
      }

      alert("Story published successfully!");

      setTitle("");
      setExcerpt("");
      setImage(null);
      setContent("");

      if (fileInputRef.current) fileInputRef.current.value = "";

      editorRef.current?.commands.clearContent();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-14 mb-12 items-center md:w-auto md:mb-32 md:h-auto">
          <div className="flex items-center flex-col md:flex-row gap-6 border-b pb-2 md:pb-0 border-neutral-400">
            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What is the title?"
                className="w-[320px] h-14 font-bold border-none my-6 placeholder:font-normal md:w-205 md:h-20 
                md:text-2xl shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <div>
              <Button type="submit" className="cursor-pointer bg-green-700 hover:bg-green-900">
                Publish
              </Button>
            </div>
          </div>
          <div className="md:mb-28">
            {image && typeof image !== "string" && (
              <img
                src={URL.createObjectURL(image)}
                alt="Cover photo"
                className="w-[320px] h-48 md:w-125 md:h-75"
              />
            )}
            <Input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={(e) => {
                if (image) URL.revokeObjectURL(image);
                setImage(e.target.files[0]);
              }}
            />
            <p className="font-inter text-sm text-center mt-2 md:text-base">Add cover image</p>
          </div>
          <div>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Would you provide a short summary or introduction for this story?"
              className="w-[320px] h-14 border-none my-6 placeholder:font-normal md:w-205 md:h-20 
                md:text-2xl shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div>
            <StoryEditor
              content={content}
              onChange={setContent}
              editorRef={editorRef}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default WriteStory;
