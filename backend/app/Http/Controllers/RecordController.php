<?php

namespace App\Http\Controllers;

use App\Models\Record;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\View\View;

class RecordController extends Controller
{

    // public function index(): View
    // {
    //     $records = Record::where('user_id', Auth::id())->get();
    //     return view('records.index', compact('records'));
    // }

    // public function create(): View
    // {
    //     return view('records.create');
    // }

    public function getRecords(Request $request)
    {
        try {
            $user = $request->user();

            if (!$user) {
                return response()->json(['message' => 'Unauthorized'], 401);
            }

            // Get user's records ordered by latest first
            $records = Record::where('user_id', $user->id)
                           ->orderBy('created_at', 'desc')
                           ->get();

            return response()->json($records, 200);
            
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching records',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'gender' => 'required|string',
            'age' => 'required|integer',
            'weight' => 'required|numeric',
            'height' => 'required|numeric',
            'bmi' => 'required|numeric|min:1',
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $record = $user->records()->create([
            'gender' => $validated['gender'],
            'age' => $validated['age'],
            'weight' => $validated['weight'],
            'height' => $validated['height'],
            'bmi' => $validated['bmi'],
        ]);

        return response()->json([
            'message' => 'BMI record saved successfully!',
            'saved_record' => $record
        ], 201);
    }
}