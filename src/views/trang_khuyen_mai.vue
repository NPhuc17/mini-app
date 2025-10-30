<script setup>
import Header from "../components/common/header.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const promotions = [
  {
    id: "summer-2024",
    title: "Giam 30% don hang mua he",
    description: "Ap dung cho don tu 500.000d. Khong ap dung voi combo.",
    validUntil: "31/08/2024",
    code: "SUMMER30",
    tag: "Hot",
  },
  {
    id: "freeship-week",
    title: "Mien phi van chuyen",
    description: "Freeship cho 3 don hang dau tien trong tuan nay.",
    validUntil: "21/07/2024",
    code: "SHIP0D",
    tag: "Moi",
  },
  {
    id: "member-gift",
    title: "Tang voucher 50K cho thanh vien",
    description: "Doi diem nhan ngay voucher 50.000d.",
    validUntil: "30/09/2024",
    code: "MEMBER50",
    tag: "Thanh vien",
  },
];

const handleViewDetail = (promo) => {
  router.push({ path: `/account/promotions/${promo.id}` });
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header title="Khuyen mai" path="/account" />

    <section class="px-4 py-3">
      <p class="text-sm text-gray-600">
        Chon uu dai phu hop va doi diem hoac sao chep ma de su dung nhanh.
      </p>
    </section>

    <section class="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
      <article
        v-for="item in promotions"
        :key="item.id"
        class="relative rounded-xl border border-blue-100 bg-gradient-to-r from-blue-500 to-blue-400 p-4 text-white shadow"
      >
        <div class="flex items-start justify-between gap-2">
          <div>
            <span class="inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs uppercase tracking-wide">
              {{ item.tag }}
            </span>
            <h2 class="mt-2 text-base font-semibold">
              {{ item.title }}
            </h2>
            <p class="mt-1 text-sm text-white/90 leading-relaxed">
              {{ item.description }}
            </p>
          </div>
          <button
            class="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-white transition"
            @click="handleViewDetail(item)"
          >
            Chi tiet
          </button>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs">
          <span>Ma: <strong>{{ item.code }}</strong></span>
          <span>Han su dung: {{ item.validUntil }}</span>
        </div>
      </article>
    </section>
  </div>
</template>
