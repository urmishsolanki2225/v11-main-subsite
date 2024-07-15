<?php

namespace App\View\Components;

use Illuminate\View\Component;

class NewsletterSignupFormSubsite extends Component
{
    public $action;
    public $formId;
    public $lang;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(string $id = "")
    {
        $this->action = config(
            "eiie.newsletter_signup_url_clickdimensions",
            "https://analytics-eu.clickdimensions.com/forms/h/ah59JE4EL00Gguwqp9QqgJ"
        );
        $this->formId = $id;
        $locale = \App::getLocale();
        if ($locale == "es") {
            $this->lang = 2;
        } elseif ($locale == "fr") {
            $this->lang = 1;
        } else {
            $this->lang = 0;
        }
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view("components.newsletter-signup-form-subsite");
    }
}
