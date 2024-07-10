<?php

namespace App\Controller;

use App\Entity\ImportDataContainer;
use App\Service\Importer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ImportController extends AbstractController
{
    /**
     * @var Importer
     */
    private $importer;

    /**
     * @param Importer $importer
     */
    public function __construct(Importer $importer)
    {
        $this->importer = $importer;
    }

    /**
     * @Route("/import", name="import")
     * @param Request $request
     *
     * @return Response
     */
    public function import(Request $request): Response
    {
        $file = $_FILES['file']['tmp_name'];
        $mediaType = $request->get('mediaType');
        /** @var ImportDataContainer $data */
        $data = $this->importer->importFromFile($mediaType, $file);

        return $this->json($data, 200);
    }

    public function csvTemplate(string $mediaType)
    {
        return new Response(
            $this->importer->prepareCsvTemplate($mediaType),
            200
        );
    }
}
