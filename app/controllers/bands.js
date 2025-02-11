import Controller from '@ember/controller';
import Band from 'rarwe/models/band';
import {action} from '@ember/object';
import { empty } from '@ember/object/computed';

export default Controller.extend({
  isAddingBand: false,
  newBandName: '',

  isAddButtonDisabled: empty('newBandName'),

  addBand: action(function () {
    this.set('isAddingBand', true);
  }),

  cancelAddBand: action(function () {
    this.set('isAddingBand', false);
  }),

  saveBand: action(function (event) {
    event.preventDefault();
    let newBand = Band.create({ name: this.newBandName});
    this.model.pushObject(newBand);
    this.set('newBandName', '');
  })
});
