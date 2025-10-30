<script setup>
import Header from '../components/common/header.vue';
import BottomNav from '../components/layout/bottom_nav.vue'
</script>

<template>

    <Header title="Cập nhật thông tin" path="/account"/>
    <section class="flex items-center justify-center my-4 border-b-2 border-gray-200">
        <img src="/images/avatar.png" alt="Avatar" class=" w-20 h-20 rounded-full">
    </section>

    <section class="mx-4">

        <h1>Thông tin cá nhân</h1>
        <form class="flex flex-col gap-4">
            <!-- Họ và tên -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Họ và tên <span class="text-red-500">*</span></label>
                <input type="text" placeholder="Nhập họ và tên"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-300" />
            </div>

            <!-- Số điện thoại -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại<span class="text-red-500">*</span></label>
                <input type="tel" placeholder="Nhập số điện thoại"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-300" />
            </div>

            <!-- Email -->
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" placeholder="Nhập email"
                    class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-300" />
            </div>

            <div class="flex justify-between sm:flex-col gap-4">
                <!-- Ngày sinh -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ngày sinh</label>
                    <input type="date"
                        class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 focus:outline-none" />
                </div>

                <!-- Giới tính -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Giới tính</label>
                    <select
                        class="w-full border border-gray-300 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none">
                        <option value="">Chọn giới tính</option>
                        <option value="nam">Nam</option>
                        <option value="nu">Nữ</option>
                        <option value="khac">Khác</option>
                    </select>
                </div>
            </div>

            <!-- Nút -->
            <button type="submit" class="mt-2 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                Xác nhận
            </button>
        </form>
    </section>

</template>
