<template>
  <div class="xac-nhan">
    <h2>Xác nhận đổi sang</h2>
    <div class="confirm-box">
      <p><strong>{{ branch.name }}</strong></p>
      <p>{{ branch.address }}</p>
    </div>
    <div class="buttons">
      <button class="cancel" @click="quayLai">Hủy</button>
      <button class="confirm" @click="xacNhan">Xác nhận</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XacNhanChiNhanh',
  data() {
    return {
      branch: {}
    }
  },
  mounted() {
    const id = Number(this.$route.params.branchId)
    const data = [
      { id: 1, name: 'Chi nhánh: Quận 2', address: '254 Nguyễn Duy Trinh, Bình Trưng, Quận 2' },
      { id: 2, name: 'Chi nhánh: Quận 3', address: '19 Hoàng Hoa Thám, An Phú, Quận 3' }
    ]
    this.branch = data.find(b => b.id === id)
  },
  methods: {
    quayLai() {
      this.$router.back()
    },
    xacNhan() {
      localStorage.setItem('chiNhanhHienTai', JSON.stringify(this.branch))
      this.$router.push({ name: 'TrangChu' })
    }
  }
}
</script>

<style scoped>
.xac-nhan {
  padding: 20px;
  text-align: center;
}
.confirm-box {
  background: #f5f5f5;
  border-radius: 12px;
  padding: 15px;
  margin: 20px 0;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
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
