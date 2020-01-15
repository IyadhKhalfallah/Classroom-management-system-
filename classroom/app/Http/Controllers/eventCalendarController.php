<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Resources\eventCalendarResource;
use App\eventCalendar;

class eventCalendarController extends Controller
{
//        public function __construct()
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
        return eventCalendarResource::collection(eventCalendar::all());
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
            'title' => 'required',
            'description' => 'required',
            'user_id' => 'required',
            'type' => 'required',
            'date' => 'required',
        ]);
        $event = new eventCalendar();
        $event->title = $request->title;
        $event->description = $request->description;
        $event->user_id = $request->user_id;
        $event->type = $request->type;
        $event->date = $request->date;
        $event->save();

        return new eventCalendarResource($event);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(eventCalendar $event)
    {
        return new eventCalendarResource($event);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, eventCalendar $event)

    {

        // check if currently authenticated user is the owner of the book

        if ($request->user()->id !== $event->user_id) {

            return response()->json(['error' => 'You can only edit your own books.'], 403);

        }



        $event->update($request->only(['title','description','type','date']));



        return new eventCalendarResource($event);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request,eventCalendar $event)
    {
        if($request->user()->id != $event->user_id){
            return response()->json(['error' => 'You can only delete your own books.'], 403);
        }
        $event ->delete();
        return response()->json(null,204);
    }
}
