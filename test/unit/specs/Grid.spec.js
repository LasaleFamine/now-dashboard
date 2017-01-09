import Vue from 'vue';
import Grid from 'src/components/Grid';

describe('Grid.vue', () => {
  it('should render correct contents', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: (h) => h(Grid),
    });
    vm.$el.items = [
      {
        uid: '1234',
        name: 'test',
        url: 'http://test',
        created: '10/00/0000'
      }
    ]
    expect(vm.$el.querySelector('.grid > div').textContent)
      .to.equal('1234');
  });
});
