<?php

namespace App\Mail;

use App\Models\CoopProject;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CoopProjectReceived extends Mailable
{
    use Queueable, SerializesModels;

    public $title;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($title)
    {
        $this->title = $title;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from(
            "Solidarity@ei-ie.org",
            "Education International Solidarity"
        )
            ->subject("Cooperation Project submitted")
            ->markdown("emails.coop_project.received");
    }
}
