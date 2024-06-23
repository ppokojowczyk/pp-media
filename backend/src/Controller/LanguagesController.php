<?php

namespace App\Controller;

use App\Languages\Languages;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class LanguagesController extends AbstractController
{
    protected $languages;

    public function __construct(Languages $languages)
    {
        $this->languages = $languages;
    }

    /**
     * @Route("/languages", name="languages")
     */
    public function index()
    {
        return $this->json($this->languages->all());
    }
}
