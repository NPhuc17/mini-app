<template>
  <div class="cap-nhat-chi-nhanh">
    <!-- Header -->
    <div class="header">
      <button class="back-btn" @click="goBack">←</button>
      <h2>Cập nhật chi nhánh</h2>
    </div>

    <!-- Chi nhánh hiện tại -->
    <div class="current-branch" v-if="currentBranch">
      <h4>Chi nhánh hiện tại</h4>
      <div class="branch-item active">
        <div class="icon">📍</div>
        <div class="info">
          <h4>{{ currentBranch.name }}</h4>
          <p>{{ currentBranch.address }}</p>
        </div>
      </div>
    </div>

    <!-- Danh sách chi nhánh khác -->
    <div class="branch-list">
      <h4>Chọn chi nhánh khác</h4>
      <div
        class="branch-item"
        v-for="branch in branches"
        :key="branch.id"
        :class="{ active: selectedBranch && selectedBranch.id === branch.id }"
        @click="chonChiNhanh(branch)"
      >
        <div class="icon">📍</div>
        <div class="info">
          <h4>{{ branch.name }}</h4>
          <p>{{ branch.address }}</p>
        </div>
        <div class="arrow">➡️</div>
      </div>
    </div>

    <!-- Nút xác nhận -->
    <div class="confirm-box" v-if="selectedBranch && selectedBranch.id !== currentBranch.id">
      <p>Xác nhận đổi sang: <strong>{{ selectedBranch.name }}</strong>?</p>
      <div class="buttons">
        <button class="cancel" @click="cancelChange">Hủy</button>
        <button class="confirm" @click="xacNhanCapNhat">Xác nhận</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CapNhatChiNhanh',
  data() {
    return {
      currentBranch: null,
      selectedBranch: null,
      branches: [
        { id: 1, name: 'Chi nhánh: Quận 2', address: '254 Nguyễn Duy Trinh, Bình Trưng, Quận 2' },
        { id: 2, name: 'Chi nhánh: Quận 3', address: '19 Hoàng Hoa Thám, An Phú, Quận 3' }
      ]
    }
  },
  mounted() {
    const savedBranch = localStorage.getItem('chiNhanhHienTai')
    if (savedBranch) {
      this.currentBranch = JSON.parse(savedBranch)
    } else {
      // nếu chưa chọn chi nhánh nào, mặc định là Quận 2
      this.currentBranch = this.branches[0]
      localStorage.setItem('chiNhanhHienTai', JSON.stringify(this.currentBranch))
    }
  },
  methods: {
    chonChiNhanh(branch) {
      this.selectedBranch = branch
    },
    xacNhanCapNhat() {
      if (!this.selectedBranch) return
      this.currentBranch = this.selectedBranch
      localStorage.setItem('chiNhanhHienTai', JSON.stringify(this.currentBranch))
      alert(`Đã cập nhật sang ${this.selectedBranch.name}`)
      this.selectedBranch = null
    },
    cancelChange() {
      this.selectedBranch = null
    },
    goBack() {
      this.$router.push({ name: 'TrangChu' })
    }
  }
}
</script>

<style scoped>
.cap-nhat-chi-nhanh {
  padding: 20px;
  background: #fafafa;
  min-height: 100vh;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}
.back-btn {
  border: none;
  background: none;
  font-size: 22px;
  margin-right: 10px;
  cursor: pointer;
}
.current-branch h4 {
  margin-bottom: 8px;
  color: #007bff;
}
.branch-item {
  display: flex;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 12px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.branch-item.active {
  border-color: #007bff;
  background: #e9f3ff;
}
.icon {
  font-size: 20px;
  margin-right: 10px;
}
.info {
  flex: 1;
}
.info h4 {
  margin: 0;
  font-size: 15px;
}
.info p {
  font-size: 13px;
  color: #555;
  margin: 2px 0 0 0;
}
.arrow {
  color: #888;
}
.confirm-box {
  background: #fff;
  border: 1px solid #eee;
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;
  text-align: center;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 10px;
}
button {
  padding: 10px 18px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.cancel {
  background: #ccc;
}
.confirm {
  background: #007bff;
  color: white;
}
</style>
