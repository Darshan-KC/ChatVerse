<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MessageController;

// Route::middleware('auth:sanctum')->group(function () {
//     Route::get('/messages/{user}', [MessageController::class, 'index']);
//     Route::post('/messages', [MessageController::class, 'store']);
// });

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
