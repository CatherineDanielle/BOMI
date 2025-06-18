<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Record;

class BmiController extends Controller
{
    public function estimateBodyComposition($gender, $weight, $height, $age, $bmi)
    {
        $genderCode = $gender === 'male' ? 1 : 0;
        $bfp = (1.20 * $bmi) + (0.23 * $age) - (10.8 * $genderCode) - 5.4; # Body Fat Percentage (BFP) formula

        $lbm = $weight * (1 - ($bfp / 100)); # Lean Body Mass (LBM) calculation
        $boneMass = 0.15 * $lbm; # Bone Mass estimation (15% of LBM)

        $genderCode = $gender === 'male' ? 1 : 2;
        $asm = 0.193 * $weight + 0.107 * $height - 4.157 * $genderCode - 0.037 * $age - 2.631; # Absolute Skeletal Muscle Mass (ASM) calculation

        $other = 100 - $bfp - $asm - $boneMass;

        return [
            'bfp' => round($bfp, 2),
            'muscle_mass' => round($asm, 2),
            'bone_mass' => round($boneMass, 2),
            'other' => round($other, 2)
        ];
    }

    public function calculate_bmi(Request $request)
    {

        $validated = $request->validate([
            'gender' => 'required|string|in:male,female',
            'weight' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'age' => 'required|integer|min:0'
        ]);

        $weight = $validated['weight'];
        $heightCm = $validated['height'];
        $height = $heightCm / 100;

        if ($height <= 0 || $weight <= 0) {
            return response()->json(['error' => 'Invalid weight or height'], 400);
        }

        $bmi = $weight / ($height ** 2);
        $bmi = round($bmi, 2);
        
        $category = match (true) {
            $bmi < 18.5 => 'Underweight',
            $bmi < 24.9 => 'Normal weight',
            $bmi < 29.9 => 'Overweight',
            default => 'Obese'
        };

        if (Auth::check()) {
            Record::create([
                'user_id' => Auth::id(),
                'gender' => $validated['gender'],
                'age' => $validated['age'],
                'weight' => $weight,
                'height' => $heightCm,
                'bmi' => $bmi
            ]);
        }

        $composition = $this->estimateBodyComposition(
            $validated['gender'],
            $weight,
            $heightCm,
            $validated['age'],
            $bmi
        );

        return response()->json([
            'bmi' => $bmi,
            'category' => $category,
            'composition' => $composition
        ]);
    }

    public function calculate_bmi_no_login(Request $request)
    {

        $validated = $request->validate([
            'gender' => 'required|string|in:male,female',
            'weight' => 'required|numeric|min:0',
            'height' => 'required|numeric|min:0',
            'age' => 'required|integer|min:0'
        ]);

        $weight = $validated['weight'];
        $heightCm = $validated['height'];
        $height = $heightCm / 100;

        if ($height <= 0 || $weight <= 0) {
            return response()->json(['error' => 'Invalid weight or height'], 400);
        }

        $bmi = $weight / ($height ** 2);
        $bmi = round($bmi, 2);
        
        $category = match (true) {
            $bmi < 18.5 => 'Underweight',
            $bmi < 24.9 => 'Normal weight',
            $bmi < 29.9 => 'Overweight',
            default => 'Obese'
        };

        $composition = $this->estimateBodyComposition(
            $validated['gender'],
            $weight,
            $heightCm,
            $validated['age'],
            $bmi
        );

        return response()->json([
            'bmi' => $bmi,
            'category' => $category,
            'composition' => $composition
        ]);
    }
}
