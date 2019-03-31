<template>
  <div class="about container">
    <h1>My orders</h1>
    <div>
      <div v-for="order in orders">
        <div class="card">
          <div class="card-text">
            <p>ORDER ID: {{ order.id }}</p>
            <p>Subtotal: {{ order.subtotal }}</p>
            <p>Tax: {{ order.tax }}</p>
            <p>Total: {{ order.total }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      orders: [],
      order_id: "",
      subtotal: "",
      tax: "",
      total: ""
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/orders").then(
      function(response) {
        console.log(response);
        this.orders = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};
</script>
