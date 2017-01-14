<template>
  <div class="">
    <div v-for="(item, index) in items" class="items-table">
      <div class="grid -between single-item"
        v-on:click="_onClickToggleDetail($event.target, index, item.showDetail)"
        v-bind:id="'deploy' + index" >
        <div class="show-id">
          <a v-on:click="_onClickToggleShowId(index, true)">Show ID</a>
        </div>
        <div class="item-id hide">
          <a v-on:click="_onClickToggleShowId(index, false)">{{ item.uid }}</a>
        </div>
        <div>{{ item.name }}</div>
        <div>
          <a v-bind:title="item.url" v-bind:href="item.url" target="_blank">
            {{ computeUrlText(item.url) }}
            <i class="fa fa-external-link"></i>
          </a>
        </div>
        <div>{{ item.created }}</div>
        <div class="delete-icon">
          <a
            v-on:click="_onClickDelete(index)">
            <i class="fa fa-trash"></i>
          </a>
        </div>
        <div v-on:click="_onClickConfirmDelete" class="confirm-button hide">
          <a>Confirm?</a>
        </div>
        <spinner :visible="item.showSpinner"></spinner>
      </div>
      <transition name="fade">
        <div v-if="item.showDetail" class="grid">
          <div v-for="file in item.files" class="cell -11of12">
            {{file.name}}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Spinner from './Spinner';

export default {
  name: 'grid',
  props: ['items'],
  data() {
    return {
      currentSelectedIndex: '',
    };
  },
  methods: {
    computeUrlText(url) {
      return url.replace('https://', '').replace('.now.sh', '');
    },

    showConfirmButton(index) {
      this.$el.querySelector(`#deploy${index} .delete-icon`).classList.add('hide');
      this.$el.querySelector(`#deploy${index} .confirm-button`).classList.remove('hide');
    },

    hideEveryConfirmButton() {
      if (this.currentSelectedIndex === '') {
        return false;
      }
      const index = this.currentSelectedIndex;
      this.$el.querySelector(`#deploy${index} .confirm-button`).classList.add('hide');
      this.$el.querySelector(`#deploy${index} .delete-icon`).classList.remove('hide');
      return true;
    },

    _onClickToggleShowId(index, show) {
      const toHide = show ? '.show-id' : '.item-id';
      const toShow = show ? '.item-id' : '.show-id';
      this.$el.querySelector(`#deploy${index} ${toHide}`).classList.add('hide');
      this.$el.querySelector(`#deploy${index} ${toShow}`).classList.remove('hide');
      return true;
    },

    _onClickDelete(index) {
      this.hideEveryConfirmButton();
      this.currentSelectedIndex = index;
      this.showConfirmButton(index);
    },
    _onClickConfirmDelete() {
      const currentIndex = this.currentSelectedIndex;
      this.$emit('confirm-delete', currentIndex);
      this.hideEveryConfirmButton();
      this.currentSelectedIndex = '';
    },
    _onClickToggleDetail(target, name, showDetail) {
      if (target.tagName === 'A' || target.tagName === 'I') {
        return false;
      }

      this.$emit('toggle-detail', name, showDetail);
      return true;
    },
  },
  components: {
    Spinner,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .items-table > div {
    padding: 10px;
  }

  .hide {
    display: none;
  }

  .single-item:hover {
    background: #333;
    cursor: pointer;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
    opacity: 0
  }
</style>
