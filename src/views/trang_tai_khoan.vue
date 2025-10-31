<script setup>
import { ref, onMounted } from "vue";
import Header from "../components/common/header.vue";
import BottomNav from "../components/layout/bottom_nav.vue";

const accountInfo = ref({
  name: "",
  phone: "",
  point: 0,
  totalOrder: 0,
  code: "",
});

// 🟢 Gọi API khi component được mount
onMounted(async () => {
  try {
    const res = await fetch("http://localhost:3001/buyer/customer/contact/11875");
    const json = await res.json();

    if (json && json[0]?.data) {
      const data = json[0].data;
      accountInfo.value = {
        name: data.name || "Chưa có tên",
        phone: data.phone || "Không có SĐT",
        point: data.point || 0,
        totalOrder: data.totalOrder || 0,
        code: data.code || "",
      };
    }
  } catch (err) {
    console.error("❌ Lỗi khi tải thông tin tài khoản:", err);
  }
});

// 🟢 Các liên kết nhanh
const quickLinks = [
  {
    id: "points",
    title: "Lịch sử tích điểm",
    to: "/account/points-history",
    icon: "star",
  },
  {
    id: "promotions",
    title: "Ưu đãi",
    to: "/account/promotions",
    icon: "ticket",
  },
  {
    id: "saved-addresses",
    title: "Địa chỉ đã lưu",
    to: "/account/saved-addresses",
    icon: "location",
  },
];
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between bg-gray-50">
    <div class="space-y-4 pb-4">
      <Header title="Tài khoản" path="/" />

      <section class="mx-4 mt-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between gap-3">
          <div class="flex gap-2 items-center">
            <img src="/images/avatar.png" alt="Avatar" class="w-10 h-10 rounded-full" />
            <div>
              <p class="text-sm text-gray-500">Tên tài khoản</p>
              <p class="font-medium text-gray-800">{{ accountInfo.name }}</p>
              <p class="text-xs text-gray-500">SĐT: {{ accountInfo.phone }}</p>
            </div>
          </div>

          <router-link to="/account/update" class="nav-item" active-class="active">
            <p class="text-gray-400 text-lg">›</p>
          </router-link>
        </div>
      </section>

      <section class="mx-4 rounded-2xl border border-gray-100 bg-white py-2 shadow-sm">
        <ul>
          <li
            v-for="item in quickLinks"
            :key="item.id"
            class="last:border-b-0 border-b border-gray-100"
          >
            <router-link
              :to="item.to"
              class="flex items-center justify-between gap-3 px-4 py-3 transition hover:bg-gray-50"
            >
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center text-blue-500">
                  <!-- icon logic giữ nguyên -->
                  <svg
                    v-if="item.icon === 'star'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m11.48 3.5 1.7 3.44c.15.3.44.51.77.56l3.8.55c.84.12 1.18 1.15.56 1.74l-2.74 2.67c-.24.23-.35.56-.29.89l.65 3.78c.14.83-.73 1.46-1.47 1.07l-3.4-1.79a1 1 0 0 0-.93 0l-3.4 1.79c-.74.39-1.61-.24-1.47-1.07l.65-3.78c.06-.33-.05-.66-.29-.89L4.69 9.79c-.62-.59-.28-1.62.56-1.74l3.8-.55c.33-.05.62-.26.77-.56l1.7-3.44c.37-.74 1.43-.74 1.8 0Z"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'location'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M19 9.5c0 4.42-5.48 9.61-6.77 10.8a.5.5 0 0 1-.68 0C10.27 19.11 4 14.1 4 9.5a7 7 0 1 1 14 0Z"
                    />
                  </svg>
                  <svg
                    v-else-if="item.icon === 'ticket'"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4 9c1.1 0 2-.9 2-2V5h12v2c0 1.1.9 2 2 2v6c-1.1 0-2 .9-2 2v2H6v-2c0-1.1-.9-2-2-2V9Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 7v10"
                    />
                  </svg>
                </div>

                <div>
                  <p class="text-sm font-semibold text-gray-900">
                    {{ item.title }}
                  </p>
                </div>
              </div>
              <span class="text-lg text-gray-300">›</span>
            </router-link>
          </li>
        </ul>
      </section>
    </div>

    <BottomNav />
  </div>
</template>
