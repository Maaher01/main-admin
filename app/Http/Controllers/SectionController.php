<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;
class SectionController extends Controller
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
            'heading' => ['required', 'string', 'max:255'],
            'subheading' => ['required', 'string'],
            'description' => ['required']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('sectionimage', 'public'); // Store the image in the "public/companyimage" directory
        } 
        
        
        $profile = Section::create([
            '_title' => $request->title,
            '_subtitle' => $request->subtitle,
            '_heading' => $request->heading,
            '_subheading' => $request->subheading,
            '_description' => $request->description,
            '_status' => $request->status,
            '_menuid' => $request->menu,
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
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Section $section)
    {
        $limit = $request->limit;
        $profile = Section::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function showsection(Section $section, $slug)
    {
       $profile =  DB::table('sections')
       ->join('menus', 'menus.id', '=', 'sections._menuid')
       ->where('menus._url', "/".$slug)
       ->select('sections.*')
       ->get();

        return response()->json(['status' => true, 'data' =>  $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function showsectionById(Section $section, $id)
    {
       $profile =  DB::table('sections')
       ->join('menus', 'menus.id', '=', 'sections._menuid')
       ->where('menus.id', $id)
       ->select('sections.*')
       ->get();

        return response()->json(['status' => true, 'data' =>  $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function edit(Section $section, $id)
    {
       $profile = Section::where('id',$id)->first();

       return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Section $section, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
            'heading' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string'],
            'description' => ['required']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('sectionimage', 'public'); 
        } 
        
        if($request->hasFile('image')){  
            $profile = Section::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_heading' => $request->heading,
                '_subheading' => $request->subheading,
                '_description' => $request->description,
                '_status' => $request->status,
                '_menuid' => $request->menu,
                '_link' => $request->link,
                '_videourl' => $request->videourl,
                '_sort' => $request->position,
                '_image' => asset("/uploads")."/".$path
               
            ]);
        }else{
            $profile = Section::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_heading' => $request->heading,
                '_subheading' => $request->subheading,
                '_description' => $request->description,
                '_status' => $request->status,
                '_menuid' => $request->menu,
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
     * @param  \App\Models\Section  $section
     * @return \Illuminate\Http\Response
     */
    public function destroy(Section $section)
    {
        //
    }
}
