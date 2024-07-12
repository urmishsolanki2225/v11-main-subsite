<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Analytics;

class DashboardController extends Controller
{
    public function home()
    {
        $data = [];

        if (config('analytics.view_id')) {
            $googleClient = Analytics::getAnalyticsService()->getClient();
            $googleClient->fetchAccessTokenWithAssertion();
            $token = $googleClient->getAccessToken();
            $data = [
                'access_token' => $token['access_token'],
                'analytics_view_id' => Analytics::getViewId(),
            ];
        }
        return Inertia::render('Home', $data);
    }
}