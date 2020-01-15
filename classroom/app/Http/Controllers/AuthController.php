<?php

namespace App\Http\Controllers;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\RegistersUsers;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Socialite;
use Auth;
use Exception;
use Illuminate\Http\Request;

class AuthController extends Controller
{


    public function register(Request $request)
    {
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = auth()->login($user);

        return $this->respondWithToken($token);
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([

            'access_token' => $token,
            'name' =>auth()->guard('api')->user()->name,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }


    public function redirectToGoogle()
    {
        return Socialite::driver('google')->redirect();
    }


    public function handleGoogleCallback()
    {
        try {
            $user = Socialite::driver('google')->user();
            
            $userModel = new User;
            $createdUser = $userModel->addNew($user);
            Auth::loginUsingId($createdUser->id);
            return redirect()->route('home');
        } catch (Exception $e) {
            return redirect('home');
        }
    }
}