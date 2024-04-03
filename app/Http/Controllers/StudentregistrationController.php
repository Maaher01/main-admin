<?php

namespace App\Http\Controllers;

use App\Models\Studentregistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use DB;
class StudentregistrationController extends Controller
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
            'name' => ['required', 'string', 'max:255'],
            'mobile' => ['required', 'string', 'max:15'],
            'email' => ['required', 'string', 'max:30'],
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
       
        $profile = Studentregistration::create([
            '_name' => $request->name,
            '_dob' => date("Y-m-d ",strtotime($request->dob)),
            '_ielts' => $request->ielts,
            '_countryid' => $request->countryid,
            '_qualification' => $request->qualification,
            '_mobile' => $request->mobile,
            '_email' => $request->email,
            '_passport' => $request->passport,
            '_status' => $request->status,
        ]);


        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Studentregistration  $studentregistration
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Studentregistration $studentregistration)
    {
        $limit = $request->limit;
        
        $profile = DB::table("studentregistrations")
        ->leftJoin('countries', 'countries.id', '=', 'studentregistrations._countryid')
        ->select('studentregistrations.*', 'countries._name as countryname')->paginate($limit);

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Studentregistration  $studentregistration
     * @return \Illuminate\Http\Response
     */
    public function edit(Studentregistration $studentregistration, $id)
    {
        $profile = Studentregistration::where('id',$id)->first();

        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Studentregistration  $studentregistration
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Studentregistration $studentregistration , $id)
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
        
        
        $profile = Studentregistration::where('id', '=', $id)->update([
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
     * @param  \App\Models\Studentregistration  $studentregistration
     * @return \Illuminate\Http\Response
     */
    public function destroy(Studentregistration $studentregistration)
    {
        //
    }
}
