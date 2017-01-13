<template>
  <div class="">
    <div v-for="item in items" class="items-table">
      <div v-on:click="_onClickToggleDetail($event.target, item.uid, item.showDetail)" v-bind:id="item.uid" class="grid -between single-item">
        <div>{{ item.uid }}</div>
        <div>{{ item.name }}</div>
        <div><a v-bind:title="item.url" v-bind:href="item.url" target="_blank">{{ computeUrlText(item.url) }} <i class="fa fa-external-link"></i></a></div>
        <div>{{ item.created }}</div>
        <div class="delete-icon">
          <a
            v-bind:data-id="item.uid"
            v-on:click="_onClickDelete"><i class="fa fa-trash"></i></a>
        </div>
        <div v-on:click="_onClickConfirmDelete" class="confirm-button hide"><a>Confirm?</a></div>
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
export default {
  name: 'grid',
  props: ['items'],
  data() {
    return {
      currentSelectedUid: '',
    };
  },
  methods: {
    computeUrlText(url) {
      return url.replace('https://', '').replace('.now.sh', '');
    },

    showConfirmButton(id) {
      document.querySelector(`#${id} .delete-icon`).classList.add('hide');
      document.querySelector(`#${id} .confirm-button`).classList.remove('hide');
    },

    hideEveryConfirmButton() {
      if (this.currentSelectedUid === '') {
        return false;
      }

      document.querySelector(`#${this.currentSelectedUid} .confirm-button`).classList.add('hide');
      document.querySelector(`#${this.currentSelectedUid} .delete-icon`).classList.remove('hide');
      return true;
    },

    _onClickDelete(evt) {
      this.hideEveryConfirmButton();

      const id = evt.currentTarget.dataset.id;
      this.currentSelectedUid = id;
      this.showConfirmButton(id);
    },
    _onClickConfirmDelete() {
      const currentId = this.currentSelectedUid;
      this.$emit('confirm-delete', currentId);
      this.currentSelectedUid = '';
      this.hideEveryConfirmButton();
    },
    _onClickToggleDetail(target, id, showDetail) {
      if (target.tagName === 'A' || target.tagName === 'I') {
        return false;
      }

      this.$emit('toggle-detail', id, showDetail);
      return true;
    },
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
