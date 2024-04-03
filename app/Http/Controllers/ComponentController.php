<?php

namespace App\Http\Controllers;

use App\Models\Component;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;
class ComponentController extends Controller
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
            'subtitle' => ['required', 'string'],
            'description' => ['required']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('componentimage', 'public'); // Store the image in the "public/componentimage" directory
        }
        
        $profile = Component::create([
            '_title' => $request->title,
            '_subtitle' => $request->subtitle,
            '_description' => $request->description,
            '_status' => $request->status,
            '_menuid' => $request->menu,
            '_sectionid' => $request->section,
            '_link' => $request->link,
            '_videourl' => $request->videourl,
            '_sort' => $request->position,
            '_image' => asset("/uploads")."/".$path
            
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Component  $component
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Component $component)
    {
        $limit = $request->limit;
        $profile = Component::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Component  $component
     * @return \Illuminate\Http\Response
     */
    public function edit(Component $component, $id)
    {
       $profile = Component::where('id',$id)->first();

       return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Component  $component
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Component $component, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
            'description' => ['required']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('componentimage', 'public'); 
        } 
        
        if($request->hasFile('image')){  
            $profile = Component::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_description' => $request->description,
                '_status' => $request->status,
                '_menuid' => $request->menu,
                '_sectionid' => $request->section,
                '_link' => $request->link,
                '_videourl' => $request->videourl,
                '_sort' => $request->position,
                '_image' => asset("/uploads")."/".$path
               
            ]);
        }else{
            $profile = Component::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_description' => $request->description,
                '_status' => $request->status,
                '_menuid' => $request->menu,
                '_sectionid' => $request->section,
                '_link' => $request->link,
                '_videourl' => $request->videourl,
                '_sort' => $request->position
            ]);
        }
        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Component  $component
     * @return \Illuminate\Http\Response
     */
    public function destroy(Component $component)
    {
        //
    }
}
