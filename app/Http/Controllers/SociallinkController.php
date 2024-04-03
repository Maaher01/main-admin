<?php

namespace App\Http\Controllers;

use App\Models\Sociallink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class SociallinkController extends Controller
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
            'url' => ['required', 'string'],
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $profile = Sociallink::create([
            '_title' => $request->title,
            '_url' => $request->url
            
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Sociallink  $sociallink
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Sociallink $sociallink)
    {
        $limit = $request->limit; 
        $profile = Sociallink::paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Sociallink  $sociallink
     * @return \Illuminate\Http\Response
     */
    public function edit(Sociallink $sociallink, $id)
    {
        $profile = Sociallink::where('id',$id)->first();
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Sociallink  $sociallink
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sociallink $sociallink, $id)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'url' => ['required', 'string'],
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }

        $profile = Sociallink::where('id', '=', $id)->update([
            '_title' => $request->title,
            '_url' => $request->url
             
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Sociallink  $sociallink
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sociallink $sociallink)
    {
        //
    }
}
