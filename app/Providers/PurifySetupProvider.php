<?php

/* 
    https://github.com/stevebauman/purify#custom-configuration-rules 
 */

namespace App\Providers;

use HTMLPurifier_HTMLDefinition;
use Stevebauman\Purify\Facades\Purify;
use Illuminate\Support\ServiceProvider;

class PurifySetupProvider extends ServiceProvider
{
    const DEFINITION_ID = "eiie-editor";
    const DEFINITION_REV = 7;

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        /** @var \HTMLPurifier $purifier */
        $purifier = Purify::getPurifier();

        /** @var \HTMLPurifier_Config $config */
        $config = $purifier->config;

        $config->set("HTML.DefinitionID", static::DEFINITION_ID);
        $config->set("HTML.DefinitionRev", static::DEFINITION_REV);

        if ($def = $config->maybeGetRawHTMLDefinition()) {
            $this->setupDefinitions($def);
        }

        $purifier->config = $config;
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Adds elements and attributes to the HTML purifier
     * definition required by the trix editor.
     *
     * @param HTMLPurifier_HTMLDefinition $def
     */
    protected function setupDefinitions(HTMLPurifier_HTMLDefinition $def)
    {
        $def->addElement("section", "Block", "Flow", "Common");
        $def->addAttribute("section", "class", "Text");
        $def->addAttribute("section", "data-type", "Text");
        $def->addAttribute("section", "data-id", "Text");
        $def->addAttribute("section", "data-url", "Text");

        $def->addElement("header", "Block", "Flow", "Common");
        $def->addAttribute("header", "class", "Text");

        // $def->addElement('figure', 'Block', 'Optional: (blockquote, figcaption) | (figcaption, Flow) | (Flow) | (Flow, figcaption)', 'Common');
        $def->addElement("figure", "Block", "Flow", "Common");
        $def->addAttribute("figure", "class", "Text");
        $def->addAttribute("figure", "data-type", "Text");
        $def->addAttribute("figure", "data-id", "Text");

        $def->addElement("figcaption", "Inline", "Inline", "Common");
        $def->addAttribute("figcaption", "class", "Text");
        // $def->addAttribute('figcaption', 'data-trix-placeholder', 'Text');

        $def->addAttribute("a", "rel", "Text");
        $def->addAttribute("a", "data-type", "Text");
        $def->addAttribute("a", "data-id", "Text");

        $def->addAttribute("iframe", "allowfullscreen", "Enum#true,false,");
        $def->addAttribute("iframe", "allow", "Text");
        // $def->addAttribute('a', 'tabindex', 'Text');
        // $def->addAttribute('a', 'contenteditable', 'Enum#true,false');
        // $def->addAttribute('a', 'data-trix-attachment', 'Text');
        // $def->addAttribute('a', 'data-trix-content-type', 'Text');
        // $def->addAttribute('a', 'data-trix-id', 'Number');

        // $def->addElement('span', 'Block', 'Flow', 'Common');
        // $def->addAttribute('span', 'data-trix-cursor-target', 'Enum#right,left');
        // $def->addAttribute('span', 'data-trix-serialize', 'Enum#true,false');

        // $def->addAttribute('img', 'data-trix-mutable', 'Enum#true,false');
        // $def->addAttribute('img', 'data-trix-store-key', 'Text');
    }
}
