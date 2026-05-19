<?php

use App\Http\Controllers\Api\TaxonomyController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\AdminTaxonomyController;

// Auth Routes
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);

    // Admin Taxonomy CRUD
    Route::post('/admin/families', [AdminTaxonomyController::class, 'storeFamily']);
    Route::put('/admin/families/{family}', [AdminTaxonomyController::class, 'updateFamily']);
    Route::delete('/admin/families/{family}', [AdminTaxonomyController::class, 'destroyFamily']);

    Route::post('/admin/genera', [AdminTaxonomyController::class, 'storeGenus']);
    Route::put('/admin/genera/{genus}', [AdminTaxonomyController::class, 'updateGenus']);
    Route::delete('/admin/genera/{genus}', [AdminTaxonomyController::class, 'destroyGenus']);

    Route::post('/admin/species', [AdminTaxonomyController::class, 'storeSpecies']);
    Route::get('/admin/species/{species}', [AdminTaxonomyController::class, 'showSpecies']);
    Route::put('/admin/species/{species}', [AdminTaxonomyController::class, 'updateSpecies']);
    Route::delete('/admin/species/{species}', [AdminTaxonomyController::class, 'destroySpecies']);
    
    Route::post('/admin/species/{species}/upload', [AdminTaxonomyController::class, 'uploadImage']);
});

// Taxonomy Routes
Route::get('/families', [TaxonomyController::class, 'families']);
Route::get('/families/{name}', [TaxonomyController::class, 'family']);
Route::get('/genera', [TaxonomyController::class, 'genera']);
Route::get('/genera/{name}', [TaxonomyController::class, 'genus']);
Route::get('/species', [TaxonomyController::class, 'species']);
Route::get('/species-of-the-day', [TaxonomyController::class, 'speciesOfTheDay']);
Route::get('/species/{scientificName}', [TaxonomyController::class, 'specimen']);
Route::get('/search', [TaxonomyController::class, 'search']);
