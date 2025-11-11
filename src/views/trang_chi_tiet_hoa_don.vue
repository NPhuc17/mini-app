<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/common/header.vue'

const route = useRoute()
const state = ref({
  data: null,
  isLoading: false,
  error: '',
})

const orderId = computed(() => route.params.id ?? '417')

watch(
  orderId,
  async (id) => {
    await loadOrder(id)
  },
  { immediate: true },
)

async function loadOrder(id) {
  state.value.isLoading = true
  state.value.error = ''

  try {
    const response = await fetch(`/order/${id}`)
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`)
    }

    const payload = await response.json()
    state.value.data = payload
  } catch (error) {
    console.error('Failed to load order detail', error)
    state.value.error = 'Khong the tai chi tiet don hang.'
  } finally {
    state.value.isLoading = false
  }
}

const order = computed(() => state.value.data?.order ?? {})
const products = computed(() => state.value.data?.details ?? [])
const histories = computed(() => state.value.data?.histories ?? [])

const isLoading = computed(() => state.value.isLoading)
const errorMessage = computed(() => state.value.error)

function formatCurrency(value) {
  const number = Number(value ?? 0)
  if (Number.isNaN(number)) {
    return '0đ'
  }
  return number.toLocaleString('vi-VN') + 'đ'
}

function splitDateTime(value) {
  if (!value) {
    return { date: '', time: '' }
  }
  const [datePart, timePart] = value.split(' ')
  return {
    date: datePart ?? '',
    time: timePart ?? '',
  }
}

const transactionDate = computed(() => splitDateTime(order.value.transactionDate))
const completeTime = computed(() => splitDateTime(order.value.completeTime))

const paymentStatusLabel = computed(() =>
  order.value.paymentStatus === '1' ? 'Da thanh toan' : 'Chua thanh toan',
)

const paymentMethodLabel = computed(() => {
  const method = order.value.paymentMethod || ''
  const map = {
    cash: 'Tien mat',
    card: 'The',
    transfer: 'Chuyen khoan',
  }
  return map[method] ?? (method || 'Khong ro')
})

const orderTypeLabel = computed(() => {
  const type = order.value.type || ''
  const map = {
    takeaway: 'Nhan tai cua hang',
    delivery: 'Giao tan noi',
    dinein: 'Dung tai cho',
  }
  return map[type] ?? (type || 'Khong ro')
})

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

  return map[status] ?? (status || 'Khong ro')
})

const orderStatusClass = computed(() => {
  const status = order.value.status
  if (status === 'complete') return 'bg-green-100 text-green-700'
  if (status === 'return' || status === 'cancelled') return 'bg-red-100 text-red-700'
  if (status === 'shipping' || status === 'processing') return 'bg-yellow-100 text-yellow-700'
  return 'bg-gray-100 text-gray-700'
})

const totals = computed(() => {
  const subtotal = products.value.reduce((sum, item) => sum + Number(item.total ?? 0), 0)
  const shipping = Number(order.value.otherFeeTotal ?? 0)
  const discount =
    Number(order.value.discountTotal ?? 0) +
    Number(order.value.promotionTotal ?? 0) +
    Number(order.value.pointDiscountValue ?? 0)
  const tax = Number(order.value.taxTotal ?? 0)
  const finalTotal = Number(order.value.total ?? 0)

  return {
    subtotal,
    shipping,
    discount,
    tax,
    finalTotal,
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Header title="Chi tiet don" path="/orders" />

    <section v-if="isLoading" class="px-4 py-6 text-center text-sm text-gray-500">
      Dang tai chi tiet don hang...
    </section>
    <section v-else-if="errorMessage" class="px-4 py-6 text-center text-sm text-red-500">
      {{ errorMessage }}
    </section>
    <div v-else class="space-y-4 px-4 pb-10 pt-4">
      <section class="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div class="flex flex-wrap items-center gap-2">
          <span :class="['rounded px-2 py-1 text-xs font-medium uppercase', orderStatusClass]">
            {{ orderStatusLabel }}
          </span>
          <span class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700">
            {{ paymentStatusLabel }}
          </span>
        </div>
        <p class="mt-2 text-xs text-gray-500">
          Cap nhat luc: {{ completeTime.date }} {{ completeTime.time }}
        </p>
      </section>

      <section class="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <h2 class="text-sm font-semibold text-gray-900">Thong tin don hang</h2>
        <ul class="mt-3 space-y-2 text-xs text-gray-600">
          <li class="flex justify-between">
            <span>Ma don</span>
            <span>{{ order.code }}</span>
          </li>
          <li class="flex justify-between">
            <span>Ngay dat</span>
            <span>{{ transactionDate.date }} {{ transactionDate.time }}</span>
          </li>
          <li class="flex justify-between">
            <span>Hinh thuc thanh toan</span>
            <span>{{ paymentMethodLabel }}</span>
          </li>
          <li class="flex justify-between">
            <span>Loai don</span>
            <span>{{ orderTypeLabel }}</span>
          </li>
        </ul>
      </section>

      <section class="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <h2 class="text-sm font-semibold text-gray-900">Thong tin khach hang</h2>
        <ul class="mt-3 space-y-2 text-xs text-gray-600">
          <li class="flex justify-between">
            <span>Khach hang</span>
            <span>{{ order.customerName || 'Khong ro' }}</span>
          </li>
          <li class="flex justify-between">
            <span>Dien thoai</span>
            <span>{{ order.customerPhone || 'Khong ro' }}</span>
          </li>
        </ul>
      </section>

      <section class="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <div class="flex items-center justify-between">
          <h2 class="text-sm font-semibold text-gray-900">San pham</h2>
          <span class="text-xs text-gray-500">{{ products.length }} mat hang</span>
        </div>

        <ul class="mt-4 space-y-3">
          <li
            v-for="item in products"
            :key="item.id"
            class="flex gap-3"
          >
            <img
              :src="item.productImage || '/images/nuoc_chanh.png'"
              alt="Product Image"
              class="h-14 w-14 flex-shrink-0 rounded object-cover"
            >
            <div class="flex w-full justify-between text-xs">
              <div class="space-y-1 text-gray-700">
                <p class="font-medium text-gray-900">{{ item.productName }}</p>
                <p>Don gia: {{ formatCurrency(item.price) }}</p>
                <p>So luong: x{{ item.qty }}</p>
              </div>
              <div class="text-right text-gray-900">
                <p class="font-semibold">{{ formatCurrency(item.total) }}</p>
              </div>
            </div>
          </li>
        </ul>
      </section>

      <section class="space-y-2 rounded-lg border border-gray-100 bg-white p-4 shadow-sm text-xs text-gray-600">
        <div class="flex justify-between">
          <span>Tam tinh</span>
          <span>{{ formatCurrency(totals.subtotal) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Phi van chuyen</span>
          <span>{{ formatCurrency(totals.shipping) }}</span>
        </div>
        <div class="flex justify-between">
          <span>Thue</span>
          <span>{{ formatCurrency(totals.tax) }}</span>
        </div>
        <div class="flex justify-between text-red-600">
          <span>Giam gia</span>
          <span>-{{ formatCurrency(totals.discount) }}</span>
        </div>
        <div class="flex justify-between border-t border-gray-100 pt-2 text-sm font-semibold text-gray-900">
          <span>Tong cong</span>
          <span>{{ formatCurrency(totals.finalTotal) }}</span>
        </div>
      </section>

      <section class="rounded-lg border border-gray-100 bg-white p-4 shadow-sm">
        <h2 class="text-sm font-semibold text-gray-900">Lich su xu ly</h2>
        <ul v-if="histories.length" class="mt-3 space-y-2 text-xs text-gray-600">
          <li
            v-for="history in histories"
            :key="history.id"
            class="rounded border border-gray-100 px-3 py-2"
          >
            <p class="font-semibold text-gray-900">{{ history.title }}</p>
            <p>{{ history.content }}</p>
            <p class="text-gray-500">Luc: {{ history.createTime }}</p>
          </li>
        </ul>
        <p v-else class="mt-3 text-xs text-gray-500">Chua co lich su nao.</p>
      </section>
    </div>
  </div>
</template>
