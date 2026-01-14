<?php

namespace App\Http\Controllers;

use App\Models\Story;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoryController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');

        $stories = Story::where('user_id', '!=', $request->user()->id)
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('title', 'LIKE', "%{$search}%")
                        ->orWhere('excerpt', 'LIKE', "%{$search}%")
                        ->orWhereHas('user', function ($userQuery) use ($search) {
                            $userQuery->where('firstname', 'LIKE', "%{$search}%")
                                ->orWhere('lastname', 'LIKE', "%{$search}%");
                        });
                });
            })
            ->with('user:id,firstname,lastname,email')
            ->withExists([
                'favorites as is_favorite' => function ($q) {
                    $q->where('user_id', Auth::id());
                }
            ])
            ->inRandomOrder()
            ->get()
            ->map(function ($story) {
                if ($story->cover_image) {
                    $story->cover_image = asset('storage/' . $story->cover_image);
                }
                return $story;
            });

        return response()->json([
            'stories' => $stories,
        ]);
    }

    public function show($id)
    {
        $story = Story::with('user:id,firstname,lastname,email')->findOrFail($id);

        $cover_image = asset('storage/' . $story->cover_image);

        return response()->json([
            'story' => $story,
            'cover_image' => $cover_image
        ]);
    }

    public function myPublishedStories(Request $request)
    {
        $stories = Story::where('user_id', $request->user()->id)
            ->latest()
            ->get()
            ->map(function ($story) {
                if ($story->cover_image) {
                    $story->cover_image = asset('storage/' . $story->cover_image);
                }
                return $story;
            });

        return response()->json([
            'story' => $stories,
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

    public function uploadCoverImage(Request $request)
    {
        $request->validate([
            'cover' => 'nullable|image|max:10240'
        ]);

        if (!$request->hasFile('cover')) {
            return response()->json([
                'path' => null,
                'url' => null
            ]);
        }

        $path = $request->file('cover')->store('covers', 'public');

        return response()->json([
            'path' => $path,
            'url' => $path ? asset("storage/$path") : null,
        ]);
    }
}
