<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\CompanyprofileController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\UniversityController;
use App\Http\Controllers\DegreeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\SliderController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\SectionController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\SociallinkController;
use App\Http\Controllers\NewsfeedController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\StudentregistrationController;
use App\Http\Controllers\GeneralqueryController;
use App\Http\Controllers\RecentVisaController;
use App\Http\Controllers\CounterController;
use App\Http\Controllers\ComponentController;
/*
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [LoginController::class, 'authenticate']);
Route::post('registration', [RegistrationController::class, 'register']);

Route::post('companysetup', [CompanyprofileController::class, 'create']);
Route::get('companysetup', [CompanyprofileController::class, 'show']);
Route::post('companysetup/{id}', [CompanyprofileController::class, 'update']);

Route::get('country', [CountryController::class, 'show']);
Route::post('country/add', [CountryController::class, 'create']);
Route::get('country/edit/{id}', [CountryController::class, 'edit']);
Route::post('country/update/{id}', [CountryController::class, 'update']);

Route::get('alluniversity', [UniversityController::class, 'alluniversity']);
Route::get('university', [UniversityController::class, 'show']);
Route::post('university/add', [UniversityController::class, 'store']);
Route::get('university/edit/{id}', [UniversityController::class, 'edit']);
Route::post('university/update/{id}', [UniversityController::class, 'update']);

Route::get('universitylist/{id}', [UniversityController::class, 'universitylist']);

Route::get('degree', [DegreeController::class, 'show']);
Route::post('degree/add', [DegreeController::class, 'store']);
Route::get('degree/edit/{id}', [DegreeController::class, 'edit']);
Route::post('degree/update/{id}', [DegreeController::class, 'update']);

Route::get('course', [CourseController::class, 'show']);
Route::post('course/add', [CourseController::class, 'store']);
Route::get('course/edit/{id}', [CourseController::class, 'edit']);
Route::post('course/update/{id}', [CourseController::class, 'update']);

Route::get('coursedetails/{id}', [CourseController::class, 'coursedetails']);

Route::get('course/university/{id}', [CourseController::class, 'universitycourse']);

Route::get('graduatecourse/{id}', [CourseController::class, 'graduatecourse']);

Route::get('undergraduatecourse/{id}', [CourseController::class, 'undergraduatecourse']);

Route::get('diplomacourse/{id}', [CourseController::class, 'diplomacourse']);

Route::get('gcourse', [CourseController::class, 'gcourse']);

Route::get('undergcourse', [CourseController::class, 'undergcourse']);

Route::get('dcourse', [CourseController::class, 'dcourse']);

Route::get('client', [ClientController::class, 'show']);
Route::post('client/add', [ClientController::class, 'store']);
Route::get('client/edit/{id}', [ClientController::class, 'edit']);
Route::post('client/update/{id}', [ClientController::class, 'update']);

Route::get('contact', [ContactController::class, 'show']);
Route::post('contact/add', [ContactController::class, 'store']);
Route::get('contact/edit/{id}', [ContactController::class, 'edit']);
Route::post('contact/update/{id}', [ContactController::class, 'update']);

Route::get('image', [ImageController::class, 'show']);
Route::post('image/add', [ImageController::class, 'store']);
Route::get('image/edit/{id}', [ImageController::class, 'edit']);
Route::post('image/update/{id}', [ImageController::class, 'update']);

Route::get('slider', [SliderController::class, 'show']);
Route::post('slider/add', [SliderController::class, 'store']);
Route::get('slider/edit/{id}', [SliderController::class, 'edit']);
Route::post('slider/update/{id}', [SliderController::class, 'update']);

Route::get('menu', [MenuController::class, 'show']);
Route::post('menu/add', [MenuController::class, 'store']);
Route::get('menu/edit/{id}', [MenuController::class, 'edit']);
Route::post('menu/update/{id}', [MenuController::class, 'update']);

Route::get('submenu/{id}', [MenuController::class, 'submenu']);

Route::get('section', [SectionController::class, 'show']);
Route::post('section/add', [SectionController::class, 'store']);
Route::get('section/edit/{id}', [SectionController::class, 'edit']);
Route::post('section/update/{id}', [SectionController::class, 'update']);
// Route::get('section/{slug}', [SectionController::class, 'showsection']);
Route::get('section/{id}', [SectionController::class, 'showsectionById']);

Route::get('component', [ComponentController::class, 'show']);
Route::post('component/add', [ComponentController::class, 'store']);
Route::post('component/edit/{id}', [ComponentController::class, 'edit']);
Route::post('component/update/{id}', [ComponentController::class, 'update']);

Route::get('review', [ReviewController::class, 'show']);
Route::post('review/add', [ReviewController::class, 'store']);
Route::get('review/edit/{id}', [ReviewController::class, 'edit']);
Route::post('review/update/{id}', [ReviewController::class, 'update']);

Route::get('faq', [FaqController::class, 'show']);
Route::post('faq/add', [FaqController::class, 'store']);
Route::get('faq/edit/{id}', [FaqController::class, 'edit']);
Route::post('faq/update/{id}', [FaqController::class, 'update']);

Route::get('sociallink', [SociallinkController::class, 'show']);
Route::post('sociallink/add', [SociallinkController::class, 'store']);
Route::get('sociallink/edit/{id}', [SociallinkController::class, 'edit']);
Route::post('sociallink/update/{id}', [SociallinkController::class, 'update']);

Route::get('newsfeed', [NewsfeedController::class, 'show']);
Route::post('newsfeed/add', [NewsfeedController::class, 'store']);
Route::get('newsfeed/edit/{id}', [NewsfeedController::class, 'edit']);
Route::post('newsfeed/update/{id}', [NewsfeedController::class, 'update']);

Route::get('event', [EventController::class, 'show']);
Route::post('event/add', [EventController::class, 'store']);
Route::get('event/edit/{id}', [EventController::class, 'edit']);
Route::post('event/update/{id}', [EventController::class, 'update']);

Route::get('studentregistration', [StudentregistrationController::class, 'show']);
Route::post('studentregistration/add', [StudentregistrationController::class, 'store']);
Route::get('studentregistration/edit/{id}', [StudentregistrationController::class, 'edit']);
Route::post('studentregistration/update/{id}', [StudentregistrationController::class, 'update']);

Route::get('generalquery', [GeneralqueryController::class, 'show']);
Route::post('generalquery/add', [GeneralqueryController::class, 'store']);
Route::get('generalquery/edit/{id}', [GeneralqueryController::class, 'edit']);
Route::post('generalquery/update/{id}', [GeneralqueryController::class, 'update']);

Route::get('recentvisasuccess', [RecentVisaController::class, 'show']);
Route::post('recentvisasuccess/add', [RecentVisaController::class, 'store']);
Route::post('recentvisasuccess/edit/{id}', [RecentVisaController::class, 'edit']);
Route::post('recentvisasuccess/update/{id}', [RecentVisaController::class, 'update']);

Route::get('counter', [CounterController::class, 'show']);
Route::post('counter/add', [CounterController::class, 'store']);
Route::get('counter/edit/{id}', [CounterController::class, 'edit']);
Route::post('counter/update/{id}', [CounterController::class, 'update']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
