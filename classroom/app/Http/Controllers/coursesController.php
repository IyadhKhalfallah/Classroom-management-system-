<?php

namespace App\Http\Controllers;

use App\Course;
use Illuminate\Http\Request;
use App\Http\Resources\CoursesResource;
class coursesController extends Controller
{
//    public function __construct()
//    {
//        $this->middleware('auth:api')->except(['index', 'show']);
//    }

    /**
     * Display all books that have been added
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return CoursesResource::collection(Course::all());
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->validate($request, [
            'type' => 'required',
            'name' => 'required',
            'subject' => 'required',
            'user_id' => 'required',
            'link' => 'required',
            'description' => 'required',
        ]);
        $course = new Course;
        $course->type = $request->type;
        $course->name = $request->name;
        $course->subject = $request->subject;
        $course->user_id = $request->user_id;
        $course->link = $request->link;
        $course->description = $request->description;
        $course->save();

        return new CoursesResource($course);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Course $course)
    {
        return new CoursesResource($course);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course)

    {

        // check if currently authenticated user is the owner of the book

        if ($request->user()->id !== $course->user_id) {

            return response()->json(['error' => 'You can only edit your own books.'], 403);

        }



        $course->update($request->only(['type','name','subject','link', 'description']));



        return new CoursesResource($course);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,Course $course)
    {
        if($request->user()->id != $course->user_id){
            return response()->json(['error' => 'You can only delete your own books.'], 403);
        }
        $course ->delete();
        return response()->json(null,204);
    }
}
