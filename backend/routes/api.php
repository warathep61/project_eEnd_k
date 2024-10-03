<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');



Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('/company', [CompanyController::class, 'index']);
Route::get('/company/{id}', [CompanyController::class, 'show']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::post("company", [CompanyController::class, 'store']);
    Route::put("company/{id}", [CompanyController::class, 'update']);
    Route::delete("company/{id}", [CompanyController::class, 'destroy']);
});