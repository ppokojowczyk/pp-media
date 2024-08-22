<?php

namespace App\Repository;

use App\Entity\Upload;

/** @todo what's with ServiceEntityRepository? */

use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\EntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method Upload|null find($id, $lockMode = null, $lockVersion = null)
 * @method Upload|null findOneBy(array $criteria, array $orderBy = null)
 * @method Upload[]    findAll()
 * @method Upload[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class UploadRepository extends EntityRepository
{
    public function findForMedia(string $mediaType, int $mediaId)
    {
        $builder = $this->createQueryBuilder('u');

        $builder->orderBy('u.id', 'asc');
        $builder->andWhere('u.media_type = :mediaType');
        $builder->andWhere('u.media_id = :mediaId');
        $builder->setParameter('mediaType', $mediaType);
        $builder->setParameter('mediaId', $mediaId);

        $query = $builder->getQuery();

        return $query->execute();

        // return $this->getEntityManager()
        //     ->createQuery(sprintf('SELECT u FROM %s u ORDER BY m.title ASC', $this->getEntityName()))
        //     ->getResult();
    }
    // public function __construct(ManagerRegistry $registry)
    // {
    //     parent::__construct($registry, Upload::class);
    // }

    // /**
    //  * @return Upload[] Returns an array of Upload objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('u.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Upload
    {
        return $this->createQueryBuilder('u')
            ->andWhere('u.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
