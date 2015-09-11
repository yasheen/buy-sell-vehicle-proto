module.exports = {
  bind : function (app) {

  	app.use(function (req, res, next) {

     var viewData = {};

     // Store common vars

     viewData.formData = "";
     viewData.formQuery = "?";

     for (var name in req.query){
       var value = req.query[name];
       viewData.formData += '<input type="hidden" name="'+name+'" value="' + value + '">\n';
       viewData.formQuery += name + "=" + value + "&";
     }

     viewData.formQuery = viewData.formQuery.slice(0,-1);

     res.locals(viewData);
     next();
     
   });

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

    app.get('/private-or-trade', function (req, res) {
      if (req.query["buyer-or-seller"] == 'seller') {
			res.redirect('verify' + res.locals.formQuery);
		} else {
			res.render('private-or-trade/');
		}
    });

    app.get('/share-code', function (req, res) {
    	if (req.query["buyer-or-seller"] == 'seller') {
    		var secondParty="buyer";
    		var secondPartyCapital="Buyer";
    	}	else {
    		var secondParty="seller";
    		var secondPartyCapital="Seller";
    	}
      res.render('share-code', { 'second-party' : secondParty, 'second-party-capital' : secondPartyCapital });

    });



    // add your routes here

  }
};
