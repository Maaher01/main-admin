<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
class CourseController extends Controller
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
            'subtitle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'countryid' => ['required'],
            'degreeid' => ['required'],
            'universityid' => ['required'],
            'livingcost' => ['required', 'string', 'max:255'],
            'tutionfees' => ['required', 'string', 'max:255'],
            'applicationfees' => ['required', 'string', 'max:255'],
            'programintake' => ['required', 'string', 'max:255']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('coursedocument', 'public'); // Store the image in the "public/companyimage" directory
        }   

        $profile = Course::create([
            '_title' => $request->title,
            '_subtitle' => $request->subtitle,
            '_description' => $request->description,
            '_credit' => $request->credit,
            '_duration' => $request->duration,
            '_countryid' => $request->countryid,
            '_degreeid' => $request->degreeid,
            '_universityid' => $request->universityid,
            '_livingcost' => $request->livingcost,
            '_tutionfees' => $request->tutionfees,
            '_applicationfees' => $request->applicationfees,
            '_programintake' => $request->programintake,
            '_programintakeopendate' => date("Y-m-d ",strtotime($request->fromdate)),
            '_programintakedeadline' =>  date("Y-m-d ",strtotime($request->todate)),
            '_document' => asset("/uploads")."/".$path
        ]);

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request,Course $course)
    {
        
       if($request->limit){
          $limit = $request->limit; 
       }else{
           $limit = 20;
       }
        
        
        
        
        
        
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->paginate($limit);
        return response()->json(['status' => true, 'data' => $profile]);
    }


    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function universitycourse(Course $course, $id)
    {
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')->where('universities.id',$id)
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->take(10)->get();
        return response()->json(['status' => true, 'data' => $profile]);
    }


    public function graduatecourse(Course $course, $id)
    {
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')->where('universities.id',$id)->where('degrees.id',2)
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->take(10)->get();
        return response()->json(['status' => true, 'data' => $profile]);
    }
    
    
    public function gcourse(Course $course)
    {
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')->where('degrees.id',2)
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->inRandomOrder()->take(15)->get();
        return response()->json(['status' => true, 'data' => $profile]);
    }
    
    
    public function undergcourse(Course $course)
    {
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')->where('degrees.id',1)
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->inRandomOrder()->take(15)->get();
        return response()->json(['status' => true, 'data' => $profile]);
    }
    
    public function dcourse(Course $course)
    {
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')->where('degrees.id',3)
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->inRandomOrder()->take(15)->get();
        return response()->json(['status' => true, 'data' => $profile]);
    }


    public function undergraduatecourse(Course $course, $id)
    {
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')->where('universities.id',$id)->where('degrees.id',1)
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->take(10)->get();
        return response()->json(['status' => true, 'data' => $profile]);
    }


    public function diplomacourse(Course $course, $id)
    {
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')->where('universities.id',$id)->where('degrees.id',3)
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->take(10)->get();
        return response()->json(['status' => true, 'data' => $profile]);
    }












    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function edit(Course $course,$id)
    {
        $profile = Course::where('id',$id)->first();
        return response()->json(['status' => true, 'data' => $profile]);
    }
    
    public function coursedetails(Course $course, $id)
    {
        $profile = DB::table('courses')
            ->join('countries', 'courses._countryid', '=', 'countries.id')
            ->join('degrees', 'courses._degreeid', '=', 'degrees.id')
            ->join('universities', 'courses._universityid', '=', 'universities.id')->where('courses.id',$id)
            ->select('courses.*', 'countries._name as countryname','degrees._title as degreename','universities._name as universityname')
            ->first();
        return response()->json(['status' => true, 'data' => $profile]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Course $course,$id)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'countryid' => ['required'],
            'degreeid' => ['required'],
            'universityid' => ['required'],
            'livingcost' => ['required', 'string', 'max:255'],
            'tutionfees' => ['required', 'string', 'max:255'],
            'applicationfees' => ['required', 'string', 'max:255'],
            'programintake' => ['required', 'string', 'max:255']
        ]);

        if($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation Error', 'errors' => $validator->errors()], 202);
        }
        
        $path = "";
        if($request->hasFile('image')){  
            $image = $request->file('image');
            $path = $image->store('coursedocument', 'public'); // Store the image in the "public/companyimage" directory
        }  
        
        if($request->hasFile('image')){  
            $profile = Course::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_description' => $request->description,
                '_credit' => $request->credit,
                '_duration' => $request->duration,
                '_countryid' => $request->countryid,
                '_degreeid' => $request->degreeid,
                '_universityid' => $request->universityid,
                '_livingcost' => $request->livingcost,
                '_tutionfees' => $request->tutionfees,
                '_applicationfees' => $request->applicationfees,
                '_programintake' => $request->programintake,
                '_programintakeopendate' => date("Y-m-d ", strtotime($request->fromdate)),
                '_programintakedeadline' =>  date("Y-m-d ", strtotime($request->todate)),
                '_document' => asset("/uploads")."/".$path
            ]);
            
        }else{
            $profile = Course::where('id', '=', $id)->update([
                '_title' => $request->title,
                '_subtitle' => $request->subtitle,
                '_description' => $request->description,
                '_credit' => $request->credit,
                '_duration' => $request->duration,
                '_countryid' => $request->countryid,
                '_degreeid' => $request->degreeid,
                '_universityid' => $request->universityid,
                '_livingcost' => $request->livingcost,
                '_tutionfees' => $request->tutionfees,
                '_applicationfees' => $request->applicationfees,
                '_programintake' => $request->programintake,
                '_programintakeopendate' => date("Y-m-d ", strtotime($request->fromdate)),
                '_programintakedeadline' =>  date("Y-m-d ", strtotime($request->todate))
            ]);
        }
        
        

        return response()->json(['status' => true, 'profile' => $profile]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Course  $course
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        //
    }
}
