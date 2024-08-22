<?php

namespace App\Entity;

use App\Repository\UploadRepository;
use Symfony\Component\Validator\Mapping\ClassMetadata;
use Doctrine\ORM\Mapping as ORM;
use Exception;
use Incompass\TimestampableBundle\Entity\TimestampInterface;
use Incompass\TimestampableBundle\Entity\TimestampTrait;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Base class for various Media.
 */
abstract class Media implements MediaInterface, TimestampInterface
{
    use TimestampTrait;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $title;

    /**
     * @ORM\Column(type="string", length=10000)
     */
    protected $description;

    /**
     * @ORM\Column(type="date")
     */
    protected $release_date;

    protected $genres;

    /**
     * @ORM\Column(type="smallint", options={"unsigned"=true})
     */
    protected $rating;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $is_favourite;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $own;

    /**
     * @ORM\Column(type="string", length=1000)
     */
    protected $remarks;

    /**
     * @ORM\Column(type="decimal", options={"scale"=2, "precision"=10})
     */
    protected $price;

    /**
     * @ORM\Column(type="string", length=2)
     */
    protected $language;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $publisher;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $completed;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $series;

    /**
     * @ORM\Column(type="smallint", options={"unsigned"=true})
     */
    protected $quantity;

    protected $ignore_validation;

    public $existingId;

    protected $uploads;

    /**
     * @var Upload[]
     */
    protected $images = [];

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }

    public function getDescription()
    {
        return $this->description;
    }

    public function setReleaseDate($release_date)
    {
        $this->release_date = $release_date;
    }

    public function getReleaseDate()
    {
        return $this->release_date;
    }

    public function getGenreClass(): string
    {
        throw new Exception("getGenreClass() should not be executed by Media entity.");
    }

    /**
     * Set genres by array.
     */
    public function setGenres($genres)
    {
        $_genres = [];
        if (isset($genres) && is_array($genres) && count($genres)) {
            foreach ($genres as $genre) {
                $mediaGenreClass = $this->getGenreClass();
                $MediaGenre = new $mediaGenreClass($this, $genre);
                $_genres[] = $MediaGenre;
            }
        }
        $this->genres = $_genres;
    }

    /**
     * Get genres array.
     */
    public function getGenres()
    {
        $genres = [];
        foreach ($this->genres as $genre) {
            $genres[] = $genre->getName();
        }
        return $genres;
    }

    public function setRating($rating)
    {
        $this->rating = $rating;
    }

    public function getRating()
    {
        return $this->rating;
    }

    public function setIsFavourite($value)
    {
        $this->is_favourite = $value;
    }

    public function getIsFavourite()
    {
        return $this->is_favourite;
    }

    public function getReleaseYear()
    {
        return $this->release_date->format('Y');
    }

    public function setReleaseYear($release_year)
    {
        if (!isset($release_year)) {
            $this->release_date = null;
        } else {
            $date = new \DateTime();
            $date->setDate($release_year, 1, 1);
            $this->release_date = $date;
        }
    }

    public function setIgnoreValidation($value)
    {
        $this->ignore_validation = $value;
    }

    public function getIgnoreValidation()
    {
        return $this->ignore_validation;
    }

    public function setPrice($price): void
    {
        $this->price = $price;
    }

    public function getPrice()
    {
        return $this->price;
    }

    /**
     * @param bool $own
     */
    public function setOwn(bool $own): void
    {
        $this->own = $own;
    }

    /**
     * @return bool
     */
    public function getOwn(): bool
    {
        return $this->own;
    }

    public function setRemarks($remarks)
    {
        $this->remarks = $remarks;
    }

    public function getRemarks()
    {
        return $this->remarks;
    }

    public function setLanguage($language)
    {
        $this->language = $language;
    }

    public function getLanguage()
    {
        return $this->language;
    }

    public function setPublisher($publisher)
    {
        $this->publisher = $publisher;
    }

    public function getPublisher()
    {
        return $this->publisher;
    }

    public function setCompleted($completed)
    {
        $this->completed = $completed;
    }

    public function getCompleted()
    {
        return $this->completed;
    }

    public function setSeries($series)
    {
        $this->series = $series;
    }

    public function getSeries()
    {
        return $this->series;
    }

    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;
    }

    public function getQuantity()
    {
        return $this->quantity;
    }

    public static function loadValidatorMetadata(ClassMetadata $metadata)
    {
        $metadata->addPropertyConstraint(
            'title',
            new Assert\NotBlank(['message' => 'Title is required.'])
        );
        $metadata->addConstraint(new UniqueEntity([
            'fields' => ['title', 'release_date'],
            'message' => 'Title with release date already exists'
        ]));
        $metadata->addConstraint(new UniqueEntity([
            'fields' => ['title'],
            'message' => 'Title already exists'
        ]));
    }

    public function setImages($images)
    {
        $this->images = $images;
    }

    public function getImages(): array
    {
        return $this->images;
    }
}
