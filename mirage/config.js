export default function () {
  this.get('/bands');
  this.get('/bands/:id');
  this.post('/bands');

  this.get('/bands/:id/songs');
  this.post('/songs');
}
