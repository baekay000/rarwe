import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import EmberObject from '@ember/object';

module('Integration | Component | star-rating', function (hooks) {
  setupRenderingTest(hooks);

  test('Renders the full and empty stars correctly', async function (assert) {
    this.set('rating', 4);
    this.set('maxRating', 5);

    await render(hbs`<StarRating @rating={{this.rating}}
      @maxRating={{this.maxRating}} />`);

    assert
      .dom('.fa-star')
      .exists({ count: 4 }, 'The right amount of full starts is rendered');

    assert
      .dom('.fa-star-o')
      .exists({ count: 1 }, 'The right amount of empty stars is rendered');

    this.set('maxRating', 10);

    assert
      .dom('.fa-star')
      .exists(
        { count: 4 },
        'The right amount of full stars is rendered after changing maxRating'
      );
    assert
      .dom('.fa-star-o')
      .exists(
        { count: 6 },
        'The right amount of empty stars is rendered after changing maxRating'
      );

    this.set('rating', 2);
    assert
      .dom('.fa-star')
      .exists(
        { count: 2 },
        'The right amount of full starts is rendered after changing rating'
      );

    assert
      .dom('.fa-star-o')
      .exists(
        { count: 8 },
        'The right amount of empty starts is rendered after changing rating'
      );
  });

  test('The setRating action', async function (assert) {
    this.set('song', EmberObject.create({ rating: 3 }));
    this.set('updateRating', function (song, rating) {
      song.set('rating', rating);
    });

    await render(
      hbs`<StarRating @rating={{song.rating}} @onClick={{fn this.updateRating song}} />`
    );

    await click('[data-test-rr=star-rating-5]');
    assert.equal(
      this.get('song.rating'),
      5,
      "The clicked star's rating is correctly sent"
    );
  });

  // test('it renders', async function (assert) {
  //   // Set any properties with this.set('myProperty', 'value');
  //   // Handle any actions with this.set('myAction', function(val) { ... });

  //   await render(hbs`<StarRating />`);

  //   assert.equal(this.element.textContent.trim(), '');

  //   // Template block usage:
  //   await render(hbs`
  //     <StarRating>
  //       template block text
  //     </StarRating>
  //   `);

  //   assert.equal(this.element.textContent.trim(), 'template block text');
  // });
});
