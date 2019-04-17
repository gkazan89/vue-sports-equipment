<template>
  <div class="about container">
    <div class="alert alert-success" v-if="visible">
      Order Placed!
      <button
        type="button"
        class="close"
        data-dismiss="modal"
        aria-label="Close"
        v-on:click="toggleVisible()"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>

    <h1>Shopping Cart</h1>
    <div>
      <div v-for="item in carted_items">
        <!--         <div class="card">
          <div class="card-text">
            <p>Item ID: {{ carted_item.item_id }}</p>
            <p>Quantity: {{ carted_item.quantity }}</p>
          </div>
        </div> -->

        <p>Item: {{ item.item }}</p>
        <p>Quantity: {{ item.quantity }}</p>
        <p>Status: {{ item.status }}</p>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target="#exampleModal"
        v-on:click="ordersCreate()"
      >
        Checkout
      </button>
    </div>
  </div>
</template>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      carted_items: [],
      item: "",
      quantity: "",
      status: "",
      componentKey: 0,
      visible: false
    };
  },
  created: function() {
    axios.get("/api/carted_items").then(
      function(response) {
        console.log(response);
        this.carted_items = response.data;
      }.bind(this)
    );
    console.log(this);
  },
  methods: {
    ordersCreate: function() {
      axios.post("/api/orders/").then(
        function(response) {
          console.log("RESPONSE: ", response);
        }.bind(this)
      );
      this.carted_items = [];
      this.visible = true;
    },
    toggleVisible: function() {
      this.visible = !this.visible;
    }
  },
  computed: {}
};
</script>
