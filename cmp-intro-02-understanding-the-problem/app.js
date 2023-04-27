const app = Vue.createApp({
  data() {
    return {
      detailsArevisible: false,
      friends: [
        {
          id: "naren",
          name: "Naren Mehta",
          phone: "+91 7503399999",
          email: "test@test.com",
        },
        {
          id: "deepak",
          name: "deepak Mehta",
          phone: "+91 88888888",
          email: "yoyo@test.com",
        },
      ],
    };
  },
  methods: {
    toggleDetails() {
      this.detailsArevisible = !this.detailsArevisible;
    },
  },
});

app.component("friend-contact", {
  template: `
  <li :key=""friend.id>
          <h2>{{ friend.name }}</h2>
          <button @click="toggleDetails">
            {{detailsArevisible ? 'Hide': 'Show'}} Details
          </button>
  
          <ul v-if="detailsArevisible">
            <li><strong>Phone:</strong> {{ friend.phone }}</li>
            <li><strong>Email:</strong> {{ friend.email }}</li>
          </ul>
        </li>
  `,
  data() {
    return {
      detailsArevisible: false,
      friend: {
        id: "naren",
        name: "Naren Mehta",
        phone: "+91 7503399999",
        email: "test@test.com",
      },
    };
  },
  methods: {
    toggleDetails() {
      this.detailsArevisible = !this.detailsArevisible;
    },
  },
});

app.mount("#app");
