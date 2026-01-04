<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\User;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        // $story = Story::with('user:id,firstname,lastname,email')->inRandomOrder()->get();

        $story = Story::where('user_id', '!=', $request->user()->id)
            ->with('user:id,firstname,lastname,email')
            ->inRandomOrder()->get();

        return response()->json([
            'story' => $story,
        ]);
    }

    public function myPublishedStories(Request $request)
    {
        $story = Story::where('user_id', $request->user()->id)->latest()->get();

        return response()->json([
            'story' => $story,
        ]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'title' => 'string|required|min:1|max:255',
            'excerpt' => 'string|nullable|max:255',
            'cover_image' => 'string|nullable',
            'content' => 'required|string'
        ]);

        $story = Story::create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'excerpt' => $validated['excerpt'],
            'cover_image' => $validated['cover_image'],
            'content' => $validated['content'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Story created successfully',
            'story' => $story
        ], 201);
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'file' => 'required|image|max:10240',
        ]);

        $path = $request->file('file')->store('stories', 'public');

        // Return URL for Tiptap to insert
        $url = asset("storage/$path");

        return response()->json(['url' => $url]);
    }
}
