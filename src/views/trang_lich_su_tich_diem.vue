<script setup>
import { computed } from "vue";
import Header from "../components/common/header.vue";

const pointHistory = [
  {
    id: 1,
    title: "Dat hang #A1024",
    points: 120,
    createdAt: "05/08/2024",
    type: "earn",
    note: "Nhan diem tu don dat hang thanh cong.",
  },
  {
    id: 2,
    title: "Su dung uu dai mua he",
    points: -80,
    createdAt: "28/07/2024",
    type: "redeem",
    note: "Doi diem lay ma giam gia 20%.",
  },
  {
    id: 3,
    title: "Hoan diem cho don #A0988",
    points: 40,
    createdAt: "15/07/2024",
    type: "earn",
    note: "Hoan lai diem do don hang hoan thanh.",
  },
  {
    id: 4,
    title: "Doi qua sinh nhat",
    points: -150,
    createdAt: "01/07/2024",
    type: "redeem",
    note: "Su dung diem doi qua tang dac biet.",
  },
];

const totalPoint = computed(() =>
  pointHistory.reduce((sum, entry) => sum + entry.points, 0)
);
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header title="Lich su tich diem" path="/account" />

    <section class="bg-blue-50 px-4 py-3 text-sm text-blue-700">
      <p class="font-semibold">Tong diem con lai: {{ totalPoint }}</p>
      <p>Hay tich luy va doi diem de nhan uu dai hap dan.</p>
    </section>

    <section class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
      <article
        v-for="entry in pointHistory"
        :key="entry.id"
        class="rounded-lg border border-gray-200 bg-white p-3 shadow-sm"
      >
        <div class="flex items-start justify-between">
          <div>
            <h2 class="text-sm font-semibold text-gray-900">
              {{ entry.title }}
            </h2>
            <p class="text-xs text-gray-500 mt-1">{{ entry.createdAt }}</p>
          </div>
          <span
            :class="[
              'text-sm font-semibold',
              entry.type === 'earn' ? 'text-green-600' : 'text-red-500',
            ]"
          >
            {{ entry.type === "earn" ? "+" : "" }}{{ entry.points }} diem
          </span>
        </div>
        <p class="mt-2 text-xs text-gray-600 leading-relaxed">
          {{ entry.note }}
        </p>
      </article>
    </section>
  </div>
</template>
