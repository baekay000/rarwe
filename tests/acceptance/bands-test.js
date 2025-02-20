import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { visit } from '@ember/test-helpers';
import { createBand, createSong } from 'rarwe/tests/helpers/custom-helpers';

module('Acceptance | Bands', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('List bands', async function (assert) {
    this.server.create('band', { name: 'Radiohead' });
    this.server.create('band', { name: 'Long Distance Calling' });

    await visit('/');

    // Using quint-dom
    assert
      .dom('[data-test-rr=band-link]')
      .exists({ count: 2 }, 'All band links are rendered.');

    assert
      .dom('[data-test-rr=band-list-item]:first-child')
      .hasText('Radiohead', 'The first band link contains the band name');

    assert
      .dom('[data-test-rr=band-list-item]:last-child')
      .hasText(
        'Long Distance Calling',
        'The other band link contains the band name'
      );
  });

  test('Create a band', async function (assert) {
    this.server.create('band', { name: 'Royal Blood' });
    // debugger;
    await visit('/');
    await createBand('Caspian');

    assert
      .dom('[data-test-rr=band-list-item]')
      .exists({ count: 2 }, 'A new band link is rendered');

    assert
      .dom('[data-test-rr=band-list-item]:last-child')
      .hasText('Caspian', 'The new band link is rendered as the last item');

    assert
      .dom('[data-test-rr=songs-nav-item] > .active')
      .exists('The Songs tab is active');

  });

  test('Create a song', async function (assert) {
    await visit('/');
    await createBand('NewBand');
    await createSong('Crazy in Love');

    assert
      .dom('[data-test-rr=song-list-item]')
      .exists({ count: 1 }, 'A new song link is rendered');

    assert
      .dom('[data-test-rr=song-list-item]:first-child')
      .hasText('Crazy in Love', 'The new song is rendered');

  });
});
