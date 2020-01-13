<?php

use Illuminate\Http\Request;
Use App\Course;
Use App\User;
use App\Http\Controllers\coursesController;
use App\Http\Controllers\GradeController;
use App\Http\Controllers\SubjectController;
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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});



//USERS API ROUTES

Route::get('users', function() {

    return User::all();
});
 
Route::get('users/{id}', function($id) {
    return User::find($id);
});

Route::post('users', function(Request $request) {
    return User::create($request->all);
});

Route::put('users/{id}', function(Request $request, $id) {
    $user = User::findOrFail($id);
    $user->update($request->all());

    return $user;
});

Route::delete('users/{id}', function($id) {
    User::find($id)->delete();

    return 204;
});
 


//COURSES API ROUTES

Route::apiResource('courses', 'coursesController');

Route::apiResource('subject', 'SubjectController');

Route::apiResource('grade', 'GradeController');
