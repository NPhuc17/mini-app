<script setup>
import { ref, onMounted } from 'vue'
import Header from '../components/common/header.vue'
import BottomNav from '../components/layout/bottom_nav.vue'

// 🟢 Dữ liệu form
const formData = ref({
  name: '',
  phone: '',
  email: '',
  birthday: '',
  gender: '',
})

// 🟢 Gọi API khi vào trang
onMounted(async () => {
  try {
    const res = await fetch('http://localhost:3001/buyer/customer/contact/11875')
    const json = await res.json()
    if (json && json[0]?.data) {
      const data = json[0].data
      formData.value = {
        name: data.name || '',
        phone: data.phone || '',
        email: data.email || '',
        birthday: data.birthday ? formatDate(data.birthday) : '',
        gender: data.gender?.toLowerCase() || '',
      }
    }
  } catch (err) {
    console.error('❌ Lỗi khi tải thông tin:', err)
  }
})

// 🟢 Định dạng ngày (nếu cần)
function formatDate(dateStr) {
  // Ví dụ API trả "22/09/2025", ta chuyển về "2025-09-22" cho input[type=date]
  const parts = dateStr.split('/')
  if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`
  return ''
}

// 🟢 Gửi API cập nhật thông tin
async function handleSubmit(e) {
  e.preventDefault()
  try {
    const res = await fetch('http://localhost:3001/buyer/customer/contact/11875', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.value.name,
        email: formData.value.email,
        birthday: formData.value.birthday,
        gender: formData.value.gender,
      }),
    })

    if (!res.ok) throw new Error('Lỗi cập nhật!')
    alert('✅ Cập nhật thành công!')
  } catch (err) {
    console.error('❌ Lỗi khi cập nhật:', err)
    alert('Cập nhật thất bại!')
  }
}
</script>

<template>
  <div class="min-h-screen flex flex-col justify-between bg-gray-50">
    <Header title="Cập nhật thông tin" path="/account" />

    <section class="flex items-center justify-center my-4 border-b-2 border-gray-200">
      <img src="/images/avatar.png" alt="Avatar" class="w-20 h-20 rounded-full" />
    </section>

    <section class="mx-4 mb-10">
      <h1 class="font-semibold text-lg mb-2">Thông tin cá nhân</h1>

      <form class="flex flex-col gap-4" @submit="handleSubmit">
        <!-- Họ và tên -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Họ và tên <span class="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            v-model="formData.name"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <!-- Số điện thoại -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Số điện thoại <span class="text-red-500">*</span>
          </label>
          <input
            type="tel"
            v-model="formData.phone"
            placeholder="Nhập số điện thoại"
            disabled
            class="w-full border border-gray-200 bg-gray-100 rounded-lg p-2 text-gray-500 cursor-not-allowed"
          />
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            v-model="formData.email"
            placeholder="Nhập email"
            class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <div class="flex justify-between sm:flex-col gap-4">
          <!-- Ngày sinh -->
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
            <input
              type="date"
              v-model="formData.birthday"
              class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>

          <!-- Giới tính -->
          <div class="flex-1">
            <label class="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
            <select
              v-model="formData.gender"
              class="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="">Chọn giới tính</option>
              <option value="m">Nam</option>
              <option value="f">Nữ</option>
              <option value="khac">Khác</option>
            </select>
          </div>
        </div>

        <!-- Nút -->
        <button
          type="submit"
          class="mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Xác nhận
        </button>
      </form>
    </section>

    <BottomNav />
  </div>
</template>
