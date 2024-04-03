<?php

namespace App\Http\Controllers;

use App\Models\Generalquery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GeneralqueryController extends Controller
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
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:15'],
            'email' => ['required', 'string', 'max:30'],
            
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $profile = Generalquery::create([
            '_firstname' => $request->firstname,
            '_lastname' => $request->lastname,
            '_phone' => $request->phone,
            '_email' => $request->email,
            '_message' => $request->message,
            '_status' => $request->status,
            
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Generalquery  $generalquery
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Generalquery $generalquery)
    {
        $limit = $request->limit;
        $profile = Generalquery::paginate($limit);

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Generalquery  $generalquery
     * @return \Illuminate\Http\Response
     */
    public function edit(Generalquery $generalquery,$id)
    {
        $profile = Generalquery::where('id',$id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Generalquery  $generalquery
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Generalquery $generalquery)
    {
        $validator = Validator::make($request->all(), [
            'firstname' => ['required', 'string', 'max:255'],
            'lastname' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:15'],
            'email' => ['required', 'string', 'max:30'],
            
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        
        $profile = Generalquery::where('id', '=', $id)->update([
            '_firstname' => $request->firstname,
            '_lastname' => $request->lastname,
            '_phone' => $request->phone,
            '_email' => $request->email,
            '_message' => $request->message,
            '_status' => $request->status,
            
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Generalquery  $generalquery
     * @return \Illuminate\Http\Response
     */
    public function destroy(Generalquery $generalquery)
    {
        //
    }
}
