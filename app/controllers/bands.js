import Controller from '@ember/controller';
import Band from 'rarwe/models/band';

export default Controller.extend({
  isAddingBand: false,
  newBandName: '',

  // eslint-disable-next-line no-undef
  addBand: action(function () {
    this.set('isAddingBand', true);
  }),

  // eslint-disable-next-line no-undef
  cancelAddBand: action(function () {
    this.set('isAddingBand', false);
  }),

  // eslint-disable-next-line no-undef
  saveBand: action(function () {
    let newBand = Band.create({ name: this.newBandName});
    this.model.pushObject(newBand);
  })
});
