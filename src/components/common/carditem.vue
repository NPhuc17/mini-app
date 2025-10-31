<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  order: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const fullOrder = ref(props.order) // lưu order đầy đủ

onMounted(async () => {
  try {
    const res = await fetch(`http://localhost:3001/buyer/customer/order/${props.order.id}`)
    const data = await res.json()

    console.log('📦 Dữ liệu chi tiết:', data)

    if (data.code === 200 && data.order) {
      // Gộp chi tiết sản phẩm + thông tin đơn hàng
      fullOrder.value = {
        ...data.order,
        details: data.details || []
      }
    } else {
      console.error('Không tìm thấy chi tiết đơn hàng', data)
    }
  } catch (err) {
    console.error('Lỗi khi tải chi tiết đơn hàng:', err)
  }
})

function goToDetail() {
  router.push(`/orders/detail/${props.order.id}`)
}
</script>

<template>
  <div
    class="mx-4 bg-white border-2 border-gray-100 rounded-lg p-4 mb-4 shadow-sm mt-4 cursor-pointer"
    @click="goToDetail"
  >
    <!-- Mã đơn + thời gian -->
    <div class="flex justify-between items-center border-b-2 border-gray-100 pb-1">
      <h2 class="font-semibold">{{ fullOrder.code }}</h2>
      <div class="time flex items-center gap-2 text-sm text-gray-700">
        <p>{{ fullOrder.transactionDate?.split(' ')[0] }}</p>
        <span>|</span>
        <p>{{ fullOrder.transactionDate?.split(' ')[1] }}</p>
      </div>
    </div>

    <!-- Danh sách sản phẩm -->
    <div class="mt-2">
      <p class="font-medium">Sản phẩm</p>

      <div
        v-if="fullOrder.details && fullOrder.details.length > 0"
        class="mt-1 space-y-2"
      >
        <div
          v-for="item in fullOrder.details"
          :key="item.id"
          class="item flex gap-2 border-b border-gray-100 pb-1"
        >
          <img
            :src="item.productImage ? `http://localhost:3001${item.productImage}` : '/default.jpg'"
            alt="Product Image"
            class="w-10 h-10 object-cover"
          />
          <div class="info flex justify-between w-full">
            <div>
              <h3 class="font-medium">{{ item.productName }}</h3>
              <p class="text-sm text-gray-600">{{ item.price.toLocaleString() }}đ</p>
            </div>
            <p>x{{ item.qty }}</p>
          </div>
        </div>
      </div>

      <p v-else class="text-sm text-gray-500 italic">Không có sản phẩm</p>

      <!-- Ghi chú -->
      <p class="mt-2 text-gray-600">
        Ghi chú: {{ fullOrder.note || '—' }}
      </p>

      <!-- Thanh toán + Tổng tiền -->
      <div class="flex justify-between items-center mt-2">
        <div class="flex gap-2">
          <div class="hinhthuc border-0 bg-gray-300 rounded-lg p-2">
            <p class="w-fit">{{ fullOrder.paymentMethod?.toUpperCase() || 'COD' }}</p>
          </div>

          <div
            class="thanhtoan border-0 rounded-lg p-2"
            :class="fullOrder.paymentStatus === '1' ? 'bg-green-200' : 'bg-red-200'"
          >
            <p class="w-fit">
              {{ fullOrder.paymentStatus === '1' ? 'Đã thanh toán' : 'Chưa thanh toán' }}
            </p>
          </div>
        </div>

        <div class="thanhtien flex gap-2">
          <p class="text-gray-600">Thành tiền</p>
          <p class="font-medium">{{ fullOrder.total?.toLocaleString() }}đ</p>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
    p{
        font-size: 0.7rem;
    }

</style>




<!-- API -->
<!-- <script setup>
defineProps({
  order: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <div class="mx-4 bg-white border-2 border-gray-100 rounded-lg p-4 mb-4 shadow-sm mt-4">
    
    <div class="flex justify-between items-center border-b-2 border-gray-100 pb-2">
      <h2 class="font-semibold">{{ order.code }}</h2>
      <div class="time flex items-center gap-2 text-sm text-gray-700">
        <p>{{ order.transactionDate?.split(' ')[0] }}</p>
        <span>|</span>
        <p>{{ order.transactionDate?.split(' ')[1] }}</p>
      </div>
    </div>

    
    <div class="mt-2">
      <p class="text-gray-700 font-medium">Khách hàng: {{ order.customerName }}</p>
      <p class="text-sm text-gray-600 mb-2">SĐT: {{ order.customerPhone }}</p>

      <div class="flex justify-between items-center">
        <div class="flex gap-2">
         
          <div class="hinhthuc border-0 bg-gray-300 rounded-lg p-2">
            <p class="w-fit">
              {{ order.paymentStatus == "1" ? "Đã thanh toán" : "Chưa thanh toán" }}
            </p>
          </div>

          
          <div
            class="thanhtoan border-0 rounded-lg p-2"
            :class="{
              'bg-green-100 text-green-700': order.status === 'complete',
              'bg-yellow-100 text-yellow-700': order.status === 'waiting',
              'bg-red-100 text-red-700': order.status === 'return'
            }"
          >
            <p class="w-fit capitalize">{{ order.status }}</p>
          </div>
        </div>

        <div class="thanhtien flex gap-2">
          <p class="text-gray-600">Thành tiền</p>
          <p class="font-semibold">{{ order.total.toLocaleString() }}₫</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
p {
  font-size: 0.7rem;
}
</style> -->

