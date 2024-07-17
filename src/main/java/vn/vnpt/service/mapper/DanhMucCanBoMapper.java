package vn.vnpt.service.mapper;

import org.mapstruct.*;
import vn.vnpt.domain.DanhMucCanBo;
import vn.vnpt.service.dto.DanhMucCanBoDTO;

/**
 * Mapper for the entity {@link DanhMucCanBo} and its DTO {@link DanhMucCanBoDTO}.
 */
@Mapper(componentModel = "spring")
public interface DanhMucCanBoMapper extends EntityMapper<DanhMucCanBoDTO, DanhMucCanBo> {}
