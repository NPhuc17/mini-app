<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Header from "../components/common/header.vue";

const router = useRouter();

const addresses = ref([
  {
    id: 1,
    label: "Nha rieng",
    recipient: "Nguyen Van A",
    phone: "0909 123 456",
    addressLine: "123 Nguyen Thi Minh Khai, Quan 1",
    city: "TP.HCM",
    isDefault: true,
  },
  {
    id: 2,
    label: "Cong ty",
    recipient: "Nguyen Van A",
    phone: "0909 654 321",
    addressLine: "10 Nguyen Trai, Quan 5",
    city: "TP.HCM",
    isDefault: false,
  },
]);

const handleEdit = (id) => {
  router.push({ path: "/account/address/edit", query: { id } });
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header title="Dia chi da luu" path="/account" />

    <section class="px-4 py-3">
      <button
        class="w-full rounded-lg bg-blue-500 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600 transition"
        @click="router.push('/account/address/edit')"
      >
        Them dia chi moi
      </button>
    </section>

    <section class="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
      <article
        v-for="item in addresses"
        :key="item.id"
        class="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
      >
        <header class="flex items-start justify-between gap-2">
          <div>
            <p class="text-sm font-semibold text-gray-900">
              {{ item.label }}
              <span
                v-if="item.isDefault"
                class="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-600"
              >
                Mac dinh
              </span>
            </p>
            <p class="text-xs text-gray-500 mt-1">
              {{ item.recipient }} • {{ item.phone }}
            </p>
          </div>
          <button
            class="text-xs font-semibold text-blue-500 hover:text-blue-600"
            @click="handleEdit(item.id)"
          >
            Chinh sua
          </button>
        </header>

        <p class="mt-3 text-sm text-gray-700 leading-relaxed">
          {{ item.addressLine }}, {{ item.city }}
        </p>
      </article>
    </section>
  </div>
</template>
