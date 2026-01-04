import StoryEditor from "@/components/editor/StoryEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useRef, useState } from "react";

function WriteStory() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");

  const editorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate title and content
    if (!title.trim() || !content.length) {
      alert("Title and content are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const payload = { title, excerpt, content };

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
      setContent("");
      editorRef.current?.commands.clearContent();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mb-20 gap-14 items-center md:w-auto md:mb-32 md:h-screen">
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
              <Button type="submit" className="cursor-pointer">
                Publish
              </Button>
            </div>
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
