<script setup>
import Header from "../components/common/header.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import axios from "axios";

const router = useRouter();

// 🔹 Biến lưu danh sách khuyến mãi (ban đầu rỗng)
const promotions = ref([]);

// 🔹 Hàm gọi API
const fetchPromotions = async () => {
  try {
const res = await axios.get("http://localhost:3001/buyer/customer/promotions/list");
    if (res.data && res.data.code === 200) {
      // Chỉ lấy những khuyến mãi đang active (status === "1")
      promotions.value = res.data.data
        .filter(p => p.status === "1")
        .map(p => ({
          id: p.id,
          title: p.name,
          description:
            p.promotionType === "percent"
              ? `Giảm ${p.promotionValue}% cho đơn từ ${p.orderMinValue}đ`
              : `Giảm ${p.promotionValue.toLocaleString()}đ cho đơn từ ${p.orderMinValue}đ`,
          validUntil: p.endDate || "Không xác định",
          code: p.code,
          tag: p.promotionType === "percent" ? "Phần trăm" : "Giá trị",
        }));
    }
  } catch (err) {
    console.error("❌ Lỗi tải khuyến mãi:", err);
  }
};

// 🔹 Gọi khi trang load
onMounted(() => {
  fetchPromotions();
});

// 🔹 Khi bấm nút “Chi tiết”
const handleViewDetail = (promo) => {
  router.push({ path: `/account/promotions/${promo.id}` });
};
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Header title="Khuyến mãi" path="/account" />
<!-- 
    <section class="px-4 py-3">
      <p class="text-sm text-gray-600">
        Chọn ưu đãi phù hợp và sao chép mã để sử dụng.
      </p>
    </section> -->

    <section class="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
      <article
        v-for="item in promotions"
        :key="item.id"
        class="relative rounded-xl border border-blue-100 bg-gradient-to-r from-blue-500 to-blue-400 p-4 text-white shadow"
      >
        <div class="flex items-start justify-between gap-2">
          <div>
            <span
              class="inline-block rounded-full bg-white/20 px-2 py-0.5 text-xs uppercase tracking-wide"
            >
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
            Chi tiết
          </button>
        </div>
        <div class="mt-3 flex items-center justify-between text-xs">
          <span>Mã: <strong>{{ item.code }}</strong></span>
          <span>Hạn sử dụng: {{ item.validUntil }}</span>
        </div>
      </article>

      <!-- Hiển thị khi đang tải hoặc không có dữ liệu -->
      <p v-if="promotions.length === 0" class="text-center text-gray-500 text-sm mt-6">
        Không có khuyến mãi nào khả dụng.
      </p>
    </section>
  </div>
</template>
