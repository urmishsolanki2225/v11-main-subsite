<?php

namespace App\Http\Middleware;

use RootInc\LaravelAzureMiddleware\Azure as Azure;
use Microsoft\Graph\Graph;
use Microsoft\Graph\Model;
use Closure;
use Auth;
use App\Models\User;
use GraphServiceAccessHelper;
use Guzzle\Http\Exception\ClientErrorResponseException;
use Redirect;
use Illuminate\Support\Str;

class AppAzure extends Azure
{
    protected function success($request, $access_token, $refresh_token, $profile){
        
        $graph = new Graph();
        $graph->setAccessToken($access_token);
        
        $graph_user = $graph->createRequest("GET", "/me")
                      ->setReturnType(Model\User::class)
                      ->execute();

        if($graph_user->getMail()!=''){

            $email = strtolower($graph_user->getMail());
        }else{
            
            $email = strtolower($graph_user->getUserPrincipalName());
        }

        $user = User::updateOrCreate(['email' => $email],
            [
            'name' => $profile->name,
            'email' => $email,
            'password' => bcrypt(Str::random(20)),
        ]);

        Auth::login($user, true);
        // return Redirect::to('/admin');
        return redirect()->intended(route('admin.dashboard'));
    }
}