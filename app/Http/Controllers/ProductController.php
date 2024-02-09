<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProductRequest;
use App\Http\Requests\EditProductRequest;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    public function index()
    {
        return ProductListResource::collection(Product::query()->orderBy('id', 'desc')->paginate(10));
    }

    public function add(CreateProductRequest $request)
    {
        $data = $request->validated();
        $newProduct = Product::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Product created successfully',
            'data' => $newProduct,
        ], Response::HTTP_CREATED);
    }

    public function view(Product $product)
    {
        return new ProductResource($product);
    }

    public function edit(EditProductRequest $request, Product $product)
    {
        $data = $request->validated();
        $product->update($data);
        return new ProductResource($product);
    }

    public function destroy(Product $product)
    {
        $product->delete();
        return response()->noContent();
    }
}
