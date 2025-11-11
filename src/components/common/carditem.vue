<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  order: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const order = computed(() => props.order ?? {})

const transactionDate = computed(() => {
  const value = order.value.transactionDate
  if (!value) {
    return { date: '', time: '' }
  }

  const [datePart, timePart] = value.split(' ')
  return {
    date: datePart ?? '',
    time: (timePart ?? '').slice(0, 5),
  }
})

const paymentStatusLabel = computed(() =>
  order.value.paymentStatus === '1' ? 'Da thanh toan' : 'Chua thanh toan',
)

const orderStatusLabel = computed(() => {
  const status = order.value.status || ''
  const map = {
    complete: 'Da giao',
    waiting: 'Cho xu ly',
    processing: 'Dang xu ly',
    shipping: 'Dang giao',
    return: 'Tra hang',
    cancelled: 'Da huy',
  }

  return map[status] ?? (status || 'Unknown')
})

const orderStatusClass = computed(() => {
  const status = order.value.status
  if (status === 'complete') return 'bg-green-100 text-green-700'
  if (status === 'return' || status === 'cancelled') return 'bg-red-100 text-red-700'
  if (status === 'shipping' || status === 'processing') return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-700'
})

const primaryProduct = computed(() => order.value.details?.[0] ?? null)

function formatCurrency(value) {
  const number = Number(value ?? 0)
  if (Number.isNaN(number)) {
    return '0đ'
  }
  return number.toLocaleString('vi-VN') + 'đ'
}

function goToDetail() {
  if (!order.value.id) {
    return
  }

  router.push(`/orders/detail/${order.value.id}`)
}
</script>

<template>
  <button
    type="button"
    class="w-full text-left"
    @click="goToDetail"
  >
    <div class="mx-0 mt-4 rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
      <div class="flex items-center justify-between border-b border-gray-100 pb-2">
        <h2 class="text-sm font-semibold text-gray-900">{{ order.code || 'Unknown' }}</h2>
        <div class="flex items-center gap-2 text-xs text-gray-600">
          <span>{{ transactionDate.date }}</span>
          <span v-if="transactionDate.date && transactionDate.time">|</span>
          <span>{{ transactionDate.time }}</span>
        </div>
      </div>

      <div class="mt-3 space-y-2 text-xs text-gray-600">
        <p>San pham</p>
        <div
          v-if="primaryProduct"
          class="flex gap-3"
        >
          <img
            :src="primaryProduct.productImage || '/images/nuoc_chanh.png'"
            alt="Product Image"
            class="h-12 w-12 rounded object-cover"
          >
          <div class="flex w-full justify-between">
            <div>
              <h3 class="font-medium text-gray-900">{{ primaryProduct.productName }}</h3>
              <p>{{ formatCurrency(primaryProduct.price) }}</p>
            </div>
            <p>x{{ primaryProduct.qty }}</p>
          </div>
        </div>
        <div v-else>
          <p>Khong co thong tin san pham.</p>
        </div>
      </div>

      <div class="mt-4 flex items-center justify-between text-xs">
        <div class="flex gap-2">
          <span class="rounded-lg bg-gray-200 px-2 py-1 text-gray-700">{{ paymentStatusLabel }}</span>
          <span :class="['rounded-lg px-2 py-1', orderStatusClass]">{{ orderStatusLabel }}</span>
        </div>
        <div class="flex items-center gap-1 text-gray-600">
          <span>Thanh tien</span>
          <span class="text-sm font-semibold text-gray-900">{{ formatCurrency(order.total) }}</span>
        </div>
      </div>
    </div>
  </button>
</template>

<style scoped>
button {
  font-size: 0.7rem;
}
</style>
