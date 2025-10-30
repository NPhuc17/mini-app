<script setup>
import Header from '../components/common/header.vue';
import BottomNav from '../components/layout/bottom_nav.vue';
import CardItem from '../components/common/carditem.vue';
// const orders = ref([])

// onMounted(async () => {
//   try {
//     const res = await fetch('http://localhost:3001/buyer/customer/contact/11875/order')
//     const data = await res.json()
//     orders.value = data[0]?.data || []
//   } catch (err) {
//     console.error('Lỗi tải dữ liệu:', err)
//   }
// })
</script>

<template>
  <div class="trang-tai-khoan min-h-screen flex flex-col justify-between">
    <div>
      <Header title="Lịch sử đơn hàng" />
      <nav class="w-full bg-white border-b">
        <ul class="flex space-x-4 overflow-x-auto whitespace-nowrap px-4 py-2 scrollbar-hide">
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100 active:border-b-2 active:border-blue-500">Chờ xác nhận</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Chờ lấy hàng</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Chờ giao hàng</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Đã giao</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Trả hàng</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Đã huỷ</li>
        </ul>
      </nav>
      <div class="">
        <CardItem />
 <!-- <CardItem v-for="order in orders" :key="order.id" :order="order" /> -->
      </div>
    </div>
    <BottomNav />
  </div>
</template>
