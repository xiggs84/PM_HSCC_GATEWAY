package vn.vnpt.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static vn.vnpt.domain.DanhMucCanBoTestSamples.*;

import org.junit.jupiter.api.Test;
import vn.vnpt.web.rest.TestUtil;

class DanhMucCanBoTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DanhMucCanBo.class);
        DanhMucCanBo danhMucCanBo1 = getDanhMucCanBoSample1();
        DanhMucCanBo danhMucCanBo2 = new DanhMucCanBo();
        assertThat(danhMucCanBo1).isNotEqualTo(danhMucCanBo2);

        danhMucCanBo2.setId(danhMucCanBo1.getId());
        assertThat(danhMucCanBo1).isEqualTo(danhMucCanBo2);

        danhMucCanBo2 = getDanhMucCanBoSample2();
        assertThat(danhMucCanBo1).isNotEqualTo(danhMucCanBo2);
    }
}
