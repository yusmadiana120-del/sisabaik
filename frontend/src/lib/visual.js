import roti from "../assets/food-bread.svg";
import siapSaji from "../assets/food-bowl.svg";
import bahanSegar from "../assets/food-produce.svg";

const kategori = {
  roti: {
    label: "Roti & kue",
    gambar: roti,
    nada: "hangat",
  },
  "makanan-siap-saji": {
    label: "Makanan siap saji",
    gambar: siapSaji,
    nada: "hijau",
  },
  "bahan-segar": {
    label: "Bahan segar",
    gambar: bahanSegar,
    nada: "segar",
  },
};

export function visualKategori(nilai) {
  return (
    kategori[nilai] ?? {
      label: nilai,
      gambar: siapSaji,
      nada: "hijau",
    }
  );
}

export function labelStatus(nilai) {
  return (
    {
      aktif: "Aktif",
      draft: "Draft",
      habis: "Stok habis",
      kedaluwarsa: "Kedaluwarsa",
      ditutup: "Ditutup",
    }[nilai] ?? String(nilai ?? "").replaceAll("_", " ")
  );
}

export function sisaWaktu(iso, sekarang) {
  const menit = Math.ceil((Date.parse(iso) - sekarang) / 60000);

  if (!Number.isFinite(menit) || menit <= 0) {
    return "Waktu berakhir";
  }

  return `${Math.ceil(menit / 1440)} hari lagi`;
}