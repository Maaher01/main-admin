<?php

namespace App\Http\Controllers;

use App\Models\University;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;
class UniversityController extends Controller
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
            'name' => ['required', 'string', 'max:255']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('universityimage', 'public'); // Store the image in the "public/companyimage" directory
        }   


        $profile = University::create([
            '_name' => $request->name,
            '_address' => $request->address,
            '_videourl' => $request->videourl,
            '_image' => asset("/uploads")."/".$path,
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\University  $university
     * @return \Illuminate\Http\Response
     */
    public function universitylist(University $university,$countryid)
    {
        $profile = DB::table('courses')
        ->join('countries', 'courses._countryid', '=', 'countries.id')
        ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
        ->join('universities', 'courses._universityid', '=', 'universities.id')->where('countries.id',$countryid)
        ->select('universities.*')->distinct()
        ->get();
    return response()->json(['status' => true, 'data' => $profile]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\University  $university
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,University $university)
    {
        $limit = $request->limit;
        $profile = University::paginate($limit);

        return response()->json(['status' => true, 'data' => $profile]);
    }


    public function alluniversity(Request $request,University $university)
        {
            
            $profile = University::get();
    
            return response()->json(['status' => true, 'data' => $profile]);
        }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\University  $university
     * @return \Illuminate\Http\Response
     */
    public function edit(University $university,$id)
    {
        $profile = University::where('id',$id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\University  $university
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, University $university,$id)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
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
            $profile = University::where('id', '=', $id)->update([
                '_name' => $request->name,
                '_address' => $request->address,
                '_videourl' => $request->videourl,
                '_image' => asset("/uploads")."/".$path
            ]);
        }else{
            $profile = University::where('id', '=', $id)->update([
                '_name' => $request->name,
                '_address' => $request->address,
                '_videourl' => $request->videourl
            ]);
        }
        
        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\University  $university
     * @return \Illuminate\Http\Response
     */
    public function destroy(University $university)
    {
        //
    }
}
