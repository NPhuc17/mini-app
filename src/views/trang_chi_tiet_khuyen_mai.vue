<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import Header from "../components/common/header.vue";

const route = useRoute();

const promotions = [
  {
    id: "summer-2024",
    title: "Giam 30% don hang mua he",
    code: "SUMMER30",
    validUntil: "31/08/2024",
    description:
      "Uu dai ap dung cho tat ca san pham le. Khong ap dung voi combo va cac chuong trinh khac.",
    terms: [
      "Gia tri don hang toi thieu 500.000d.",
      "Moi tai khoan duoc su dung 1 lan.",
      "Luu y nhap ma truoc khi thanh toan.",
    ],
  },
  {
    id: "freeship-week",
    title: "Mien phi van chuyen",
    code: "SHIP0D",
    validUntil: "21/07/2024",
    description:
      "Nhận freeship cho 3 don hang dau tien duoc dat trong tuan le uu dai.",
    terms: [
      "Gia tri don toi thieu 200.000d.",
      "Ap dung cac dia diem giao nhan noi thanh.",
      "Khong cong don voi uu dai giam phi ship khac.",
    ],
  },
  {
    id: "member-gift",
    title: "Tang voucher 50K cho thanh vien",
    code: "MEMBER50",
    validUntil: "30/09/2024",
    description:
      "Doi 150 diem de nhan ma giam 50.000d cho don hang bat ky.",
    terms: [
      "Chi thanh vien bac Bac tro len moi doi duoc.",
      "Ma co hieu luc 7 ngay sau khi doi.",
      "Khong doi tra diem sau khi da doi ma.",
    ],
  },
];

const promotion = computed(() =>
  promotions.find((item) => item.id === route.params.id)
);

const copyStatus = ref("");

const handleCopy = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    copyStatus.value = "Da sao chep ma.";
    setTimeout(() => (copyStatus.value = ""), 1500);
  } catch (error) {
    copyStatus.value = "Khong the sao chep. Vui long thu lai.";
    setTimeout(() => (copyStatus.value = ""), 2000);
  }
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header title="Chi tiet khuyen mai" path="/account/promotions" />

    <section v-if="promotion" class="flex-1 overflow-y-auto px-4 py-4 space-y-4">
      <article class="rounded-xl border border-blue-100 bg-white p-4 shadow">
        <header class="space-y-1">
          <p class="text-xs text-gray-500">Han su dung: {{ promotion.validUntil }}</p>
          <h1 class="text-base font-semibold text-gray-900">
            {{ promotion.title }}
          </h1>
        </header>

        <p class="mt-3 text-sm leading-relaxed text-gray-700">
          {{ promotion.description }}
        </p>

        <div class="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-blue-300 bg-blue-50 px-3 py-2">
          <span class="text-sm font-semibold text-blue-600">
            Ma: {{ promotion.code }}
          </span>
          <button
            class="ml-auto rounded-md bg-blue-500 px-3 py-1 text-xs font-semibold text-white hover:bg-blue-600 transition"
            @click="handleCopy(promotion.code)"
          >
            Sao chep
          </button>
        </div>

        <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-600">
          <li v-for="term in promotion.terms" :key="term">
            {{ term }}
          </li>
        </ul>
      </article>

      <p
        v-if="copyStatus"
        class="text-center text-sm font-medium text-green-600"
      >
        {{ copyStatus }}
      </p>
    </section>

    <section v-else class="flex flex-1 items-center justify-center px-4">
      <p class="text-sm text-gray-600 text-center">
        Khong tim thay thong tin khuyen mai. Vui long quay lai danh sach.
      </p>
    </section>
  </div>
</template>
