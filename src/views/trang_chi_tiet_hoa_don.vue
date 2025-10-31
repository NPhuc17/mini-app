<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Header from '../components/common/header.vue'

const route = useRoute()
const orderId = route.params.id
const order = ref(null)

onMounted(async () => {
    try {
        const res = await fetch(`http://localhost:3001/buyer/customer/order/${orderId}`)
        const data = await res.json()
        console.log('Chi tiết đơn hàng:', data)

        // ✅ Gán đúng phần order và details
        order.value = data.order
        order.value.details = data.details || []
    } catch (err) {
        console.error('Lỗi khi tải đơn hàng:', err)
    }
})

</script>

<template>
    <div class="min-h-screen flex flex-col justify-between">
        <div>
            <Header title="Chi tiết đơn" path="/orders" />

            <!-- 🔹 Trạng thái -->
            <section
                class="trangthai flex justify-between items-center my-2 p-2 border border-gray-100 bg-white shadow-sm mx-2"
                v-if="order">
                <p>Trạng thái</p>
                <div class="flex gap-2">
                    <div class="border-0 rounded-lg p-1"
                        :class="order.paymentStatus === '1' ? 'bg-green-200' : 'bg-background'">
                        <p>{{ order.paymentStatus === '1' ? 'Đã thanh toán' : 'Chưa thanh toán' }}</p>
                    </div>

                    <div class="border-0 bg-orange-500 p-1 rounded-lg text-white">
                        <p>{{ order.statusText || 'Đang giao hàng' }}</p>
                    </div>
                </div>
            </section>

            <!-- 🔹 Thông tin đơn hàng -->
            <section v-if="order" class="thongtin mx-2 border border-gray-100 bg-white shadow-sm my-2 rounded-lg">
                <h2 class="text-lg font-semibold border-b p-2">Thông tin đơn hàng</h2>
                <div class="flex justify-between p-2">
                    <div class="left text-gray-700">
                        <p>Mã đơn hàng</p>
                        <p>Ngày đặt hàng</p>
                        <p>Phương thức thanh toán</p>
                        <p>Phương thức vận chuyển</p>
                    </div>
                    <div class="right text-right">
                        <p>{{ order.code }}</p>
                        <p>{{ order.transactionDate }}</p>
                        <p>{{ order.paymentMethod?.toUpperCase() || 'COD' }}</p>
                        <p>{{ order.shippingMethod || 'Giao hàng tận nơi' }}</p>
                    </div>
                </div>
            </section>

            <!-- 🔹 Thông tin vận chuyển -->
            <section v-if="order" class="vanchuyen border border-gray-100 bg-white shadow-sm mx-2 mt-4 mb-2 rounded-lg">
                <h2 class="text-lg font-semibold border-b p-2">Thông tin vận chuyển</h2>
                <div class="giaohang p-2">
                    <p>{{ order.shippingProvider || 'Giao hàng tiết kiệm' }}</p>
                    <div class="flex gap-2 items-start mt-2">
                        <svg fill="#000000" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5">
                            <path
                                d="M2.84375 13C1.285156 13 0 14.285156 0 15.84375L0 42C0 43.660156 1.339844 45 3 45L7.09375 45C7.570313 47.835938 10.035156 50 13 50C15.964844 50 18.429688 47.835938 18.90625 45L28.15625 45C28.894531 45 29.554688 44.6875 30.0625 44.21875C30.582031 44.675781 31.246094 44.992188 32 45L33.09375 45C33.570313 47.835938 36.035156 50 39 50C42.300781 50 45 47.300781 45 44C45 40.699219 42.300781 38 39 38C36.035156 38 33.570313 40.164063 33.09375 43L32 43C31.8125 43 31.527344 42.871094 31.3125 42.65625C31.097656 42.441406 31 42.183594 31 42L31 23C31 22.625 31.625 22 32 22L40 22C40.785156 22 41.890625 22.839844 42.65625 23.75L42.84375 24L38 24C36.40625 24 35 25.289063 35 27L35 31C35 31.832031 35.375 32.5625 35.90625 33.09375C36.4375 33.625 37.167969 34 38 34L48 34L48 42C48 42.375 47.375 43 47 43L45 43L45 45L47 45C48.660156 45 50 43.660156 50 42L50 32.375C50 30.085938 48.40625 28.0625 48.40625 28.0625L44.25 22.5625C43.296875 21.386719 41.914063 20 40 20L32 20C31.644531 20 31.316406 20.074219 31 20.1875L31 15.90625C31 14.371094 29.789063 13 28.1875 13Z">
                            </path>
                        </svg>
                        <div>
                            <p class="text-background">
                                {{ order.statusText || 'Đang giao hàng' }}
                            </p>
                            <p>{{ order.shippingDate || order.transactionDate }}</p>
                        </div>
                    </div>
                </div>

                <div class="diachi p-2 border-t border-gray-100">
                    <p class="font-medium">Địa chỉ giao hàng</p>
                    <div class="flex gap-2 mt-2">
                        <svg viewBox="0 0 8.4666669 8.4666669" xmlns="http://www.w3.org/2000/svg" fill="#000000"
                            class="w-5 h-5">
                            <path
                                d="m4.23 288.8c-1.6 0-2.91 1.31-2.91 2.91 0 2.82 2.75 4.97 2.75 4.97a.26.26 0 0 0 .33 0s2.75-2.15 2.75-4.97c0-1.6-1.31-2.91-2.91-2.91z"
                                transform="translate(0 -288.53332)" />
                        </svg>
                        <div>
                            <p>
                                {{ order.receiverName || 'Người nhận' }}
                                ({{ order.receiverPhone || '+84 xxx xxx xxx' }})
                            </p>
                            <p class="overflow-hidden">
                                {{ order.shippingAddress || 'Không có địa chỉ' }}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 🔹 Danh sách sản phẩm -->
            <section v-if="order" class="sanpham border border-gray-100 bg-white shadow-sm mx-2 rounded-lg">
                <h2 class="text-lg font-semibold border-b p-2">Sản phẩm</h2>

                <div v-for="item in order.details" :key="item.id"
                    class="item flex gap-2 border-b-2 border-gray-100 pb-2 mx-2 my-2">
                    <img :src="`http://localhost:3001${item.productImage}`" alt="Product Image"
                        class="w-16 h-16 object-cover rounded-md" />
                    <div class="info flex justify-between w-full">
                        <div>
                            <h3 class="font-medium">{{ item.productName }}</h3>
                            <p class="text-gray-600 text-sm">{{ item.productDesc }}</p>
                        </div>
                        <div class="text-right">
                            <p>x{{ item.qty }}</p>
                            <p class="text-sm text-gray-600 mt-1">
                                {{ item.price.toLocaleString() }}đ
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <!-- 🔹 Tổng tiền -->
            <section v-if="order" class="tongtien border border-gray-100 bg-white shadow-sm mx-2 mt-2 rounded-lg">
                <h2 class="text-lg font-semibold border-b p-2">Tổng tiền</h2>
                <div class="flex justify-between p-2 border-b-2 border-gray-100">
                    <div class="left">
                        <p>Tổng tiền hàng</p>
                        <p>Phí vận chuyển</p>
                        <p>Khuyến mãi</p>
                    </div>
                    <div class="right text-right">
                        <p>{{ order.totalRevenue?.toLocaleString() || 0 }}</p>
                        <p>{{ order.otherFeeTotal?.toLocaleString() || 0 }}</p>
                        <p>{{ order.promotionTotal?.toLocaleString() || 0 }}</p>
                    </div>
                </div>
                <div>
                    <p class="text-right font-medium p-2">
                        Thành tiền:
                        <span class="font-bold text-lg text-orange-600">
                            {{ order.total?.toLocaleString() || 0 }}đ
                        </span>
                    </p>
                </div>
            </section>

        </div>
    </div>
</template>


<style scoped>
p {
    font-size: 0.7rem;
}
</style>
