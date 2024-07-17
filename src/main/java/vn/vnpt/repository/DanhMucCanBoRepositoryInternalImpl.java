package vn.vnpt.repository;

import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.sql.Comparison;
import org.springframework.data.relational.core.sql.Condition;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoin;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import tech.jhipster.service.ConditionBuilder;
import vn.vnpt.domain.DanhMucCanBo;
import vn.vnpt.domain.criteria.DanhMucCanBoCriteria;
import vn.vnpt.repository.rowmapper.ColumnConverter;
import vn.vnpt.repository.rowmapper.DanhMucCanBoRowMapper;

/**
 * Spring Data R2DBC custom repository implementation for the DanhMucCanBo entity.
 */
@SuppressWarnings("unused")
class DanhMucCanBoRepositoryInternalImpl extends SimpleR2dbcRepository<DanhMucCanBo, Long> implements DanhMucCanBoRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final DanhMucCanBoRowMapper danhmuccanboMapper;
    private final ColumnConverter columnConverter;

    private static final Table entityTable = Table.aliased("danh_muc_can_bo", EntityManager.ENTITY_ALIAS);

    public DanhMucCanBoRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        DanhMucCanBoRowMapper danhmuccanboMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter,
        ColumnConverter columnConverter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(DanhMucCanBo.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.danhmuccanboMapper = danhmuccanboMapper;
        this.columnConverter = columnConverter;
    }

    @Override
    public Flux<DanhMucCanBo> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<DanhMucCanBo> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = DanhMucCanBoSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        SelectFromAndJoin selectFrom = Select.builder().select(columns).from(entityTable);
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, DanhMucCanBo.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<DanhMucCanBo> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<DanhMucCanBo> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    private DanhMucCanBo process(Row row, RowMetadata metadata) {
        DanhMucCanBo entity = danhmuccanboMapper.apply(row, "e");
        return entity;
    }

    @Override
    public <S extends DanhMucCanBo> Mono<S> save(S entity) {
        return super.save(entity);
    }

    @Override
    public Flux<DanhMucCanBo> findByCriteria(DanhMucCanBoCriteria danhMucCanBoCriteria, Pageable page) {
        return createQuery(page, buildConditions(danhMucCanBoCriteria)).all();
    }

    @Override
    public Mono<Long> countByCriteria(DanhMucCanBoCriteria criteria) {
        return findByCriteria(criteria, null)
            .collectList()
            .map(collectedList -> collectedList != null ? (long) collectedList.size() : (long) 0);
    }

    private Condition buildConditions(DanhMucCanBoCriteria criteria) {
        ConditionBuilder builder = new ConditionBuilder(this.columnConverter);
        List<Condition> allConditions = new ArrayList<Condition>();
        if (criteria != null) {
            if (criteria.getId() != null) {
                builder.buildFilterConditionForField(criteria.getId(), entityTable.column("id"));
            }
            if (criteria.getIdCanBo() != null) {
                builder.buildFilterConditionForField(criteria.getIdCanBo(), entityTable.column("id_can_bo"));
            }
            if (criteria.getTenCanBo() != null) {
                builder.buildFilterConditionForField(criteria.getTenCanBo(), entityTable.column("ten_can_bo"));
            }
            if (criteria.getDiaChi() != null) {
                builder.buildFilterConditionForField(criteria.getDiaChi(), entityTable.column("dia_chi"));
            }
            if (criteria.getNamSinh() != null) {
                builder.buildFilterConditionForField(criteria.getNamSinh(), entityTable.column("nam_sinh"));
            }
            if (criteria.getEmail() != null) {
                builder.buildFilterConditionForField(criteria.getEmail(), entityTable.column("email"));
            }
            if (criteria.getSoDienThoai() != null) {
                builder.buildFilterConditionForField(criteria.getSoDienThoai(), entityTable.column("so_dien_thoai"));
            }
            if (criteria.getSoCmnd() != null) {
                builder.buildFilterConditionForField(criteria.getSoCmnd(), entityTable.column("so_cmnd"));
            }
            if (criteria.getTenDangNhap() != null) {
                builder.buildFilterConditionForField(criteria.getTenDangNhap(), entityTable.column("ten_dang_nhap"));
            }
            if (criteria.getMatKhau() != null) {
                builder.buildFilterConditionForField(criteria.getMatKhau(), entityTable.column("mat_khau"));
            }
            if (criteria.getTrangThai() != null) {
                builder.buildFilterConditionForField(criteria.getTrangThai(), entityTable.column("trang_thai"));
            }
            if (criteria.getClientId() != null) {
                builder.buildFilterConditionForField(criteria.getClientId(), entityTable.column("client_id"));
            }
            if (criteria.getClientSecret() != null) {
                builder.buildFilterConditionForField(criteria.getClientSecret(), entityTable.column("client_secret"));
            }
            if (criteria.getUsernameKyso() != null) {
                builder.buildFilterConditionForField(criteria.getUsernameKyso(), entityTable.column("username_kyso"));
            }
            if (criteria.getPasswordKyso() != null) {
                builder.buildFilterConditionForField(criteria.getPasswordKyso(), entityTable.column("password_kyso"));
            }
        }
        return builder.buildConditions();
    }
}
