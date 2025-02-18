import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('band');
  },

  // redirect(bands) {
  //   if (bands.length === 1) {
  //   this.router.transitionTo('bands.band', bands.firstObject);
  //   }
  //   },
});
