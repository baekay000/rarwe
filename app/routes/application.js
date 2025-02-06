import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import { A } from '@ember/array';

let Song = EmberObject.extend({
  title: '',
  band: '',
  rating: 0
});

export default Route.extend({
  model() {
    let blackDog = Song.create({
      title: 'Black Dog',
      band: 'Led Zeppelin',
      rating: 3
    });

    let yellowLedbetter = Song.create({
      title: 'Yellow Ledbetter',
      band: 'Pearl Jam',
      rating: 4
    });

    let pretender = Song.create({
      title: 'The Pretender',
      band: 'Foo Fighters',
      rating: 2
    });

    // Creates an instance of an enhanced array that makes the passed array observable
    return A([blackDog, yellowLedbetter, pretender])
  }
});
