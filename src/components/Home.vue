<script>
import {fetchDesigns} from "../lib/apiService";

export default {
  data () {
    return {
      list: [],
      designs: [],
      gridItems: 2,
      scrollTo: 500,
      page:null,
      isLoading: false,
    }
  },
  methods: {
    async loadDesign () {
      this.isLoading = true;
      const data = await fetchDesigns(this.page);
      if (data && data.flag === 0) {
        const designs = data.data.content.flatMap(category => category.list);
        const page = data.data.next_page;
        this.page = page;
        console.log(page);
        console.log(designs)
        this.designs.push(...designs);
      }
      await new Promise(r => setTimeout(r, 2000));// debounce
      this.isLoading = false;
    },
    getThumbnailUrl (matchCover) {
      return `https://template.vivipic.com/template/${matchCover.id}/prev_2x?ver=${matchCover.ver}`;
    },
    onScrollEnd () {
      if(this.isLoading) return;
      this.loadDesign()
      console.log('scroll end')
    },
  },

  mounted () {
    this.loadDesign();
  },
}
</script>

<template>
  <div class="wrapper">

    <RecycleScroller
        ref="scroller"
        class="scroller"
        :items="designs"
        :item-size="128"
        :grid-items="2"
        @scrollend="onScrollEnd"
    >
      <template #default="{ item }">
        <div class="item">
          <img
              :key="item.id"
              :src="getThumbnailUrl(item)"
          >
        </div>
      </template>
    </RecycleScroller>
  </div>
</template>

<style scoped>
.wrapper,
.scroller {
  height: 100%;
}

.wrapper {
  display: flex;
  flex-direction: column;
}

.scroller {
  flex: 1;
}

.scroller :deep(.hover) img {
  opacity: 0.5;
}

.item {
  position: relative;
  height: 100%;
}

img {
  width: 100%;
  height: 100%;
  background: #eee;
  object-fit: cover;
}
</style>
