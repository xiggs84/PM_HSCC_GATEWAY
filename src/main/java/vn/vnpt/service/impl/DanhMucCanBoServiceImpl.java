package vn.vnpt.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import vn.vnpt.domain.criteria.DanhMucCanBoCriteria;
import vn.vnpt.repository.DanhMucCanBoRepository;
import vn.vnpt.service.DanhMucCanBoService;
import vn.vnpt.service.dto.DanhMucCanBoDTO;
import vn.vnpt.service.mapper.DanhMucCanBoMapper;

/**
 * Service Implementation for managing {@link vn.vnpt.domain.DanhMucCanBo}.
 */
@Service
@Transactional
public class DanhMucCanBoServiceImpl implements DanhMucCanBoService {

    private static final Logger log = LoggerFactory.getLogger(DanhMucCanBoServiceImpl.class);

    private final DanhMucCanBoRepository danhMucCanBoRepository;

    private final DanhMucCanBoMapper danhMucCanBoMapper;

    public DanhMucCanBoServiceImpl(DanhMucCanBoRepository danhMucCanBoRepository, DanhMucCanBoMapper danhMucCanBoMapper) {
        this.danhMucCanBoRepository = danhMucCanBoRepository;
        this.danhMucCanBoMapper = danhMucCanBoMapper;
    }

    @Override
    public Mono<DanhMucCanBoDTO> save(DanhMucCanBoDTO danhMucCanBoDTO) {
        log.debug("Request to save DanhMucCanBo : {}", danhMucCanBoDTO);
        return danhMucCanBoRepository.save(danhMucCanBoMapper.toEntity(danhMucCanBoDTO)).map(danhMucCanBoMapper::toDto);
    }

    @Override
    public Mono<DanhMucCanBoDTO> update(DanhMucCanBoDTO danhMucCanBoDTO) {
        log.debug("Request to update DanhMucCanBo : {}", danhMucCanBoDTO);
        return danhMucCanBoRepository.save(danhMucCanBoMapper.toEntity(danhMucCanBoDTO)).map(danhMucCanBoMapper::toDto);
    }

    @Override
    public Mono<DanhMucCanBoDTO> partialUpdate(DanhMucCanBoDTO danhMucCanBoDTO) {
        log.debug("Request to partially update DanhMucCanBo : {}", danhMucCanBoDTO);

        return danhMucCanBoRepository
            .findById(danhMucCanBoDTO.getId())
            .map(existingDanhMucCanBo -> {
                danhMucCanBoMapper.partialUpdate(existingDanhMucCanBo, danhMucCanBoDTO);

                return existingDanhMucCanBo;
            })
            .flatMap(danhMucCanBoRepository::save)
            .map(danhMucCanBoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<DanhMucCanBoDTO> findByCriteria(DanhMucCanBoCriteria criteria) {
        log.debug("Request to get all DanhMucCanBos by Criteria");
        return danhMucCanBoRepository.findByCriteria(criteria, null).map(danhMucCanBoMapper::toDto);
    }

    /**
     * Find the count of danhMucCanBos by criteria.
     * @param criteria filtering criteria
     * @return the count of danhMucCanBos
     */
    public Mono<Long> countByCriteria(DanhMucCanBoCriteria criteria) {
        log.debug("Request to get the count of all DanhMucCanBos by Criteria");
        return danhMucCanBoRepository.countByCriteria(criteria);
    }

    public Mono<Long> countAll() {
        return danhMucCanBoRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<DanhMucCanBoDTO> findOne(Long id) {
        log.debug("Request to get DanhMucCanBo : {}", id);
        return danhMucCanBoRepository.findById(id).map(danhMucCanBoMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete DanhMucCanBo : {}", id);
        return danhMucCanBoRepository.deleteById(id);
    }
}
