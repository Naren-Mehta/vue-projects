<template>
    <li>
        <h2> {{ friend.name }} {{ this.friend.isFavorite ? '(Favorite)' : '' }}</h2>
        <button @click="toggleFavorite"> Toggle Favorite </button>
        <button @click="toggleDetails"> {{ detailsAreVisible ? 'Hide' : 'Show' }} </button>
        <ul v-if="detailsAreVisible">
            <li> <strong>Phone:</strong> {{ friend.phone }}</li>
            <li><strong>Email:</strong> {{ friend.email }}</li>
        </ul>
    </li>
</template>

<script>

export default {
    name: 'FriendContact',
    emits: ['toggle-favorite'],
    // emits: {
    //     'toggle-favorite': function (id) {
    //         if (id) {
    //             return true;
    //         }
    //         else {
    //             console.warn("ID is not passed in toggle-favorite")
    //             return false;
    //         }
    //     }
    // },
    props: {
        friend: {
            type: Object,
            required: true,
            default: () => { },
        }
    },
    data() {
        return {
            detailsAreVisible: false,
        }
    },
    methods: {
        toggleDetails() {
            this.detailsAreVisible = !this.detailsAreVisible;
        },
        toggleFavorite() {
            this.$emit('toggle-favorite', this.friend.id);
        }
    }
}

</script>