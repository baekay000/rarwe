import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { setupMirage } from 'ember-cli-mirage/test-support';
import { visit, click, fillIn, currentURL } from '@ember/test-helpers';
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
      .hasText('Crazy In Love', 'The new song is rendered');
  });

  test('Sort songs in various ways', async function (assert) {
    let band = this.server.create('band', { name: 'Them Crooked Vultures' });
    this.server.logging = true;
    this.server.create('song', { title: 'Elephants', rating: 5, band });
    this.server.create('song', { title: 'New Fang', rating: 4, band });
    this.server.create('song', {
      title: 'Mind Eraser, No Chaser',
      rating: 4,
      band,
    });
    this.server.create('song', {
      title: 'Spinning in Daffodils',
      rating: 5,
      band,
    });

    await visit('/');
    await click('[data-test-rr=band-link]');

    assert
      .dom('[data-test-rr=song-list-item]:first-child')
      .hasText(
        'Elephants',
        'The first song is the highest ranked, first one in the alphabet'
      );

    assert
      .dom('[data-test-rr=song-list-item]:last-child')
      .hasText(
        'New Fang',
        'The last song is the lowest ranked, last one in the alphabet'
      );

    await click('[data-test-rr=sort-by-title-desc]');
    assert.equal(currentURL(), '/bands/1/songs?s=titleDesc');

    assert
      .dom('[data-test-rr=song-list-item]:first-child')
      .hasText(
        'Spinning In Daffodils',
        'The first song is the one that comes last in the alphabet'
      );

    assert
      .dom('[data-test-rr=song-list-item]:last-child')
      .hasText(
        'Elephants',
        'The last song is the one that comes first in the alphabet'
      );

    await click('[data-test-rr=sort-by-rating-asc]');

    assert
      .dom('[data-test-rr=song-list-item]:first-child')
      .hasText(
        'Mind Eraser, No Chaser',
        'The first song is the lowest ranked, first one in the alphabet'
      );

    assert
      .dom('[data-test-rr=song-list-item]:last-child')
      .hasText(
        'Spinning In Daffodils',
        'The last song is the highest ranked, last one in the alphabet'
      );

    assert.equal(currentURL(), '/bands/1/songs?s=ratingAsc');

    await click('[data-test-rr=sort-by-title-asc]');
    assert
      .dom('[data-test-rr=song-list-item]:first-child')
      .hasText(
        'Elephants',
        'The first song is the one that comes first in the alphabet'
      );

    assert
      .dom('[data-test-rr=song-list-item]:last-child')
      .hasText(
        'Spinning In Daffodils',
        'The last song is the one that comes last in the alphabet'
      );

    assert.equal(currentURL(), '/bands/1/songs?s=titleAsc');
  });

  test('Search songs', async function (assert) {
    let band = this.server.create('band', { name: 'Them Crooked Vultures' });
    this.server.create('song', { title: 'Elephants', rating: 5, band });
    this.server.create('song', { title: 'New Fang', rating: 4, band });
    this.server.create('song', {
      title: 'Mind Eraser, No Chaser',
      rating: 4,
      band,
    });
    this.server.create('song', {
      title: 'Spinning in Daffodils',
      rating: 5,
      band,
    });
    this.server.create('song', {
      title: 'No One Loves Me & Neither Do I',
      rating: 5,
      band,
    });

    await visit('/');
    await click('[data-test-rr=band-link]');
    await fillIn('[data-test-rr=search-box]', 'no');
    assert.equal(currentURL(), '/bands/1/songs?q=no');

    assert
      .dom('[data-test-rr=song-list-item]')
      .exists({ count: 2 }, 'The songs matching the search term are displayed');

    await click('[data-test-rr=sort-by-title-desc]');
    assert
      .dom('[data-test-rr=song-list-item]:first-child')
      .hasText(
        'No One Loves Me & Neither Do I',
        'A matching song that comes later in the alphabet appears on top'
      );

    assert
      .dom('[data-test-rr=song-list-item]:last-child')
      .hasText(
        'Mind Eraser, No Chaser',
        'A matching song that comes sooner in the alphabet appears at the bottom'
      );

    assert.ok(currentURL().includes('q=no'));
    assert.ok(currentURL().includes('s=titleDesc'));
  });
});
