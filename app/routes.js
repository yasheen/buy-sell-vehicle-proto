module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('index');
    });

    app.get('/code-routes', function (req, res) {
      if (req.query.radiogroup == 'no') {
			res.render('code-no-find-vehicle/');
		} else {
			res.render('code-yes-find-vehicle/');
		}
    });

    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });

    // add your routes here

  }
};
