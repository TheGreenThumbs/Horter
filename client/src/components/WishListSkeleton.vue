<!-- Renders Wish List Plant Skeleton -->

<template>
  <section>
    <!-- Article represents one plant skeleton, but it will repeat a number of times (value declared in media) -->
    <!-- Plant skeleton begins -->
    <article class="media" v-for="i in media" :key="i">
      <figure class="media-left">
        <p class="image is-64x64">
          <b-skeleton
            circle
            width="64px"
            height="64px"
            :animated="animated"
          ></b-skeleton>
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <b-skeleton active :animated="animated"></b-skeleton>
            <b-skeleton height="80px" :animated="animated"></b-skeleton>
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <a class="level-item">
              <span class="icon is-large">
                <b-skeleton :animated="animated"></b-skeleton>
              </span>
            </a>
            <a class="level-item">
              <span class="icon is-large">
                <b-skeleton :animated="animated"></b-skeleton>
              </span>
            </a>
          </div>
        </nav>
      </div>
    </article>
    <!-- Plant skeleton ends -->
  </section>
</template>

<script>
export default {
  name: "wishListSkeleton",
  data() {
    return {
      media: 3,
      animated: false,
    };
  },
};
</script>
