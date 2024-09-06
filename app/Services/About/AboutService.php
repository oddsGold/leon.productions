<?php

namespace App\Services\About;

use App\Services\DictionaryService;

class AboutService
{

    protected DictionaryService $dictionaryService;

    public function __construct(DictionaryService $dictionaryService)
    {
        $this->dictionaryService = $dictionaryService;
    }

    public function getDescription()
    {
        return $this->dictionaryService->get('about_description', '');
    }

    public function updateDescription($description)
    {
        return $this->dictionaryService->set('about_description', $description);
    }

    public function getContacts()
    {
        return [
            'email' => $this->dictionaryService->get('about_contacts_email', null),
            'whatsapp' => $this->dictionaryService->get('about_contacts_whatsapp', null),
            'telegram' => $this->dictionaryService->get('about_contacts_telegram', null),
            'phone' => $this->dictionaryService->get('about_contacts_phone', null),
        ];
    }

    public function updateContacts($data)
    {
        return [
            'email' => $this->dictionaryService->set('about_contacts_email', $data['email']),
            'whatsapp' => $this->dictionaryService->set('about_contacts_whatsapp', $data['whatsapp']),
            'telegram' => $this->dictionaryService->set('about_contacts_telegram', $data['telegram']),
            'phone' => $this->dictionaryService->set('about_contacts_phone', $data['phone']),
        ];
    }

    public function getSocialMedia()
    {
        return [
            'instagram_link' => $this->dictionaryService->get('about_social_instagram_link', null),
            'instagram_published' => $this->dictionaryService->get('about_social_instagram_published', null),
            'facebook_link' => $this->dictionaryService->get('about_social_facebook_link', null),
            'facebook_published' => $this->dictionaryService->get('about_social_facebook_published', null),
            'youtube_link' => $this->dictionaryService->get('about_social_youtube_link', null),
            'youtube_published' => $this->dictionaryService->get('about_social_youtube_published', null),
            'linkedin_link' => $this->dictionaryService->get('about_social_linkedin_link', null),
            'linkedin_published' => $this->dictionaryService->get('about_social_linkedin_published', null),
            'vimeo_link' => $this->dictionaryService->get('about_social_vimeo_link', null),
            'vimeo_published' => $this->dictionaryService->get('about_social_vimeo_published', null),
        ];
    }

    public function updateSocialMedia($data)
    {
        return [
            'instagram_link' => $this->dictionaryService->set('about_social_instagram_link', $data['instagram_link']),
            'instagram_published' => $this->dictionaryService->set('about_social_instagram_published', $data['instagram_published']),
            'facebook_link' => $this->dictionaryService->set('about_social_facebook_link', $data['facebook_link']),
            'facebook_published' => $this->dictionaryService->set('about_social_facebook_published', $data['facebook_published']),
            'youtube_link' => $this->dictionaryService->set('about_social_youtube_link', $data['youtube_link']),
            'youtube_published' => $this->dictionaryService->set('about_social_youtube_published', $data['youtube_published']),
            'linkedin_link' => $this->dictionaryService->set('about_social_linkedin_link', $data['linkedin_link']),
            'linkedin_published' => $this->dictionaryService->set('about_social_linkedin_published', $data['linkedin_published']),
            'vimeo_link' => $this->dictionaryService->set('about_social_vimeo_link', $data['vimeo_link']),
            'vimeo_published' => $this->dictionaryService->set('about_social_vimeo_published', $data['vimeo_published']),
        ];
    }

    public function getResource(): string
    {
        return 'App\Models\About';
    }
}
