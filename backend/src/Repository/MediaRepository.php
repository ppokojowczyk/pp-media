<?php

namespace App\Repository;

use App\Entity\MediaInterface;
use App\Entity\Movie;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method MediaInterface|null find($id, $lockMode = null, $lockVersion = null)
 * @method MediaInterface|null findOneBy(array $criteria, array $orderBy = null)
 * @method MediaInterface[]    findAll()
 * @method MediaInterface[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MediaRepository extends EntityRepository
{
    const MAX_RESULTS = 1000;

    private $mediaClass = '';

    public function setMediaClass(string $mediaClass = '')
    {
        $this->mediaClass = $mediaClass;
        return $this;
    }

    // public function __construct(string $mediaClass = '')
    // {
    //     $this->mediaClass = $mediaClass;
    // }

    /**
     * Returns an array of MediaInterface objects.
     * @return MediaInterface[]
     */
    public function findAll()
    {
        return $this->getEntityManager()
            ->createQuery('SELECT m FROM ' . $this->getEntityName() . ' m ORDER BY m.id ASC')
            ->getResult();
        // return $this->createQueryBuilder('m')
        //     ->orderBy('m.id', 'DESC')
        //     ->setMaxResults(static::MAX_RESULTS)
        //     ->getQuery()
        //     ->getResult();
    }
}
