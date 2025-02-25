import Route from '@ember/routing/route';
// import wait from 'rarwe/utils/wait';

export default Route.extend({

  /* Simulate network latency

     async model() {
     await wait(3000);
     return this.store.findAll('band');
   },
  */

  model() {
    return this.store.findAll('band');
  },

});
