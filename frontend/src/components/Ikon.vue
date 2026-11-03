<script setup>
const props = defineProps({
  nama: {
    type: String,
    required: true,
  },
});

const bentuk = {
  panah: ["M5 12h14", "m12 5 7 7-7 7"],
  kiri: ["M19 12H5", "m12 19-7-7 7-7"],
  cari: [
    "M21 21l-4.34-4.34",
    "M19 10.5a8.5 8.5 0 1 1-17 0 8.5 8.5 0 0 1 17 0Z",
  ],
  daun: [
    "M20 4c-8 0-15 4-15 12a5 5 0 0 0 5 5c8 0 12-7 10-17Z",
    "M4 20c3-5 7-9 13-12",
  ],
  toko: [
    "M3 10h18",
    "M5 10v11h14V10",
    "M3 10l2-7h14l2 7",
    "M9 21v-7h6v7",
  ],
  tas: [
    "M5 8h14l1 13H4L5 8Z",
    "M9 8V6a3 3 0 0 1 6 0v2",
  ],
  jam: [
    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
    "M12 6v6l4 2",
  ],
  cek: ["m5 12 4 4L19 6"],
  plus: ["M12 5v14", "M5 12h14"],
  ulang: [
    "M20 7v5h-5",
    "M4 17v-5h5",
    "M5.5 9a7 7 0 0 1 12-2L20 12",
    "M18.5 15a7 7 0 0 1-12 2L4 12",
  ],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  tutup: ["M18 6 6 18", "m6 6 12 12"],
  keranjang: [
    "M3 3h2l2.5 12h11L21 7H6",
    "M9 19h.01",
    "M17 19h.01",
  ],
  pengguna: [
    "M20 21a8 8 0 0 0-16 0",
    "M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z",
  ],
  aman: [
    "M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z",
    "m9 12 2 2 4-4",
  ],
  grafik: [
    "M3 3v18h18",
    "M18 17V9",
    "M13 17V5",
    "M8 17v-3",
  ],
  info: [
    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
    "M12 11v6",
    "M12 7h.01",
  ],
  paket: [
    "m12 3 9 5-9 5-9-5 9-5Z",
    "M3 8v9l9 5 9-5V8",
    "M12 13v9",
  ],
  status: [
    "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z",
    "m8 12 3 3 5-6",
  ],
};
</script>

<template>
  <svg
    class="ikon"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.7"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
    focusable="false"
  >
    <path
      v-for="(d, i) in (bentuk[props.nama] ?? bentuk.info)"
      :key="i"
      :d="d"
    />
  </svg>
</template>