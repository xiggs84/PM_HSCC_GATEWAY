package vn.vnpt.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class DanhMucCanBoTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static DanhMucCanBo getDanhMucCanBoSample1() {
        return new DanhMucCanBo()
            .id(1L)
            .idCanBo(1L)
            .tenCanBo("tenCanBo1")
            .diaChi("diaChi1")
            .email("email1")
            .soDienThoai("soDienThoai1")
            .soCmnd("soCmnd1")
            .tenDangNhap("tenDangNhap1")
            .matKhau("matKhau1")
            .trangThai(1L)
            .clientId("clientId1")
            .clientSecret("clientSecret1")
            .usernameKyso("usernameKyso1")
            .passwordKyso("passwordKyso1");
    }

    public static DanhMucCanBo getDanhMucCanBoSample2() {
        return new DanhMucCanBo()
            .id(2L)
            .idCanBo(2L)
            .tenCanBo("tenCanBo2")
            .diaChi("diaChi2")
            .email("email2")
            .soDienThoai("soDienThoai2")
            .soCmnd("soCmnd2")
            .tenDangNhap("tenDangNhap2")
            .matKhau("matKhau2")
            .trangThai(2L)
            .clientId("clientId2")
            .clientSecret("clientSecret2")
            .usernameKyso("usernameKyso2")
            .passwordKyso("passwordKyso2");
    }

    public static DanhMucCanBo getDanhMucCanBoRandomSampleGenerator() {
        return new DanhMucCanBo()
            .id(longCount.incrementAndGet())
            .idCanBo(longCount.incrementAndGet())
            .tenCanBo(UUID.randomUUID().toString())
            .diaChi(UUID.randomUUID().toString())
            .email(UUID.randomUUID().toString())
            .soDienThoai(UUID.randomUUID().toString())
            .soCmnd(UUID.randomUUID().toString())
            .tenDangNhap(UUID.randomUUID().toString())
            .matKhau(UUID.randomUUID().toString())
            .trangThai(longCount.incrementAndGet())
            .clientId(UUID.randomUUID().toString())
            .clientSecret(UUID.randomUUID().toString())
            .usernameKyso(UUID.randomUUID().toString())
            .passwordKyso(UUID.randomUUID().toString());
    }
}
