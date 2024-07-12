# Changes File Listing ( Find with Comment  -> Subsite section start & Subsite section end )
# Laravel
1. v11-main-subsite\app\Actions
    - AllowedCollectionsLayouts.php
    - CreateResourceItem.php
    - FetchSubsite.php *
2. v11-main-subsite\app\Exceptions
    - SubdomainInactiveException.php *
3. v11-main-subsite\app\Filters
    - SubsiteCampaignFilter.php *
    - SubsiteCollectionFilter.php *
4. v11-main-subsite\app\Helpers
    - BackendClass.php
5. v11-main-subsite\app\Http\Controllers\Admin
    - CollectionController.php
    - ItemController.php
    - SubsiteController.php *
    - UserController.php
6. v11-main-subsite\app\Http\Controllers
    - CoopProjectController.php
    - SubsiteUserController.php *
7. v11-main-subsite\app\Http\Middleware
    - HandleInertiaRequests.php
    - Language.php
8. v11-main-subsite\app\Models
    - Item.php
    - ItemContent.php
    - Subsite.php
    - SubsiteContactUs.php
9. v11-main-subsite\app\Policies\
    - CollectionPolicy.php
    - ItemPolicy.php
10. v11-main-subsite\app\View\Components
    - LinkSubsite.php
    - NewsletterSignupCarouselSubsite.php
    - NewsletterSignupFormSubsite.php
    - PrimaryNavigationSubsite.php
11. v11-main-subsite\routes\
    - breadcrumbs.php
    - web.php
12 v11-main-subsite\resources\sass
    - style-subsite.scss
13. v11-main-subsite\resources\views\
    - subsite-contactus.blade.php
    - subsite-home.blade.php
    - subsite-item.blade.php
    - subsite-main.blade.php
    - subsite-search-adv.blade.php
    - subsite-search.blade.php
14. v11-main-subsite\resources\views\collection
    - subsite-affiliates.blade.php
    - subsite-base_landing.blade.php
    - subsite-base.blade.php
    - subsite-cards_collections.blade.php
    - subsite-collection.blade.php
    - subsite-country_items.blade.php
    - subsite-country_subnavigation.blade.php
    - subsite-country.blade.php
    - subsite-default.blade.php
    - subsite-dossier_sub.blade.php
    - subsite-dossier.blade.php
    - subsite-items.blade.php
    - subsite-region.blade.php
    - subsite-subcoll_cards.blade.php
    - subsite-worlds_of_education.blade.php
