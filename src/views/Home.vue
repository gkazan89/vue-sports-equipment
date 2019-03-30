<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <h2>Items Available</h2>
    <div v-for="item in items" class="item">
      <p>{{ item.name }}</p>
      <p>{{ item.sport }}</p>
      <p>{{ item.price }}</p>
      <p>{{ item.supplier_name }}</p>
      <p>{{ item.images[0] }}</p>
      <img v-bind:src="item.images[0]" />
    </div>
  </div>
</template>

<style>
img {
  max-height: 200px;
  max-width: 200px;
}

.item {
  border: solid gray;
  margin-bottom: 1.5rem;
}
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      message: "Welcome to Sports Equipment App",
      items: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/items").then(
      function(response) {
        console.log(response);
        this.items = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};
</script>
