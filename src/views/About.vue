<template>
  <div class="home container">
    <h1>My orders</h1>
    <div class="row">
      <div v-for="order in orders" class="col-md-4">
        <div class="card">
          <div class="card-body">
            <div class="card-text">
              <p>Order Id: {{ order.id }}</p>
              <p>Subtotal: {{ order.subtotal | currency }}</p>
              <p>Tax: {{ order.tax | currency }}</p>
              <p>Total: {{ order.total | currency }}</p>
            </div>
            <div>
              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                v-on:click="
                  orderInfo(order);
                  currentOrder = order;
                "
              >
                More Information
              </button>
            </div>
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Order Summary
                    </h5>
                    <button
                      type="button"
                      class="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body" v-for="item in items">
                    <p>Item: {{ item.item }}</p>
                    <p>Price: {{ item.price | currency }}</p>
                    <p>Quantity: {{ item.quantity }}</p>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
      total: "",
      items: [],
      isEmpty: false
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
  methods: {
    orderInfo: function(order) {
      var params = { id: order.id };
      axios.post("http://localhost:3000/api/carted_items/details", params).then(
        function(response) {
          this.items = response.data;
        }.bind(this)
      );
    }
  },
  computed: {}
};
</script>
