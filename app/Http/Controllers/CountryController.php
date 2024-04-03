<?php

namespace App\Http\Controllers;
use App\Models\Country;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;

class CountryController extends Controller
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
            'name' => ['required', 'string', 'max:255']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('countryimage', 'public'); // Store the image in the "public/companyimage" directory
        }   


        $profile = Country::create([
            '_name' => $request->name,
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Country $country)
    {
        $limit = $request->limit;
        $countryprofile = Country::paginate($limit);
        return response()->json(['status' => true, 'data' => $countryprofile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function edit(Country $country,$id)
    {
        $profile = Country::where('id',$id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Country $country,$id)
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
            $path = $image->store('countryimage', 'public'); // Store the image in the "public/companyimage" directory
        } 
        
        if($request->hasFile('image')){  
            
            $profile = Country::where('id', '=', $id)->update([
                '_name' => $request->name,
                '_image' => asset("/uploads")."/".$path,
               
            ]);
            
        }else{
             $profile = Country::where('id', '=', $id)->update([
                '_name' => $request->name
            ]);    
        }
        
        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Country  $country
     * @return \Illuminate\Http\Response
     */
    public function destroy(Country $country)
    {
        //
    }
}
