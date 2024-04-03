<?php

namespace App\Http\Controllers;

use App\Models\Newsfeed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class NewsfeedController extends Controller
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
            $path = $image->store('newsfeedimage', 'public'); // Store the image in the "public/companyimage" directory
        } 
        
        
        $profile = Newsfeed::create([
            '_title' => $request->title,
            '_subtitle' => $request->subtitle,
            '_date' => date("Y-m-d ",strtotime($request->date)),
            '_status' => $request->status,
            '_image' => asset("/uploads")."/".$path
            
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Newsfeed  $newsfeed
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Newsfeed $newsfeed)
    {
        $limit = $request->limit;
        $profile = Newsfeed::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Newsfeed  $newsfeed
     * @return \Illuminate\Http\Response
     */
    public function edit(Newsfeed $newsfeed, $id)
    {
        $profile = Newsfeed::where('id',$id)->first();

       return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Newsfeed  $newsfeed
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Newsfeed $newsfeed , $id)
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
            $path = $image->store('newsfeedimage', 'public'); 
        } 
        
        if($request->hasFile('image')){  
            $profile = Newsfeed::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_date' => date("Y-m-d ",strtotime($request->date)),
                '_status' => $request->status,
                '_image' => asset("/uploads")."/".$path
               
            ]);
        }else{
            $profile = Newsfeed::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_date' => date("Y-m-d ",strtotime($request->date)),
                '_status' => $request->status
            ]);
        }
        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Newsfeed  $newsfeed
     * @return \Illuminate\Http\Response
     */
    public function destroy(Newsfeed $newsfeed)
    {
        //
    }
}
