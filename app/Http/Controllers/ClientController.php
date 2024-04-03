<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
class ClientController extends Controller
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
            $path = $image->store('clientimage', 'public'); // Store the image in the "public/companyimage" directory
        }   


        $profile = Client::create([
            '_title' => $request->name,
            '_image' => asset("/uploads")."/".$path,
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Client $client)
    {
       
        $limit = $request->limit;
        $profile = Client::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response,
     */
    public function edit(Client $client, $id)
    {
        $profile = Client::where('id',$id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client, $id)
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
            $path = $image->store('clientimage', 'public'); // Store the image in the "public/companyimage" directory
        }   

        if($request->hasFile('image')){
            $profile = Client::where('id', '=', $id)->update([
                '_title' => $request->name,
                '_image' => asset("/uploads")."/".$path,
            
            ]);
        }else{
            $profile = Client::where('id', '=', $id)->update([
                '_title' => $request->name
            ]);
        }

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        //
    }
}
