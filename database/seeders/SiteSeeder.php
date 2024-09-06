<?php


namespace Database\Seeders;


use App\Services\DictionaryService;
use Illuminate\Database\Seeder;

class SiteSeeder extends Seeder
{

    protected DictionaryService $dictionaryService;

    public function __construct(DictionaryService $dictionaryService)
    {
        $this->dictionaryService = $dictionaryService;
    }

    public function run()
    {

        $user = \App\Models\User::query()->first();
        if(!is_null($user)){
            $this->dictionaryService->set('about_description', '', $user);
            $this->dictionaryService->set('about_contacts_email', 'info@leon.productions', $user);
            $this->dictionaryService->set('about_contacts_whatsapp', 'https://wa.me/380674533225', $user);
            $this->dictionaryService->set('about_contacts_telegram', 'https://t.me/Ivan_Barannikov', $user);
            $this->dictionaryService->set('about_contacts_phone', '+380674533225', $user);
            $this->dictionaryService->set('about_social_instagram_link', '', $user);
            $this->dictionaryService->set('about_social_instagram_published', true, $user);
            $this->dictionaryService->set('about_social_facebook_link', '', $user);
            $this->dictionaryService->set('about_social_facebook_published', true, $user);
            $this->dictionaryService->set('about_social_youtube_link', 'https://www.youtube.com/@leon.productions', $user);
            $this->dictionaryService->set('about_social_youtube_published', true, $user);
            $this->dictionaryService->set('about_social_linkedin_link', 'https://www.linkedin.com/company/leon-post-production', $user);
            $this->dictionaryService->set('about_social_linkedin_published', true, $user);
            $this->dictionaryService->set('about_social_vimeo_link', 'https://vimeo.com/leonpostproduction', $user);
            $this->dictionaryService->set('about_social_vimeo_published', true, $user);

            $this->dictionaryService->set('contact_description', '', $user);
            $this->dictionaryService->set('contact_contacts_email', 'info@leon.productions', $user);
            $this->dictionaryService->set('contact_contacts_whatsapp', 'https://wa.me/380674533225', $user);
            $this->dictionaryService->set('contact_contacts_telegram', 'https://t.me/Ivan_Barannikov', $user);
            $this->dictionaryService->set('contact_contacts_phone', '+380674533225', $user);
            $this->dictionaryService->set('contact_social_instagram_link', '', $user);
            $this->dictionaryService->set('contact_social_instagram_published', true, $user);
            $this->dictionaryService->set('contact_social_facebook_link', '', $user);
            $this->dictionaryService->set('contact_social_facebook_published', true, $user);
            $this->dictionaryService->set('contact_social_youtube_link', 'https://www.youtube.com/@leon.productions', $user);
            $this->dictionaryService->set('contact_social_youtube_published', true, $user);
            $this->dictionaryService->set('contact_social_linkedin_link', 'https://www.linkedin.com/company/leon-post-production', $user);
            $this->dictionaryService->set('contact_social_linkedin_published', true, $user);
            $this->dictionaryService->set('contact_social_vimeo_link', 'https://vimeo.com/leonpostproduction', $user);
            $this->dictionaryService->set('contact_social_vimeo_published', true, $user);

            $this->dictionaryService->set('footer_contacts_email', 'info@leon.productions', $user);
            $this->dictionaryService->set('footer_contacts_whatsapp', 'https://wa.me/380674533225', $user);
            $this->dictionaryService->set('footer_contacts_telegram', 'https://t.me/Ivan_Barannikov', $user);
            $this->dictionaryService->set('footer_contacts_phone', '+380674533225', $user);

        }
    }

}
