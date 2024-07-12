<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Str;

class LoginController extends Controller
{

    public function login() {
        if (Auth::check()) {
            return redirect()->intended(route('admin.dashboard'));
        }
        return Inertia::render('Login/Login');
    }

    public function logout(Request $request) {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return Inertia::render('Login/Login');
    }
    
    public function authenticate(Request $request) {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended(route('admin.dashboard'));
        }

        return back()->withErrors([
            'email' => 'The provided credentials do not match our records.',
        ]);
    }

    public function passwordForgot(Request $request) {
        return Inertia::render('Login/PasswordForgot');
    }

    public function passwordRequest(Request $request) {
        $request->validate(['email' => 'required|email']);

        $status = Password::sendResetLink(
            $request->only('email')
        );
    
        return $status === Password::RESET_LINK_SENT
                    ? back()->with(['info' => __($status)])
                    : back()->withErrors(['email' => __($status)]);
    }

    public function passwordReset(Request $request, $token) {
        $email = $request->input('email');
        return Inertia::render('Login/PasswordReset', ['token' => $token, 'email' => $email]);
    }

    public function passwordUpdate(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:12|confirmed',
        ]);

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) use ($request) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
    
                $user->save();
    
                event(new PasswordReset($user));
            }
        );

        if ($status != Password::PASSWORD_RESET) {
            return Redirect::back()->withErrors(['error' => [__($status)]]);
        }
        return Inertia::render('Login/Login', ['flash' => ['info' => __($status)]]);
    }
}
