<template>
  <div class="home container">
    <h1>{{ message }}</h1>

    <h2>New Item</h2>
    <div>
      name: <input type="text" v-model="name" /> sport:
      <input type="text" v-model="sport" /> price:
      <input type="text" v-model="price" /> supplier_id:
      <input type="text" v-model="supplier_id" />
      <button v-on:click="createItem()">Create Item</button>
    </div>

    <h2>Items Available</h2>
    <div class="row">
      <div v-for="item in items" class="col-md-4">
        <div class="card">
          <img
            class="card-img-top"
            v-bind:src="item.images[0]"
            alt="Card image cap"
          />
          <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <p class="card-text">
              <p>Sport: {{ item.sport }}</p> 
              <p>Price: {{ item.price | currency }}</p>
              <p>Brand: {{ item.supplier_name }}</p>
            </p>
            <div>
              <!--         <a v-bind:href="'/#/items/' + item.id">More info</a> -->

              <button
                type="button"
                class="btn btn-primary"
                data-toggle="modal"
                data-target="#exampleModal"
                v-on:click="currentItem = item"
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
                      Add {{ currentItem.name }} to Cart
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
                  <div class="modal-body">
                    {{ currentItem.sport }}
                  </div>
                  <img v-bind:src="item.images[0]" />
                  <div class="modal-body">
                    Price: {{ currentItem.price | currency }}
                  </div>
                  <div class="modal-body">
                    {{ currentItem.supplier_name }}
                  </div>
                  <div class="modal-body">
                    Quantity: <input type="text" v-model="quantity" />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="button" class="btn btn-primary"
                    data-dismiss="modal" v-on:click="addToCart(item)">
                      Add to Cart
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

<style>
img {
  max-height: 200px;
  max-width: 200px;
}

.item {
  margin-bottom: 1.5rem;
  border: solid gray 0.5px;
}
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      message: "Welcome to Sports Equipment App",
      items: [],
      name: "",
      sport: "",
      price: "",
      supplier_id: "",
      updatedName: "",
      currentItem: {},
      quantity: ""
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
  methods: {
    createItem: function() {
      var params = {
        name: this.name,
        sport: this.sport,
        price: this.price,
        supplier_id: this.supplier_id
      };
      axios.post("http://localhost:3000/api/items/", params).then(
        function(response) {
          console.log("RESPONSE: ", response);
          this.items.push(response.data);
        }.bind(this)
      );
    },
    updateItem: function(inputItem) {
      console.log(this.updatedName, inputItem.id);
      var params = {
        name: this.updatedName
      };
      axios
        .patch("http://localhost:3000/api/items/" + inputItem.id, params)
        .then(function(response) {
          console.log(response.data);
          inputItem.name = response.data.name;
        });
    },
    deleteItem: function(inputItem) {
      axios.delete("http://localhost:3000/api/items/" + inputItem.id).then(
        function(response) {
          console.log(response.data);
          var index = this.items.indexOf(inputItem);
          this.items.splice(index, 1);
        }.bind(this)
      );
    },
    addToCart: function(item) {
      console.log(item);
      var params = {
        item_id: item.id,
        quantity: this.quantity
      };
      axios.post("http://localhost:3000/api/carted_items/", params).then(
        function(response) {
          console.log("RESPONSE: ", response);
        }.bind(this)
      );
      this.quantity = "";
    }
  },
  computed: {}
};
</script>
