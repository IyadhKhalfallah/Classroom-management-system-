<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\GradeResource;
use App\Grade;

class GradeController extends Controller
{public function __construct()
    {
        $this->middleware('auth:api')->except(['index', 'show']);
    }

    /**
     * Display all books that have been added
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GradeResource::collection(Grade::all());
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
            'ds' => 'required',
            'tp' => 'required',
            'exam' => 'required',
            'subject_id' => 'required',
            'users_id' => 'required',
        ]);
        $grade = new Grade();
        $grade->ds = $request->ds;
        $grade->tp = $request->tp;
        $grade->exam = $request->exam;
        $grade->subject_id = $request->subject_id;
        $grade->users_id = $request->users_id;
        if($grade->tp==null){
            $grade->average =$grade->ds*0.25 + $grade->exam*0.75;
        }
        else{
            $grade->average =$grade->ds*0.33 + $grade->ds*0.17 + $grade->exam*0.5;
        }

        $grade->save();

        return new GradeResource($grade);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Grade $grade)
    {
        return new GradeResource($grade);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Grade $grade)

    {

        // check if currently authenticated user is the owner of the book

        if ($request->user()->id !== $grade->users_id) {

            return response()->json(['error' => 'You can only edit your own books.'], 403);

        }



        $grade->update($request->only(['ds','tp','exam']));



        return new GradeResource($grade);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,Grade $grade)
    {
        if($request->user()->id != $grade->users_id){
            return response()->json(['error' => 'You can only delete your own books.'], 403);
        }
        $grade ->delete();
        return response()->json(null,204);
    }
}
