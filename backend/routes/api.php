<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BmiController;
use App\Http\Controllers\RecordController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/records', [RecordController::class, 'getRecords']);
    Route::post('/records', [RecordController::class, 'store']);
    Route::get('/records/latest', [RecordController::class, 'getLatestRecord']);
});

Route::middleware('auth:sanctum')->post('/bmi', [BmiController::class, 'calculate_bmi']);

Route::post('/bmi-no-login', [BmiController::class, 'calculate_bmi_no_login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json([
        'user' => $request->user(),
    ]);
});