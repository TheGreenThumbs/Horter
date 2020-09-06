<template>
     <div class="ui segment">
      <div class="ui grid container" :user="user">
        <carousel-3d>
        <div class="ui segment" v-for="(garden, i) in user.gardens" :key="i">
            <slide :index="i">
            {{garden.name}}
            <img :src="garden.photo">
            </slide>
        </div>
        </carousel-3d>
      </div>
    </div>
</template>


<script>
import Vue from 'vue'
import carousel3d from 'vue-carousel-3d';
import user from '../fake-data/fake-data.js';
import { Carousel3d, Slide } from 'vue-carousel-3d';

Vue.use(Carousel3d);

export default {
  name: 'Carousel',

  components: {
    Carousel3d,
    Slide
  },
  
    data () {
      return {
        user: user,
      }
    },

    methods: {
        getImgUrl(value) {
            value += 50
        },
        switchGallery(value) {
            this.gallery = value
            if (value) {
                return document.documentElement.classList.add('is-clipped')
            } else {
                return document.documentElement.classList.remove('is-clipped')
            }
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.is-active .al img {
    border: 1px solid #fff;
    filter: grayscale(0%);
}
.al img {
    border: 1px solid transparent;
    filter: grayscale(100%);
}
</style>
           
            return `https://www.gardeningknowhow.com/wp-content/uploads/2007/03/flowers-1-400x300.jpg`