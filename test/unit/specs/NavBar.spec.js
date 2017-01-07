import Vue from 'vue';
import NavBar from 'src/components/NavBar';

describe('NavBar.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(NavBar),
    });
    expect(vm.$el.querySelector('.nav-center').textContent)
      .to.equal('Welcome to Your Vue.js App');
  });
});
