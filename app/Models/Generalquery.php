<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Generalquery extends Model
{
    use HasFactory;
    protected $fillable = [
        '_firstname',
        '_lastname',
        '_email',
        '_phone',
        '_message',
        '_status'
    ];
}
