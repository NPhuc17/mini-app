<template>
  <div class="trang-tim-kiem">
    <!-- Add back button -->
    <div class="header">
      <button class="back-button" @click="goBack">
        <span>←</span>
      </button>
      <h1>Tìm kiếm</h1>
    </div>

    <!-- Search Bar - Moved outside header -->
    <div class="search-container">
      <div class="search-bar">
        <span class="search-icon">🍽️</span>
        <input type="text" v-model="searchQuery" placeholder="Tìm kiếm món ăn, thức uống..." />
        <button class="search-button" @click="handleSearch">🔍</button>
      </div>
    </div>

    <!-- Add this results counter -->
    <div class="search-results-count">
      Kết quả: {{ searchResults.length || 0 }}
    </div>

    <!-- Product Grid -->
    <div class="product-grid">
      <div class="product-card" v-for="n in 4" :key="n">
        <img src="/images/nuoc_chanh.png" />
        <h3>Nước chanh</h3>
        <div class="price">10.000 đ</div>
      </div>
    </div>
    <BottomNav />
  </div>
</template>

<script>
import BottomNav from '../components/layout/bottom_nav.vue'

export default {
  name: 'TrangTimKiem',
  components: {
    BottomNav
  },
  data() {
    return {
      searchQuery: this.$route.query.q || '',
      searchResults: [] // Add this line
    }
  },
created() {
  const saved = localStorage.getItem('products')
  this.products = saved ? JSON.parse(saved) : []
  this.handleSearch()
},
  methods: {
    handleSearch() {
      // Xử lý tìm kiếm ở đây
      console.log('Tìm kiếm:', this.searchQuery);
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.trang-tim-kiem {

  overflow-y: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.header {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  position: relative;
}

.back-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 5px 10px;
  color: #333;
  position: absolute;
  left: 15px;
}

h1 {
  flex: 1;
  text-align: center;
  font-size: 18px;
  margin: 0;
  color: #333;
}

.search-container {
  border-radius: 25px;
  padding: 0px 15px;
  display: flex;
  align-items: center;
  margin-top: -5;
  margin-bottom: 10px;
  width: 100%;
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

.search-results-count {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
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
</style>