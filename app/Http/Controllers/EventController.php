<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('eventimage', 'public'); // Store the image in the "public/companyimage" directory
        } 
        
        
        $profile = Event::create([
            '_title' => $request->title,
            '_subtitle' => $request->subtitle,
            '_description' => $request->description,
            '_time' => $request->time,
            '_date' => date("Y-m-d ",strtotime($request->date)),
            '_status' => $request->status,
            '_location' => $request->location,
            '_latlong' => $request->latlong,
            '_image' => asset("/uploads")."/".$path
            
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Event $event)
    {
        $limit = $request->limit;
        $profile = Event::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
        
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event , $id)
    {
        $profile = Event::where('id',$id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event , $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('eventimage', 'public'); 
        } 
        
        if($request->hasFile('image')){  
            $profile = Event::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_description' => $request->description,
                '_time' => $request->time,
                '_date' => date("Y-m-d ",strtotime($request->date)),
                '_status' => $request->status,
                '_location' => $request->location,
                '_latlong' => $request->latlong,
                '_image' => asset("/uploads")."/".$path
            ]);
        }else{
           $profile = Event::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_description' => $request->description,
                '_time' => $request->time,
                '_location' => $request->location,
                '_latlong' => $request->latlong,
                '_date' => date("Y-m-d ",strtotime($request->date)),
                '_status' => $request->status
               
            ]); 
        }
        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        //
    }
}
