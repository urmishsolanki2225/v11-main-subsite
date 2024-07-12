@component('mail::message')
# Thank you 
Thank you for submitting a Cooperation Project titled **{{ $title }}**

As soon as we have validated it, the information will be visible on the EI website in the [Resources / Cooperation Projects section]({{ route("coop_projects.overview") }}).

If you have any questions, you can write to us at [Solidarity@ei-ie.org](Solidarity@ei-ie.org)

If you want to submit another project you can fill out [the form]({{ route("coop_projects.create") }}) again.

Thanks,<br>
Education International
@endcomponent
