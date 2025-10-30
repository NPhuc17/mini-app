<template>
  <div class="trang-chu">
    <!-- Header -->
    <div class="header">
      <div class="welcome">
        <img src="/images/avatar.png" class="avatar" />
        <div class="welcome-text">
          <span>Chào mừng trở lại</span>
          <h3>ABC</h3>
        </div>
      </div>

      <!-- iOrder Banner -->
      <div class="banner">
        <img src="/images/banner.png" />
      </div>
    </div>

    <!-- Search Bar - Moved outside header -->
    <div class="search-container">
      <div class="search-bar">
        <span class="search-icon">🍽️</span>
        <input type="text" v-model="searchQuery" placeholder="Tìm kiếm món ăn, thức uống..." />
        <button class="search-button" @click="handleSearch">🔍</button>
      </div>
    </div>

    <!-- Categories -->
    <div class="categories">
      <h3>Danh mục sản phẩm</h3>
      <div class="category-list">
        <div class="category-item active">
          <img src="/images/menu_button.png" alt="menu_button" />
          <span>Tất cả</span>
        </div>
        <div class="category-item">
          <img src="/images/cha_chien.png" alt="Chả chiên" />
          <span>Chả chiên</span>
        </div>
        <div class="category-item">
          <img src="/images/cha_chien.png" alt="Chả chiên" />
          <span>Chả chiên</span>
        </div>
        <div class="category-item">
          <img src="/images/cha_chien.png" alt="Chả chiên" />
          <span>Chả chiên</span>
        </div>
      </div>
    </div>

    <!-- Product Grid -->
    <div class="product-grid">
      <ProductCard v-for="p in products" :key="p.id" :product="p" @select="onSelectProduct" />
    </div>
    <BottomNav />
  </div>
</template>

<script>
import BottomNav from '../components/layout/bottom_nav.vue'
import ProductCard from '../components/common/product_card.vue'

export default {
  name: 'TrangChu',
  components: {
    BottomNav,
    ProductCard
  },
  data() {
    return {
      searchQuery: '',
      products: [
        { id: 1, name: 'Nước chanh', price: '10.000 đ', image: '/images/nuoc_chanh.png' },
        { id: 2, name: 'Nước chanh', price: '10.000 đ', image: '/images/nuoc_chanh.png' },
        { id: 3, name: 'Nước chanh', price: '10.000 đ', image: '/images/nuoc_chanh.png' },
        { id: 4, name: 'Nước chanh', price: '10.000 đ', image: '/images/nuoc_chanh.png' }
      ]
    }
  },
  methods: {
    handleSearch() {
      this.$router.push({
        path: '/search',
        query: { q: this.searchQuery }
      })
      console.log('Searching for:', this.searchQuery)
    },
    onSelectProduct(product) {
      // ví dụ: chuyển sang trang chi tiết hoặc thêm vào giỏ
      console.log('selected', product)
      // this.$router.push({ name: 'ProductDetail', params: { id: product.id } })
    }
  }
}
</script>

<style scoped>
.trang-chu {
  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
}

.header {
  background: #2095F3;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 20px;
  color: white;
  flex-shrink: 0;
}

.welcome {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-left: 10px;
}

.banner {
  width: 100%;
  text-align: center;
  margin-left: -15px;
  width: calc(100% + 30px);
  margin-top: 20px;
  background: #2095F3;
  box-shadow: 0 4px 8px rgba(56, 55, 55, 0.2);
  /* 👈 Bóng đổ phía dưới */
}

.banner img {
  width: 100%;
  height: auto;
  object-fit: contain;
  margin-bottom: 0;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  display: block;
}

.logo {
  font-size: 1.8em;
  font-weight: bold;
}

.search-container {

  border-radius: 25px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  margin-top: -5;
  margin-bottom: 10px;

}

.search-bar {
  background: white;
  border-radius: 25px;
  padding: 5px 5px;
  display: flex;
  align-items: center;
  width: 100%;
}

.search-bar input {
  background: white;
  border-radius: 20px;
  padding: 8px 12px;
  flex: 1;
  border: none;
  outline: none;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 5px;
  transition: opacity 0.2s;
  font-size: 18px;
  /* Increase icon size */
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-button:hover {
  opacity: 0.7;
}

.categories {
  padding: 5px;
}

.categories h3 {
  font-size: 16px;
  margin-bottom: 15px;
  font-weight: bold;
}

.category-list {
  display: flex;
  gap: 15px;
  overflow-x: auto;
  padding: 5px;
  scroll-snap-type: x mandatory;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  scroll-snap-align: start;
}

.category-item img {
  width: 50px;
  height: 50px;
  border-radius: 25px;
  object-fit: cover;
  margin-bottom: 8px;
}

.category-item span {
  font-size: 12px;
  text-align: center;
  color: #333;
}

.category-item.active span {
  color: #0066FF;
}

.category-item.active img,
.category-item.active .category-icon {
  border: 2px solid #0066FF;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  /* Khoảng cách đều giữa các card */
  padding: 15px;
  overflow-y: auto;
  flex: 1;
  margin-bottom: 60px;
  width: 100%;
  justify-items: center;
  /* Căn giữa theo chiều ngang */
  align-content: start;
  /* Đảm bảo các hàng giãn đều từ trên xuống */
  align-items: stretch;
  /* Các item cao bằng nhau trong hàng */
}

.product-card {
  border: 1px solid #eee;
  border-radius: 8px;
  text-align: center;
  background: white;
  width: 165px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 190px;
  box-sizing: border-box;
  /* Giúp chiều cao tính cả border + padding */
}

.product-card img {
  width: 80%;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  margin: 0 auto;
}

.product-card h3 {
  font-size: 13px;
  color: #333;
  margin: 4px 0 0 0;
  /* Thêm margin-top nhỏ cho cân đối */
}

.product-card .price {
  font-size: 13px;
  color: #FF6B00;
  font-weight: bold;
  margin-bottom: 5px;
}


/* Hide scrollbar but keep functionality */
::-webkit-scrollbar {
  display: none;
}

* {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>