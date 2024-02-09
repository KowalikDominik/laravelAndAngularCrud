<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    'prefix' => 'auth'
], function ($router) {
    Route::post('signup', [AuthController::class, "signup"]);
    Route::post('login', [AuthController::class, "login"]);
    Route::post('logout', [AuthController::class, "logout"]);
    Route::post('refresh', [AuthController::class, "refresh"]);
    Route::get('current', [AuthController::class, "current"]);
});

Route::group([
    'middleware' => 'auth:api',
    'prefix' => 'product'
], function ($router) {
    Route::post('add', [ProductController::class, "add"]);
    Route::post('remove/{product:id}', [ProductController::class, "remove"]);
    Route::post('edit/{product:id}', [ProductController::class, "edit"]);
    Route::get('view/{product:id}', [ProductController::class, "view"]);
    Route::get('list', [ProductController::class, "index"]);
});
