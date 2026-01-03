<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\User;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        $story = Story::with('user:id,firstname,lastname,email')->inRandomOrder()->get();

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
            'content' => 'required|string'
        ]);

        $story = Story::create([
            'user_id' => $user->id,
            'title' => $validated['title'],
            'content' => $validated['content'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Story created successfully',
            'story' => $story
        ], 201);
    }
}
