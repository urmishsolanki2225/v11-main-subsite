<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Collection;
use Illuminate\Http\Request;
use Mail;
use App\Mail\ContactUs;

class ContactController extends Controller
{
    /**
     */
    public function show()
    {
        $offices = Collection::find(
            config("eiie.collection.contact-offices", 0)
        );
        if ($offices) {
            $offices = $offices->items;
        }
        return view("contactus", ["offices" => $offices]);
    }

    public function contactPost(Request $request)
    {
        $this->validate(
            $request,
            [
                // 'first_name' => 'string',
                'first_name' => 'required',
                'last_name' => 'required',
                "email" => "required|email",
                "message" => "required",
            ],
            [
                "email.required" => __("eiie.Email is required"),
                "message.required" => __("eiie.Message is required"),
            ]
        );
        if ($request->isRobot()) {
            // return back()->with('success', __('eiie.contact_us_fail'));
            abort(500);
        }
        $name = trim(
            $request->get("first_name") . " " . $request->get("last_name")
        );
        $mailData = $request->only("email", "phone");
        $mailData["name"] = $name;
        $mailData["subject"] = trim(
            "Website contact " . $request->get("subject")
        );
        $mailData["mailMessage"] = $request->get("message");

        Mail::to(
            config("eiie.contact_form_rcpt", "headoffice@ei-ie.org")
        )->send(new ContactUs($mailData));

        return back()->with("success", __("eiie.contact_us_thanks"));
    }
}
