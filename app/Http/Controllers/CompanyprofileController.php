<?php

namespace App\Http\Controllers;

use App\Models\Companyprofile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class CompanyprofileController extends Controller
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
    public function create(Request $request)
    {
           
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'mobile' => ['required', 'string', 'max:15']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
        }
        
        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('companyimage', 'public'); // Store the image in the "public/companyimage" directory
        }   


        $profile = Companyprofile::create([
            '_name' => $request->name,
            '_email' => $request->email,
            '_phone' => $request->phone,
            '_mobile' => $request->mobile,
            '_latlong' => $request->latlong,
            '_description' => $request->description,
            '_website' => $request->website,
            '_image' => asset("/uploads")."/".$path,
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);

     
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
       
         
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Companyprofile  $companyprofile
     * @return \Illuminate\Http\Response
     */
    public function show(Companyprofile $companyprofile)
    {
        $profile = Companyprofile::all();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Companyprofile  $companyprofile
     * @return \Illuminate\Http\Response
     */
    public function edit(Companyprofile $companyprofile)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Companyprofile  $companyprofile
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Companyprofile $companyprofile,$id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255'],
            'mobile' => ['required', 'string', 'max:15']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'fix errors', 'errors' => $validator->errors()], 500);
        }
        
        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('companyimage', 'public'); // Store the image in the "public/companyimage" directory
        }  
        
        
        if($request->hasFile('image')){ 
            
            $profile = Companyprofile::where('id', '=', $id)->update([
                '_name' => $request->name,
                '_email' => $request->email,
                '_phone' => $request->phone,
                '_mobile' => $request->mobile,
                '_latlong' => $request->latlong,
                '_description' => $request->description,
                '_website' => $request->website,
                '_image' => asset("/uploads")."/".$path,
               
            ]); 
            
        }else{
            $profile = Companyprofile::where('id', '=', $id)->update([
                '_name' => $request->name,
                '_email' => $request->email,
                '_phone' => $request->phone,
                '_mobile' => $request->mobile,
                '_latlong' => $request->latlong,
                '_description' => $request->description,
                '_website' => $request->website
            ]); 
        }
        
        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Companyprofile  $companyprofile
     * @return \Illuminate\Http\Response
     */
    public function destroy(Companyprofile $companyprofile)
    {
        //
    }
}
