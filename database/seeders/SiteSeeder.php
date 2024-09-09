<?php


namespace Database\Seeders;


use App\Services\About\TypeOfWorksService;
use App\Services\CaseService;
use App\Services\DictionaryService;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Vite;

class SiteSeeder extends Seeder
{

    protected DictionaryService $dictionaryService;
    protected TypeOfWorksService $typeOfWorksService;
    protected CaseService $caseService;

    public function __construct(
        DictionaryService $dictionaryService, TypeOfWorksService $typeOfWorksService,
        CaseService $caseService
    ){
        $this->dictionaryService = $dictionaryService;
        $this->typeOfWorksService = $typeOfWorksService;
        $this->caseService = $caseService;
    }

    public function run()
    {

        $user = \App\Models\User::query()->first();
        if(!is_null($user)){
            auth()->guard()->setUser($user);

            $this->dictionaryService->set('about_description', '<p>We are a post-production company based in Kyiv, Ukraine, specializing in commercials, movies, and design. Our focus is on producing post-production and visual effects projects of any complexity.</p><p>Our services encompass the entire post-production process, from pre-production supervision and management to final project mastering, including all stages of editing, animation, VFX, and final grading.</p><p>Founded in late 2023, our team comprises experienced and passionate professionals united by a common goal: to deliver exceptional results for our clients.</p>');
            $this->dictionaryService->set('about_contacts_email', 'info@leon.productions');
            $this->dictionaryService->set('about_contacts_whatsapp', 'https://wa.me/380674533225');
            $this->dictionaryService->set('about_contacts_telegram', 'https://t.me/Ivan_Barannikov');
            $this->dictionaryService->set('about_contacts_phone', '+380674533225');
            $this->dictionaryService->set('about_social_instagram_link', '');
            $this->dictionaryService->set('about_social_instagram_published', true);
            $this->dictionaryService->set('about_social_facebook_link', '');
            $this->dictionaryService->set('about_social_facebook_published', true);
            $this->dictionaryService->set('about_social_youtube_link', 'https://www.youtube.com/@leon.productions');
            $this->dictionaryService->set('about_social_youtube_published', true);
            $this->dictionaryService->set('about_social_linkedin_link', 'https://www.linkedin.com/company/leon-post-production');
            $this->dictionaryService->set('about_social_linkedin_published', true);
            $this->dictionaryService->set('about_social_vimeo_link', 'https://vimeo.com/leonpostproduction');
            $this->dictionaryService->set('about_social_vimeo_published', true);

            $this->dictionaryService->set('contact_description', '<p>VFX, CGI and even more</p><p>Let’s talk about it.</p>');
            $this->dictionaryService->set('contact_contacts_email', 'info@leon.productions');
            $this->dictionaryService->set('contact_contacts_whatsapp', 'https://wa.me/380674533225');
            $this->dictionaryService->set('contact_contacts_telegram', 'https://t.me/Ivan_Barannikov');
            $this->dictionaryService->set('contact_contacts_phone', '+380674533225');
            $this->dictionaryService->set('contact_social_instagram_link', '');
            $this->dictionaryService->set('contact_social_instagram_published', true);
            $this->dictionaryService->set('contact_social_facebook_link', '');
            $this->dictionaryService->set('contact_social_facebook_published', true);
            $this->dictionaryService->set('contact_social_youtube_link', 'https://www.youtube.com/@leon.productions');
            $this->dictionaryService->set('contact_social_youtube_published', true);
            $this->dictionaryService->set('contact_social_linkedin_link', 'https://www.linkedin.com/company/leon-post-production');
            $this->dictionaryService->set('contact_social_linkedin_published', true);
            $this->dictionaryService->set('contact_social_vimeo_link', 'https://vimeo.com/leonpostproduction');
            $this->dictionaryService->set('contact_social_vimeo_published', true);

            $this->dictionaryService->set('footer_contacts_email', 'info@leon.productions');
            $this->dictionaryService->set('footer_contacts_whatsapp', 'https://wa.me/380674533225');
            $this->dictionaryService->set('footer_contacts_telegram', 'https://t.me/Ivan_Barannikov');
            $this->dictionaryService->set('footer_contacts_phone', '+380674533225');

            $this->dictionaryService->set('social_instagram_icon', Vite::image('social/social-media-instagram-icon.svg'));
            $this->dictionaryService->set('social_facebook_icon', Vite::image('social/social-media-facebook-icon.svg'));
            $this->dictionaryService->set('social_youtube_icon', Vite::image('social/social-media-youtube-icon.svg'));
            $this->dictionaryService->set('social_linkedin_icon', Vite::image('social/social-media-linkedin-icon.svg'));
            $this->dictionaryService->set('social_vimeo_icon', Vite::image('social/social-media-vimeo-icon.svg'));


            $this->typeOfWorksService->create(['name' => 'Compositing, keying, camera tracking, matchmoving, rotoscoping']);
            $this->typeOfWorksService->create(['name' => '3D modeling, lighting and shading']);
            $this->typeOfWorksService->create(['name' => 'Editing and Grading']);
            $this->typeOfWorksService->create(['name' => 'Creative and concept arts']);
            $this->typeOfWorksService->create(['name' => 'Illustrations and iconographic']);
            $this->typeOfWorksService->create(['name' => 'Matte painting and set extension']);
            $this->typeOfWorksService->create(['name' => 'Rigging and characters animation']);
            $this->typeOfWorksService->create(['name' => 'AR/VR content']);
            $this->typeOfWorksService->create(['name' => 'UX/UI design']);
            $this->typeOfWorksService->create(['name' => 'HTML5 banners']);
            $this->typeOfWorksService->create(['name' => 'Motion and Cartoon animation']);
            $this->typeOfWorksService->create(['name' => 'Grooming and simulationsGrooming and simulations']);
            $this->typeOfWorksService->create(['name' => 'Sound (mixing, mastering, musician)']);
            $this->typeOfWorksService->create(['name' => '2D design key-visuals and banners']);
            $this->typeOfWorksService->create(['name' => '2D design key-visuals and banners']);

            $this->caseService->create([
                'description' => 'Case 1',
                'preview_url' => 'https://vimeo.com/1006942030',
                'main_url' => 'https://vimeo.com/1005738326',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 2, video, text, longtext',
                'preview_url' => 'https://vimeo.com/1006943555 ',
                'main_url' => 'https://vimeo.com/1005749460 ',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 3 Tele2',
                'preview_url' => 'https://vimeo.com/1006944133',
                'main_url' => 'https://vimeo.com/1005750928',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 4 TON',
                'preview_url' => 'https://vimeo.com/1006949823',
                'main_url' => 'https://vimeo.com/1005752611',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 05 CIVILIAN',
                'preview_url' => 'https://vimeo.com/1006950994',
                'main_url' => 'https://vimeo.com/1005754668',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 06 Spilva',
                'preview_url' => 'https://vimeo.com/1006951989',
                'main_url' => 'https://vimeo.com/1005756188',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 07 Glo',
                'preview_url' => 'https://vimeo.com/1006952579',
                'main_url' => 'https://vimeo.com/1006937013',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 08 Bite 5G cars',
                'preview_url' => 'https://vimeo.com/1006954399',
                'main_url' => 'https://vimeo.com/1005757795',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 09 Boat liquid',
                'preview_url' => 'https://vimeo.com/1006954988',
                'main_url' => 'https://vimeo.com/1005759831',
                'published' => true,
            ]);
            $this->caseService->create([
                'description' => 'Case 10 Fields with text',
                'preview_url' => 'https://vimeo.com/1006955410',
                'main_url' => 'https://vimeo.com/1005760489',
                'published' => true,
            ]);

        }
    }

}
