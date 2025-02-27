export default function () {
  this.get('/bands');
  this.get('/bands/:id');
  this.post('/bands');

  this.get('/bands/:id/songs', function (schema, request) {
    let id = request.params.id;
    return schema.songs.where({ bandId: id });
  });

  this.post('/songs');
}
