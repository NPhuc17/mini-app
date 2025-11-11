<script setup>
import { onMounted, ref } from 'vue'
import Header from '../components/common/header.vue'
import BottomNav from '../components/layout/bottom_nav.vue'
import CardItem from '../components/common/carditem.vue'

const orders = ref([])
const isLoading = ref(true)
const errorMessage = ref('')

function normalizeOrder(payload) {
  const order = payload?.order ?? {}

  return {
    id: order.id,
    code: order.code,
    transactionDate: order.transactionDate,
    paymentStatus: order.paymentStatus,
    status: order.status,
    total: order.total,
    paymentMethod: order.paymentMethod,
    type: order.type,
    customerName: order.customerName,
    customerPhone: order.customerPhone,
    details: payload?.details ?? [],
  }
}

async function loadOrders() {
  try {
    const response = await fetch('/order/417')
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const payload = await response.json()
    orders.value = [normalizeOrder(payload)]
  } catch (error) {
    console.error('Failed to load orders', error)
    errorMessage.value = 'Khong the tai danh sach don hang.'
  } finally {
    isLoading.value = false
  }
}

onMounted(loadOrders)
</script>

<template>
  <div class="trang-don-hang min-h-screen flex flex-col justify-between">
    <div>
      <Header title="Lich su don hang" />
      <nav class="w-full bg-white border-b">
        <ul class="flex space-x-4 overflow-x-auto whitespace-nowrap px-4 py-2 scrollbar-hide">
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100 active:border-b-2 active:border-blue-500">
            Cho xac nhan
          </li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Cho lay hang</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Cho giao hang</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Da giao</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Tra hang</li>
          <li class="flex-shrink-0 px-3 py-2 rounded-lg hover:bg-gray-100">Da huy</li>
        </ul>
      </nav>

      <div class="px-4 pb-20">
        <p v-if="isLoading" class="py-6 text-center text-sm text-gray-500">Dang tai danh sach don hang...</p>
        <p v-else-if="errorMessage" class="py-6 text-center text-sm text-red-500">{{ errorMessage }}</p>
        <CardItem
          v-else
          v-for="order in orders"
          :key="order.id"
          :order="order"
        />
      </div>
    </div>
    <BottomNav />
  </div>
</template>
