<template>
  <div class="items-show">
    <div class="container">
      <p>{{ item.name }}</p>
      <p>{{ item.sport }}</p>
      <p>{{ item.price }}</p>
      <p>{{ item.supplier_name }}</p>
      <img v-bind:src="item.images[0]" />
      <a href="/#/">Back to all items</a>
    </div>
  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      item: {},
      errors: []
    };
  },

  created: function() {
    axios
      .get("http://localhost:3000/api/items/" + this.$route.params.id)
      .then(response => {
        console.log(response);
        this.item = response.data;
      });
  }
};
</script>
