package vn.vnpt.service.mapper;

import static vn.vnpt.domain.DanhMucCanBoAsserts.*;
import static vn.vnpt.domain.DanhMucCanBoTestSamples.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class DanhMucCanBoMapperTest {

    private DanhMucCanBoMapper danhMucCanBoMapper;

    @BeforeEach
    void setUp() {
        danhMucCanBoMapper = new DanhMucCanBoMapperImpl();
    }

    @Test
    void shouldConvertToDtoAndBack() {
        var expected = getDanhMucCanBoSample1();
        var actual = danhMucCanBoMapper.toEntity(danhMucCanBoMapper.toDto(expected));
        assertDanhMucCanBoAllPropertiesEquals(expected, actual);
    }
}
