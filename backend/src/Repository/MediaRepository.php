<?php

namespace App\Repository;

use App\Entity\AlbumGenre;
use App\Entity\MediaInterface;
use App\Entity\MediaType;
use App\Entity\Upload;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

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
     * Apply special filter to query builder.
     * @param QueryBuilder $builder
     * @param string $filter
     *
     * @return QueryBuilder
     */
    private function applySpecialFilter(QueryBuilder $builder, string $filter): QueryBuilder
    {
        if ($filter === 'no-price') {
            $builder->andWhere("m.price = 0 OR m.price IS NULL OR m.price = ''");
        } else if ($filter === 'no-images' || $filter === 'with-images') {
            $builder->leftJoin(Upload::class, 'u', 'WITH', 'u.media_id = m.id AND u.media_type = :media_type');
            $builder->setParameter('media_type', MediaType::typeByMediaClass($this->getEntityName()));
            $builder->having($filter === 'no-images' ? 'COUNT(u.id) = 0' : 'COUNT(u.id) > 0');
            $builder->groupBy('m.id');
        } else if ($filter === 'no-language') {
            $builder->andWhere("m.language = '' OR m.language IS NULL");
        } else if ($filter === 'zero-quantity') {
            $builder->andWhere("m.quantity = 0 OR m.quantity IS NULL");
        } else if ($filter === 'no-publisher') {
            $builder->andWhere("m.publisher = '' OR m.publisher IS NULL");
        } else if ($filter === 'no-genres') {
            $mediaType = MediaType::typeByMediaClass($this->getEntityName());
            $genreClass = 'App\\Entity\\' . ucfirst($mediaType) . 'Genre';
            $builder->leftJoin($genreClass, 'g', 'WITH', "g.{$mediaType} = m.id");
            $builder->having("COUNT(g.{$mediaType}) = 0");
            $builder->groupBy('m.id');
        }

        return $builder;
    }

    /**
     * Returns an array of MediaInterface objects.
     * @return MediaInterface[]
     */
    public function findAll()
    {
        return $this->getEntityManager()
            ->createQuery(sprintf('SELECT m FROM %s m ORDER BY m.title ASC', $this->getEntityName()))
            ->getResult();
    }

    /**
     * Find filtered entries.
     * @param MediaFilter $filters
     * 
     * @return MediaInterface[]
     */
    public function findWithFilters(MediaFilter $filters): array
    {
        $builder = $this->createQueryBuilder('m');
        $own = $filters->own();

        if ($filters->sort() && $filters->order()) {
            $builder->orderBy('m.' . $filters->sort(), $filters->order());
        }

        if ($own === '1' || $own === '0') {
            $builder->andWhere('m.own = :own');
            $builder->setParameter('own', $own);
        }

        $this->applySpecialFilter($builder, $filters->special());

        $query = $builder->getQuery();

        return $query->execute();
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
            ->getSingleScalarResult() ?? 0;
    }
}
