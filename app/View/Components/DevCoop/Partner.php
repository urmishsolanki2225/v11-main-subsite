<?php

namespace App\View\Components\DevCoop;

use App\Models\CoopProjectPartner;
use Illuminate\View\Component;

class Partner extends Component
{
    /**
     * @var CoopProjectPartner
     */
    public $partner;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(CoopProjectPartner $partner)
    {
        $this->partner = $partner;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        return view("components.dev-coop.partner");
    }
}
