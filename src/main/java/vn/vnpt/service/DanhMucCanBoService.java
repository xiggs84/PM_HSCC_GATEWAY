package vn.vnpt.service;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.criteria.DanhMucCanBoCriteria;
import vn.vnpt.service.dto.DanhMucCanBoDTO;

/**
 * Service Interface for managing {@link vn.vnpt.domain.DanhMucCanBo}.
 */
public interface DanhMucCanBoService {
    /**
     * Save a danhMucCanBo.
     *
     * @param danhMucCanBoDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<DanhMucCanBoDTO> save(DanhMucCanBoDTO danhMucCanBoDTO);

    /**
     * Updates a danhMucCanBo.
     *
     * @param danhMucCanBoDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<DanhMucCanBoDTO> update(DanhMucCanBoDTO danhMucCanBoDTO);

    /**
     * Partially updates a danhMucCanBo.
     *
     * @param danhMucCanBoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<DanhMucCanBoDTO> partialUpdate(DanhMucCanBoDTO danhMucCanBoDTO);
    /**
     * Find danhMucCanBos by criteria.
     *
     * @return the list of entities.
     */
    Flux<DanhMucCanBoDTO> findByCriteria(DanhMucCanBoCriteria criteria);

    /**
     * Find the count of danhMucCanBos by criteria.
     * @param criteria filtering criteria
     * @return the count of danhMucCanBos
     */
    public Mono<Long> countByCriteria(DanhMucCanBoCriteria criteria);

    /**
     * Returns the number of danhMucCanBos available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" danhMucCanBo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<DanhMucCanBoDTO> findOne(Long id);

    /**
     * Delete the "id" danhMucCanBo.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
