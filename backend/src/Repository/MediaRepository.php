<?php

namespace App\Repository;

use App\Entity\MediaInterface;
use Doctrine\ORM\EntityRepository;

/**
 * @method MediaInterface|null find($id, $lockMode = null, $lockVersion = null)
 * @method MediaInterface|null findOneBy(array $criteria, array $orderBy = null)
 * @method MediaInterface[]    findAll()
 * @method MediaInterface[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class MediaRepository extends EntityRepository
{
    const MAX_RESULTS = 1000;

    /**
     * Returns an array of MediaInterface objects.
     * @return MediaInterface[]
     */
    public function findAll()
    {
        return $this->getEntityManager()
            ->createQuery(sprintf('SELECT m FROM %s m ORDER BY m.id ASC', $this->getEntityName()))
            ->getResult();
        // return $this->createQueryBuilder('m')
        //     ->orderBy('m.id', 'DESC')
        //     ->setMaxResults(static::MAX_RESULTS)
        //     ->getQuery()
        //     ->getResult();
    }

    public function countOwned()
    {
        return intval($this->getEntityManager()
            ->createQuery(sprintf('SELECT COUNT(m.id) FROM %s m WHERE m.own = 1', $this->getEntityName()))
            ->getSingleScalarResult());
    }

    public function ownedTotalCost()
    {
        return $this->getEntityManager()
            ->createQuery(sprintf('SELECT SUM(m.price) FROM %s m WHERE m.own = 1', $this->getEntityName()))
            ->getSingleScalarResult();
    }
}
