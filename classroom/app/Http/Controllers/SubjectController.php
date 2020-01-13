<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\SubjectResource;
use App\Subject;

class SubjectController extends Controller
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
        return SubjectResource::collection(Subject::paginate(25));
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
            'name' => 'required',
            'coefficient' => 'required',

        ]);
        $subject = new Subject();
        $subject->name = $request->name;
        $subject->coefficient = $request->coefficient;
        $subject->save();

        return new SubjectResource($subject);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Subject $subject)
    {
        return new SubjectResource($subject);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Subject $subject)

    {

        // check if currently authenticated user is the owner of the book

        if ($request->user()->id !== $subject->user_id) {

            return response()->json(['error' => 'You can only edit your own books.'], 403);

        }



        $subject->update($request->only(['name','coefficient']));



        return new SubjectResource($subject);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,Subject $subject)
    {
        if($request->user()->id != $subject->user_id){
            return response()->json(['error' => 'You can only delete your own books.'], 403);
        }
        $subject ->delete();
        return response()->json(null,204);
    }
}
