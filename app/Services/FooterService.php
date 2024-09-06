<?php

namespace App\Services;

class FooterService
{

    protected DictionaryService $dictionaryService;

    public function __construct(DictionaryService $dictionaryService)
    {
        $this->dictionaryService = $dictionaryService;
    }

    public function getContacts()
    {
        return [
            'email' => $this->dictionaryService->get('footer_contacts_email', null),
            'whatsapp' => $this->dictionaryService->get('footer_contacts_whatsapp', null),
            'telegram' => $this->dictionaryService->get('footer_contacts_telegram', null),
            'phone' => $this->dictionaryService->get('footer_contacts_phone', null),
        ];
    }

    public function updateContacts($data)
    {
        return [
            'email' => $this->dictionaryService->set('footer_contacts_email', $data['email']),
            'whatsapp' => $this->dictionaryService->set('footer_contacts_whatsapp', $data['whatsapp']),
            'telegram' => $this->dictionaryService->set('footer_contacts_telegram', $data['telegram']),
            'phone' => $this->dictionaryService->set('footer_contacts_phone', $data['phone']),
        ];
    }

    public function getResource(): string
    {
        return 'App\Models\Footer';
    }
}
