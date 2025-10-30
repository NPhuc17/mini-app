<script setup>
import Header from '../components/common/header.vue';
// import { useRoute } from 'vue-router';

// const route = useRoute()
// const orderId = route.params.id
// console.log("Mã đơn hàng:", orderId)
// </script>

<template>

    <div class=" min-h-screen flex flex-col justify-between">
        <div>
            <Header title="Chi tiết đơn" path="/orders"/>
            <section class="trangthai flex justify-between items-center my-2 p-2 border border-gray-100 bg-white shadow-sm mx-2">
                <p>Trạng thái</p>
                <div class="flex gap-2">
                    <div class=" border-0 bg-background p-1">
                        <p>Chưa thanh toán</p>
                    </div>

                    <div class=" border-0 bg-orange-500 p-1">
                        <p>Đang giao hàng</p>
                    </div>
                </div>
            </section>


            <section class="thongtin mx-2 border border-gray-100 bg-white shadow-sm my-2">
                <h2 class="text-lg">Thông tin đơn hàng</h2>
                <div class="flex justify-between p-2">
                    <div class="left">
                        <p>Mã đơn hàng</p>
                        <p>Ngày đặt hàng</p>
                        <p>Phương thức thanh toán</p>
                        <p>Phương thức vận chuyển</p>
                    </div>
                    <div class="right text-right">
                        <p>DH023</p>
                        <p>6/10/2025 12:00</p>
                        <p>COD</p>
                        <p>Giao hàng tận nơi</p>
                    </div>
                </div>
            </section>

            <section class="vanchuyen border border-gray-100 bg-white shadow-sm mx-2 mt-4 mb-2">
                <h2 class="text-lg">Thông tin vận chuyển</h2>
                <div class="giaohang p-2">
                    <p>Giao hàng tiết kiệm</p>
                    <div class="flex gap-2">
                        <svg fill="#000000" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" class="w-5 h-5">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <path
                                    d="M2.84375 13C1.285156 13 0 14.285156 0 15.84375L0 42C0 43.660156 1.339844 45 3 45L7.09375 45C7.570313 47.835938 10.035156 50 13 50C15.964844 50 18.429688 47.835938 18.90625 45L28.15625 45C28.894531 45 29.554688 44.6875 30.0625 44.21875C30.582031 44.675781 31.246094 44.992188 32 45L33.09375 45C33.570313 47.835938 36.035156 50 39 50C42.300781 50 45 47.300781 45 44C45 40.699219 42.300781 38 39 38C36.035156 38 33.570313 40.164063 33.09375 43L32 43C31.8125 43 31.527344 42.871094 31.3125 42.65625C31.097656 42.441406 31 42.183594 31 42L31 23C31 22.625 31.625 22 32 22L40 22C40.785156 22 41.890625 22.839844 42.65625 23.75C42.664063 23.761719 42.679688 23.769531 42.6875 23.78125L42.84375 24L38 24C36.40625 24 35 25.289063 35 27L35 31C35 31.832031 35.375 32.5625 35.90625 33.09375C36.4375 33.625 37.167969 34 38 34L48 34L48 42C48 42.375 47.375 43 47 43L45 43L45 45L47 45C48.660156 45 50 43.660156 50 42L50 32.375C50 30.085938 48.40625 28.0625 48.40625 28.0625L48.375 28.0625L44.25 22.5625L44.25 22.53125L44.21875 22.5C43.296875 21.386719 41.914063 20 40 20L32 20C31.644531 20 31.316406 20.074219 31 20.1875L31 15.90625C31 14.371094 29.789063 13 28.1875 13 Z M 2.84375 15L28.1875 15C28.617188 15 29 15.414063 29 15.90625L29 42.15625C29 42.625 28.628906 43 28.15625 43L18.90625 43C18.429688 40.164063 15.964844 38 13 38C10.035156 38 7.570313 40.164063 7.09375 43L3 43C2.625 43 2 42.371094 2 42L2 15.84375C2 15.375 2.367188 15 2.84375 15 Z M 38 26L44.34375 26L46.78125 29.25C46.78125 29.25 47.6875 30.800781 47.875 32L38 32C37.832031 32 37.5625 31.875 37.34375 31.65625C37.125 31.4375 37 31.167969 37 31L37 27C37 26.496094 37.59375 26 38 26 Z M 13 40C15.222656 40 17 41.777344 17 44C17 46.222656 15.222656 48 13 48C10.777344 48 9 46.222656 9 44C9 41.777344 10.777344 40 13 40 Z M 39 40C41.222656 40 43 41.777344 43 44C43 46.222656 41.222656 48 39 48C36.777344 48 35 46.222656 35 44C35 41.777344 36.777344 40 39 40Z">
                                </path>
                            </g>
                        </svg>
                        <div>
                            <p class="text-background">Đang giao hàng</p>
                            <p>6/10/2025 12:00</p>
                        </div>
                    </div>
                </div>

                <div class="diachi p-2">
                    <p>Địa chỉ giao hàng</p>
                    <div class="flex gap-2">
                        <svg viewBox="0 0 8.4666669 8.4666669" id="svg8" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#"
                            xmlns:dc="http://purl.org/dc/elements/1.1/"
                            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
                            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
                            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
                            xmlns:svg="http://www.w3.org/2000/svg" fill="#000000" class="w-5 h-5">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <defs id="defs2"></defs>
                                <g id="layer1" transform="translate(0,-288.53332)">
                                    <path
                                        d="m 4.2324219,288.79688 c -1.6042437,0 -2.9101556,1.30591 -2.9101563,2.91015 -10e-7,2.82277 2.7460938,4.96875 2.7460938,4.96875 a 0.26460978,0.26460978 0 0 0 0.3300781,0 c 0,0 2.7460996,-2.14598 2.7460937,-4.96875 -3.4e-6,-1.60424 -1.3078657,-2.91015 -2.9121093,-2.91015 z m 0,0.52929 c 1.3182605,0 2.3828097,1.0626 2.3828125,2.38086 4.8e-6,2.30926 -2.0910618,4.13374 -2.3808594,4.38086 -0.2884142,-0.24588 -2.3828134,-2.0707 -2.3828125,-4.38086 5e-7,-1.31826 1.0625988,-2.38086 2.3808594,-2.38086 z"
                                        id="path929"
                                        style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.52916664;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke fill markers;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate">
                                    </path>
                                    <path
                                        d="m 4.2324219,290.38477 c -0.7274912,0 -1.3222633,0.59477 -1.3222657,1.32226 -4.5e-6,0.7275 0.5947697,1.32422 1.3222657,1.32422 0.727496,0 1.3242233,-0.59672 1.3242187,-1.32422 -2.3e-6,-0.72749 -0.5967275,-1.32226 -1.3242187,-1.32226 z m 0,0.52929 c 0.4415089,0 0.7949204,0.35146 0.7949219,0.79297 2.7e-6,0.44151 -0.35341,0.79492 -0.7949219,0.79492 -0.441512,0 -0.7929715,-0.35341 -0.7929688,-0.79492 1.4e-6,-0.44151 0.3514598,-0.79297 0.7929688,-0.79297 z"
                                        id="circle931"
                                        style="color:#000000;font-style:normal;font-variant:normal;font-weight:normal;font-stretch:normal;font-size:medium;line-height:normal;font-family:sans-serif;font-variant-ligatures:normal;font-variant-position:normal;font-variant-caps:normal;font-variant-numeric:normal;font-variant-alternates:normal;font-feature-settings:normal;text-indent:0;text-align:start;text-decoration:none;text-decoration-line:none;text-decoration-style:solid;text-decoration-color:#000000;letter-spacing:normal;word-spacing:normal;text-transform:none;writing-mode:lr-tb;direction:ltr;text-orientation:mixed;dominant-baseline:auto;baseline-shift:baseline;text-anchor:start;white-space:normal;shape-padding:0;clip-rule:nonzero;display:inline;overflow:visible;visibility:visible;opacity:1;isolation:auto;mix-blend-mode:normal;color-interpolation:sRGB;color-interpolation-filters:linearRGB;solid-color:#000000;solid-opacity:1;vector-effect:none;fill:#000000;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:0.52916664;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;paint-order:stroke fill markers;color-rendering:auto;image-rendering:auto;shape-rendering:auto;text-rendering:auto;enable-background:accumulate">
                                    </path>
                                </g>
                            </g>
                        </svg>
                        <div>
                            <p class="">Tên khách (+84 123 456 789)</p>
                            <p class=" overflow-hidden">Âu Cơ, Tân Phú</p>
                        </div>
                    </div>
                </div>
            </section>



            <section class="sanpham border border-gray-100 bg-white shadow-sm mx-2 ">
                <h2 class="text-lg">Sản phẩm</h2>
                <div class="item flex gap-2 border-b-2 border-gray-100 pb-2 mx-2">
                    <img src="/images/nuoc_chanh.png" alt="Product Image" class="w-15 h-15 object-cover">
                    <div class="info flex justify-between w-full">
                        <div>
                            <h3 class="font-medium">Nước chanh</h3>
                            <p>Nước chanh</p>
                        </div>
                        <div>
                            <p>x1</p>
                            <p class="text-sm text-gray-600 mt-5">100000</p>
                        </div>
                    </div>
                </div>


                
            </section>

            <section class="tongtien border border-gray-100 bg-white shadow-sm mx-2">
                <h2 class="text-lg">Tổng tiền</h2>
                <div class="flex justify-between p-2 border-b-2 border-gray-100">
                    <div class="left">
                        <p>Tổng tiền hàng</p>
                        <p>Phí vận chuyển</p>
                        <p>Khuyến mãi</p>
                    </div>
                    <div class="right text-right">
                        <p>100000</p>
                        <p>20000</p>
                        <p>0</p>
                    </div>
                </div>
                <div>
                    <p class="text-right">Thành tiền 
                        <span class=" font-bold">120000</span>
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
