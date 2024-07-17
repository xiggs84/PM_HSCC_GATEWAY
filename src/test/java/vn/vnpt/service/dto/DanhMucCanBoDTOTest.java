package vn.vnpt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import vn.vnpt.web.rest.TestUtil;

class DanhMucCanBoDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DanhMucCanBoDTO.class);
        DanhMucCanBoDTO danhMucCanBoDTO1 = new DanhMucCanBoDTO();
        danhMucCanBoDTO1.setId(1L);
        DanhMucCanBoDTO danhMucCanBoDTO2 = new DanhMucCanBoDTO();
        assertThat(danhMucCanBoDTO1).isNotEqualTo(danhMucCanBoDTO2);
        danhMucCanBoDTO2.setId(danhMucCanBoDTO1.getId());
        assertThat(danhMucCanBoDTO1).isEqualTo(danhMucCanBoDTO2);
        danhMucCanBoDTO2.setId(2L);
        assertThat(danhMucCanBoDTO1).isNotEqualTo(danhMucCanBoDTO2);
        danhMucCanBoDTO1.setId(null);
        assertThat(danhMucCanBoDTO1).isNotEqualTo(danhMucCanBoDTO2);
    }
}
