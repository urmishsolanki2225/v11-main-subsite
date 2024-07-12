<?php

namespace App\View\Components\AnnualReport;

use Illuminate\View\Component;

class BackToReportButton extends Component
{
    public $year;
    public $month;
    public $congressYears;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->congressYears = request()->input("congress-years", "");
        $this->year = request()->input("annual-report-year");
        $this->month = request()->input("month");
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|\Closure|string
     */
    public function render()
    {
        if (!$this->year) {
            // don't render
            return;
        }
        return view("reports.back-to-report-button", [
            "url" =>
                ($this->congressYears &&
                count(explode("-", $this->congressYears)) === 2
                    ? route("governance.reports.world-congress-report", [
                        "year_from" => explode("-", $this->congressYears)[0],
                        "year_to" => explode("-", $this->congressYears)[1],
                    ])
                    : route("governance.reports.annual-report.show", [
                        "year" => $this->year,
                    ])) .
                "#" .
                $this->year .
                "/" .
                $this->month,
        ]);
    }
}
