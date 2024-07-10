<?php

namespace App\Service;

use App\Entity\ImportDataContainer;
use App\Entity\MediaType;
use App\Factory;
use Error;
use Exception;

class Importer
{
    /**
     * @var MediaManager
     */
    private $manager;

    /**
     * @var Factory
     */
    private $factory;

    public function __construct(MediaManager $manager, Factory $factory)
    {
        $this->manager = $manager;
        $this->factory = $factory;
    }

    /**
     * @todo this should me moved to manager and renamed to set default or something like that
     * @todo but reconsider this again
     */
    public function fillEmptyFields(array &$item): array
    {
        $fillEmpty = [
            'description' => '',
            'rating' => 0,
            'isFavourite' => false,
            'language' => '',
            'completed' => false,
            'series' => '',
            'quantity' => 0,
            'own' => false,
            'author' => '',
            'cover' => '',
            'toPlay' => false,
            'genres' => [],
            'releaseDate' => null,
            'remarks' => '',
        ];

        foreach ($fillEmpty as $field => $value) {
            if (
                !array_key_exists($field, $item)
                || (
                    $item[$field] === null
                    || $item[$field] === ''
                )
            ) {
                $item[$field] = $value;
            }
        }

        return $item;
    }

    /**
     * Prepare data array from CSV line.
     * @param string $line
     * @param string[] $columns
     *
     * @return array
     */
    private function makeDataArrayFromCsvLine(string $line, array $columns)
    {
        $data = str_getcsv($line, ';');
        $itemDataArray = [];

        foreach ($columns as $index => $column) {
            $value = null;
            $value_ = $data[$index];
            switch ($column) {
                case 'cds':
                    continue;
                case 'quantity':
                    continue;
                case 'price':
                    $value = $value_ ? floatval(str_replace(',', '.', $value_)) : 0.00;
                    break;
                case 'genres':
                    $value = explode(',', $value_);
                    break;
                default:
                    $value = trim(str_replace('\n', "\n", $value_));
                    break;
            }

            $itemDataArray[$column] = $value;
        }

        return $itemDataArray;
    }

    /**
     * @todo this actually does not handle anything, just throws error
     */
    public function handleImportedDuplicates($medias)
    {
        $found = [];

        foreach ($medias as $media) {
            if ($media->existingId) {
                if (in_array($media->existingId, $found)) {
                    throw new Error("Duplicate(s) exist.");
                }
                $found[] = $media->existingId;
            }
        }

        return $medias;
    }

    /**
     * Process and import data from file.
     * @param string $mediaType
     * @param string $file
     *
     * @return Media[]
     */
    public function importFromFile(string $mediaType, string $file)
    {
        $mediaClass = $this->factory->makeMediaClass($mediaType);
        $csv = file($file);
        $imported = [];
        $insert = 0;
        $update = 0;
        $total = 0;

        $columns = str_getcsv($csv[0], ';');
        array_shift($csv); // first line reserved for columns

        foreach ($csv as $line) {
            $itemDataArray = $this->makeDataArrayFromCsvLine($line, $columns);
            $this->fillEmptyFields($itemDataArray);
            $item = new $mediaClass();
            $item->existingId = null;
            $this->manager->setDataFromArray($item, $itemDataArray);

            try {
                $this->manager->validate($item);
            } catch (Exception $e) {
                $item->existingId = $this->manager->findDuplicateId($item, $mediaType, $this->factory);
            }

            !$item->existingId ? $insert++ : $update++;
            $total++;

            $imported[] = $item;
        }

        // $this->handleImportedDuplicates($imported);

        return new ImportDataContainer($imported, $insert, $update, $total);
    }

    /**
     * Prepare CSV template.
     * @param string $mediaType
     *
     * @return string
     */
    public function prepareCsvTemplate(string $mediaType): string
    {
        $template = '';

        switch ($mediaType) {
            case MediaType::album():
                $template = 'author;title;genres;releaseDate;own;quantity;publisher;remarks;price';
                break;
            case MediaType::book():
                $template = 'title;author;genres;cover;own;price;releaseDate;publisher;remarks;completed';
                break;
            case MediaType::game():
                $template = 'title;genres;language;developer;publisher;series;own;quantity;price;releaseDate;remarks;completed';
                break;
            case MediaType::movie():
                $template = '';
                break;
            default:
                break;
        }

        return $template;
    }
}
