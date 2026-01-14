<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\StoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/story/index', [StoryController::class, 'index'])->middleware('auth:sanctum');
Route::get('/story/my-published-stories', [StoryController::class, 'myPublishedStories'])->middleware('auth:sanctum');
Route::post('/story/store', [StoryController::class, 'store'])->middleware('auth:sanctum');
Route::post('/story/upload-image', [StoryController::class, 'uploadImage'])->middleware('auth:sanctum');
Route::post('/story/upload-cover-image', [StoryController::class, 'uploadCoverImage'])->middleware('auth:sanctum');

Route::get('/read-story/{id}', [StoryController::class, 'show'])->middleware('auth:sanctum');

Route::get('/favorite/index', [FavoriteController::class, 'index'])->middleware('auth:sanctum');
Route::post('/favorite/store', [FavoriteController::class, 'store'])->middleware('auth:sanctum');
Route::delete('/favorite/destroy/{id}', [FavoriteController::class, 'destroy'])->middleware('auth:sanctum');