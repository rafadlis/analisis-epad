SELECT 
	wp.NamaBadan AS NamaWajibPajak,
	wp.NamaJenisPendapatan AS RincianJenisPajak,
    wp.NamaJenisPendapatan AS JenisPajak,
	wp.ObyekBadanNo AS NPWPD,
    wp.Kecamatan AS Kecamatan,
	wp.AlamatBadan AS AlamatBadan,
    wp.ObyekBadanID AS IDSubjek,
	CAST(nk.MasaAwal AS DATE) AS MasaAwal,
	CAST(nk.MasaAkhir AS DATE) AS MasaAkhir,
    DAY(nk.MasaAwal) AS NoTanggalMasa,
    MONTH(nk.MasaAwal) AS BulanMasaPajak,
    Year(nk.MasaAwal) AS TahunMasaPajak,
	CAST(s.TglBayar AS DATE) AS TanggalBayar,
	CAST(wp.TglSah AS DATE) AS TanggalDaftar,
	CAST(wp.TglHapus AS DATE) AS TanggalHapus,
	CAST(s.JmlBayar AS BIGINT) AS Pokok,
    CAST(s.JmlBayarDenda AS BIGINT) AS Denda,
    nk.UserAdd AS Pembuat,
	CAST(DAY(s.TglBayar) AS INT) AS NoTanggalBayar,
	CAST(YEAR(s.TglBayar) AS INT) AS TahunBayar, -- Extracting the year
    CAST(MONTH(s.TglBayar) AS INT) AS BulanBayar, -- Extracting the month
    s.NTB AS Verifikasi
FROM
	dbo.vw_skpd sk
LEFT JOIN
	dbo.vw_obyekbadan wp ON 
	wp.ObyekBadanNo = sk.ObyekBadanNo AND
	wp.UsahaBadan = sk.UsahaBadan AND
	wp.NamaBadan = sk.NamaBadan AND
	wp.WPID = sk.WPID
LEFT JOIN
	dbo.NomorKohir nk ON sk.KohirID = nk.KohirID
LEFT JOIN
	dbo.SetoranHist s ON s.SubKohir = nk.KohirID