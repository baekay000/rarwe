import Route from '@ember/routing/route';
// import wait from '../../../utils/wait';

export default Route.extend({

  /* Use the following to simulate network latency

  async model() {
     await wait(3000);
     return this.modelFor('bands.band');
   },
  */

  model() {
    return this.modelFor('bands.band');
  },

  resetController(controller) {
    controller.setProperties({
      isAddingSong: false,
      newSongTitle: '',
    });
  },
});
