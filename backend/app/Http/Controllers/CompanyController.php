<?php

namespace App\Http\Controllers;

use App\Models\Company;
use Illuminate\Http\Request;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Get all companies
        $companies = Company::all();

        // Return as JSON
        return response()->json($companies, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'company_name' => 'required|string',
            'registration_number' => 'required|string',
            'industry' => 'required|string',
            'address' => 'nullable|string',
            'city' => 'required|string',
            'state' => 'required|string',
            'postal_code' => 'nullable|string',
            'country' => 'required|string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'website' => 'nullable|string',
            'annual_revenue' => 'nullable',
            'number_of_employees' => 'nullable',
            'is_active' => 'boolean',
        ]);

        // Create a new company
        $company = Company::create($validatedData);

        // Return as JSON
        return response()->json($company, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Find the company by ID
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        // Return as JSON
        return response()->json($company, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Find the company by ID
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }
        // Validate the request data
        $validatedData = $request->validate([
            'company_name' => 'string',
            'registration_number' => 'string',
            'industry' => 'string',
            'address' => 'nullable|string',
            'city' => 'string',
            'state' => 'string',
            'postal_code' => 'nullable|string',
            'country' => 'string',
            'phone' => 'nullable|string',
            'email' => 'nullable|email',
            'website' => 'nullable|string',
            'annual_revenue' => 'nullable',
            'number_of_employees' => 'nullable',
            'is_active' => 'boolean',
        ]);
        // Update the company data
        $company->update($validatedData);
        // Return as JSON
        return response()->json($company, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the company by ID
        $company = Company::find($id);

        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }

        // Delete the company
        $company->delete();

        // Return a success message as JSON
        return response()->json(['message' => 'Company deleted successfully'], 200);
    }
}
