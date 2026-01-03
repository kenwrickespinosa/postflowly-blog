import React from 'react'
import StoryContent from './editor/StoryContent';

function StoryCard({ story }) {
  const getDate = () => {
    return story.created_at.split("T")[0];
  }

  return (
    <div>
      <div>{story.firstname} {story.lastname}</div>
      <div>
        <div>
          <span>{story.title}</span>
          <div><StoryContent content={story.content} /></div>
        </div>
        <div>img here</div>
      </div>
      <div>{getDate()}</div>
    </div>
  )
}

export default StoryCard