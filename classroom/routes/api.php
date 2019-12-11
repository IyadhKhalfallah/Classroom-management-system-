<?php

use Illuminate\Http\Request;
Use App\Course;
Use App\User;
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

Route::get('courses', function() {

    return Course::all();
});
 
Route::get('courses/{id}', function($id) {
    return Course::find($id);
});

Route::post('courses', function(Request $request) {
    return Course::create($request->all);
});

Route::put('courses/{id}', function(Request $request, $id) {
    $course = Course::findOrFail($id);
    $course->update($request->all());

    return $course;
});

Route::delete('courses/{id}', function($id) {
    Course::find($id)->delete();

    return 204;
});
