package vn.vnpt.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.DanhMucCanBo;
import vn.vnpt.domain.criteria.DanhMucCanBoCriteria;

/**
 * Spring Data R2DBC repository for the DanhMucCanBo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DanhMucCanBoRepository extends ReactiveCrudRepository<DanhMucCanBo, Long>, DanhMucCanBoRepositoryInternal {
    @Override
    <S extends DanhMucCanBo> Mono<S> save(S entity);

    @Override
    Flux<DanhMucCanBo> findAll();

    @Override
    Mono<DanhMucCanBo> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface DanhMucCanBoRepositoryInternal {
    <S extends DanhMucCanBo> Mono<S> save(S entity);

    Flux<DanhMucCanBo> findAllBy(Pageable pageable);

    Flux<DanhMucCanBo> findAll();

    Mono<DanhMucCanBo> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<DanhMucCanBo> findAllBy(Pageable pageable, Criteria criteria);
    Flux<DanhMucCanBo> findByCriteria(DanhMucCanBoCriteria criteria, Pageable pageable);

    Mono<Long> countByCriteria(DanhMucCanBoCriteria criteria);
}
