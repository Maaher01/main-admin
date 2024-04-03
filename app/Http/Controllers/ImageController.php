<?php

namespace App\Http\Controllers;

use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;

class ImageController extends Controller
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
            'universityid' => ['required'],
            'image' => ['required']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('universityimage', 'public'); // Store the image in the "public/companyimage" directory
        }   

        $profile = Image::create([
            '_universityid' => $request->universityid,
            '_image' => asset("/uploads")."/".$path
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Image $image)
    {
        $limit = $request->limit;
        $profile = DB::table('images')
            ->join('universities', 'images._universityid', '=', 'universities.id')
            ->select('images.*','universities._name as universityname')
            ->paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function edit(Image $image,$id)
    {
        $profile = Image::where('id',$id)->first();
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Image $image,$id)
    {
       $validator = Validator::make($request->all(), [
            'universityid' => ['required'],
            'image' => ['required']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('universityimage', 'public'); // Store the image in the "public/companyimage" directory
        } 
        
        if($request->hasFile('image')){  
            $profile = Image::where('id', '=', $id)->update([
                '_universityid' => $request->universityid,
                '_image' => asset("/uploads")."/".$path
            ]); 
        }else{
            $profile = Image::where('id', '=', $id)->update([
                '_universityid' => $request->universityid
            ]); 
            
        }

        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Image  $image
     * @return \Illuminate\Http\Response
     */
    public function destroy(Image $image)
    {
        //
    }
}
