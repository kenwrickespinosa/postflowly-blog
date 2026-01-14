<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use App\Models\Story;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $favorites = Favorite::where('user_id', $user->id)
            ->with('story:id,user_id,title,excerpt,cover_image,content')
            ->with('story.user:id,firstname,lastname,email,created_at')
            ->get()
            ->map(function ($favorite) {
                if ($favorite->story && $favorite->story->cover_image) {
                    $favorite->story->cover_image_url = asset('storage/' . $favorite->story->cover_image);
                } else {
                    $favorite->story->cover_image_url = null;
                }

                return $favorite;
            });

        return response()->json([
            'favorites' => $favorites,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'story_id' => ['required', 'exists:stories,id'],
        ]);

        $favorite = Favorite::firstOrCreate([
            'user_id' => $request->user()->id,
            'story_id' => $request->story_id,
        ]);

        return response()->json([
            'favorite' => $favorite,
            'message' => 'Story added to favorites',
        ], 201);
    }

    public function destroy($id)
    {
        $favorite = Favorite::find($id);

        if (!$favorite) {
            return response()->json([
                'message' => 'Favorite not found',
            ], 404);
        }

        $favorite->delete();

        return response()->json([
            'message' => 'Story removed from favorites',
            'favorite' => $id,
        ]);
    }
}
