import Vue from 'vue';
import App from 'src/App';

describe('App.vue', () => {
  it('should have correct initial data', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(App),
    });

    expect(typeof vm.data).toBe('function');
    const defaultData = vm.data();
    expect(defaultData.token).toBe('');
  });

  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(App),
    });
    expect(vm.$el.querySelector('input').getAttribute('placeholder'))
      .to.equal('Your token');
  });
});
