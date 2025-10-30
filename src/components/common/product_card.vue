<template>
  <div class="product-card" @click="$emit('select', product)">
    <img :src="product.image" :alt="product.name" />
    <h3>{{ product.name }}</h3>
    <div class="price">{{ product.price }}</div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
    }
  }
}
</script>

<style scoped>
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
  cursor: pointer;
}
.product-card img {
  width: 80%;
  height: 150px;
  border-radius: 8px;
  object-fit: cover;
  margin: 0 auto;
  display: block;
}
.product-card h3 {
  font-size: 13px;
  color: #333;
  margin: 4px 0 0 0;
}
.product-card .price {
  font-size: 13px;
  color: #FF6B00;
  font-weight: bold;
  margin-bottom: 5px;
}
</style>