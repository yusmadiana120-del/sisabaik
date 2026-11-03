
<script setup>
import { computed } from "vue";
import { formatRupiah, formatWaktu, tersedia } from "../lib/tampilan.js";
import { visualKategori, labelStatus, sisaWaktu } from "../lib/visual.js";
import Ikon from "./Ikon.vue";

const props = defineProps({
  penawaran: { type: Object, required: true },
  waktuSekarang: { type: Number, required: true },
  bolehPilih: { type: Boolean, default: false },
});

const emit = defineEmits(["pilih"]);

const hemat = computed(() =>
  props.penawaran.hargaNormal - props.penawaran.hargaPenawaran,
);

const diskon = computed(() =>
  props.penawaran.hargaNormal > 0
    ? Math.floor(hemat.value / props.penawaran.hargaNormal * 100)
    : 0,
);

const dapatDipilih = computed(() =>
  tersedia(props.penawaran, props.waktuSekarang),
);

const visual = computed(() =>
  visualKategori(props.penawaran.kategori),
);
</script>

<template>
  <article class="kartu offer-card">
    <div class="offer-visual" :class="visual.nada">
      <img
        :src="visual.gambar"
        :alt="visual.label"
        width="640"
        height="420"
        loading="lazy"
        decoding="async"
      />

      <span
        v-if="props.penawaran.hargaPenawaran === 0"
        class="offer-badge"
      >
        Gratis
      </span>

      <span v-else-if="diskon > 0" class="offer-badge">
        Hemat {{ diskon }}%
      </span>

      <span class="art-label">Ilustrasi kategori</span>
    </div>

    <div class="offer-body">
      <div class="offer-topline">
        <p class="art-category">{{ visual.label }}</p>

        <span class="stock-label">
          {{ props.penawaran.stok }} {{ props.penawaran.satuan }}
        </span>
      </div>

      <h3>{{ props.penawaran.nama }}</h3>

      <p class="provider-line">
        <span class="toko">
          <Ikon nama="toko" />
          {{ props.penawaran.penyedia }}
        </span>
      </p>

      <div class="offer-price">
        <p class="harga">
          {{
            props.penawaran.hargaPenawaran === 0
              ? "Gratis"
              : formatRupiah(props.penawaran.hargaPenawaran)
          }}
        </p>

        <p class="normal-price">
          <span class="sr-only">Harga normal</span>
          <s>{{ formatRupiah(props.penawaran.hargaNormal) }}</s>
        </p>
      </div>

      <p class="saving-note">
        Potensi hemat {{ formatRupiah(hemat) }}
        per {{ props.penawaran.satuan }}
      </p>

      <div class="offer-time">
        <Ikon nama="jam" />

        <div>
          <strong>
            {{ sisaWaktu(props.penawaran.berakhirPada, props.waktuSekarang) }}
          </strong>

          <time :datetime="props.penawaran.berakhirPada">
            {{ formatWaktu(props.penawaran.berakhirPada) }}
          </time>
        </div>

        <span
          class="status-dot"
          :class="`status-${props.penawaran.status}`"
        >
          {{ labelStatus(props.penawaran.status) }}
        </span>
      </div>

      <button
        v-if="props.bolehPilih"
        class="button-wide"
        type="button"
        :disabled="!dapatDipilih"
        :aria-label="`Pilih ${props.penawaran.nama}`"
        @click="emit('pilih', props.penawaran.id)"
      >
        Pilih makanan
      </button>
    </div>
  </article>
</template>
