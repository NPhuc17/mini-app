<script setup>
import { reactive, ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import Header from "../components/common/header.vue";

const router = useRouter();
const route = useRoute();

const existingAddresses = [
  {
    id: 1,
    label: "Nha rieng",
    recipient: "Nguyen Van A",
    phone: "0909 123 456",
    addressLine: "123 Nguyen Thi Minh Khai",
    district: "Quan 1",
    city: "TP.HCM",
    isDefault: true,
    note: "Giao gio hanh chinh.",
  },
  {
    id: 2,
    label: "Cong ty",
    recipient: "Nguyen Van A",
    phone: "0909 654 321",
    addressLine: "10 Nguyen Trai",
    district: "Quan 5",
    city: "TP.HCM",
    isDefault: false,
    note: "Nhan hang tai le tan toa nha A.",
  },
];

const form = reactive({
  id: null,
  label: "",
  recipient: "",
  phone: "",
  addressLine: "",
  district: "",
  city: "",
  note: "",
  isDefault: false,
});

const statusMessage = ref("");

watchEffect(() => {
  const addressId = Number(route.query.id || 0);
  const found = existingAddresses.find((item) => item.id === addressId);
  if (found) {
    Object.assign(form, found);
  } else {
    Object.assign(form, {
      id: null,
      label: "",
      recipient: "",
      phone: "",
      addressLine: "",
      district: "",
      city: "",
      note: "",
      isDefault: false,
    });
  }
  statusMessage.value = "";
});

const handleSubmit = () => {
  statusMessage.value = form.id
    ? "Da cap nhat dia chi thanh cong."
    : "Da them dia chi moi.";

  setTimeout(() => {
    router.push("/account/saved-addresses");
  }, 1200);
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header title="Chinh sua dia chi" path="/account/saved-addresses" />

    <section class="flex-1 overflow-y-auto px-4 py-4">
      <form
        class="space-y-4"
        @submit.prevent="handleSubmit"
      >
        <div class="grid grid-cols-1 gap-4">
          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">
              Ten goi
            </label>
            <input
              v-model="form.label"
              type="text"
              maxlength="50"
              required
              class="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Vi du: Nha rieng, Van phong..."
            />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1">
                Nguoi nhan
              </label>
              <input
                v-model="form.recipient"
                type="text"
                maxlength="50"
                required
                class="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1">
                So dien thoai
              </label>
              <input
                v-model="form.phone"
                type="tel"
                minlength="9"
                maxlength="15"
                required
                class="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">
              Dia chi
            </label>
            <input
              v-model="form.addressLine"
              type="text"
              maxlength="120"
              required
              class="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1">
                Quan/huyen
              </label>
              <input
                v-model="form.district"
                type="text"
                maxlength="60"
                required
                class="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-700 mb-1">
                Thanh pho
              </label>
              <input
                v-model="form.city"
                type="text"
                maxlength="60"
                required
                class="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-gray-700 mb-1">
              Ghi chu (khong bat buoc)
            </label>
            <textarea
              v-model="form.note"
              rows="3"
              maxlength="200"
              class="w-full rounded-lg border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Huong dan giao hang chi tiet neu can."
            />
          </div>
        </div>

        <label class="flex items-center gap-2 text-sm text-gray-700">
          <input
            v-model="form.isDefault"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400"
          />
          Dat lam dia chi mac dinh
        </label>

        <button
          type="submit"
          class="w-full rounded-lg bg-blue-500 py-2 text-sm font-semibold text-white shadow hover:bg-blue-600 transition"
        >
          Luu dia chi
        </button>

        <p
          v-if="statusMessage"
          class="text-center text-sm font-medium text-green-600"
        >
          {{ statusMessage }}
        </p>
      </form>
    </section>
  </div>
</template>
