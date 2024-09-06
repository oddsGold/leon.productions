<?php


namespace Database\Seeders;


use App\Services\DictionaryService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Vite;

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
            $this->dictionaryService->set('about_description', 'We are a post-production company based in Kyiv, Ukraine, specializing in commercials, movies, and design. Our focus is on producing post-production and visual effects projects of any complexity. Our services encompass the entire post-production process, from pre-production supervision and management to final project mastering, including all stages of editing, animation, VFX, and final grading.Founded in late 2023, our team comprises experienced and passionate professionals united by a common goal: to deliver exceptional results for our clients.', $user);
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

            $this->dictionaryService->set('contact_description', 'VFX, CGI and even moreLet’s talk about it.', $user);
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

            $this->dictionaryService->set('social_instagram_icon', Vite::image('social/social-media-instagram-icon.svg'), $user);
            $this->dictionaryService->set('social_facebook_icon', Vite::image('social/social-media-facebook-icon.svg'), $user);
            $this->dictionaryService->set('social_youtube_icon', Vite::image('social/social-media-youtube-icon.svg'), $user);
            $this->dictionaryService->set('social_linkedin_icon', Vite::image('social/social-media-linkedin-icon.svg'), $user);
            $this->dictionaryService->set('social_vimeo_icon', Vite::image('social/social-media-vimeo-icon.svg'), $user);

        }
    }

}
