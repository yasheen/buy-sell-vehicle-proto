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

    app.get('/find-vehicle-by-reg', function (req, res) {
      if (req.query.hasCode == 'no') {
			res.render('find-vehicle-by-reg/');
		} else {
			res.render('find-vehicle-by-code/');
		}
    });

    app.get('/private-or-trade', function (req, res) {
      if (req.query["buyer-or-seller"] == 'seller') {
			res.redirect('verify' + res.locals.formQuery);
		} else {
			res.render('private-or-trade/');
		}
    });

    app.get('/verify', function (req, res) {
      if (req.query["motorTrader"] == 'yes') {
      res.redirect('trader-details/' + res.locals.formQuery);
    } else {
      res.render('verify/');
    }
    });

    app.get('/finish-proof-seller', function (req, res) {
      if (req.query["hasCode"] == 'no') {
      res.redirect('share-code/' + res.locals.formQuery);
    } else {
        if (req.query["buyer-or-seller"] == 'buyer') {
        res.redirect('finish-proof-buyer/' + res.locals.formQuery);
      } else {
        res.render('finish-proof-seller/');
      }
    }
    });

    app.get('/share-code', function (req, res) {
    	if (req.query["buyer-or-seller"] == 'seller') {
    		var secondParty="buyer";
    		var secondPartyCapital="Buyer's";
    	}	else {
    		var secondParty="seller";
    		var secondPartyCapital="Seller's";
    	}
      res.render('share-code', { 'second-party' : secondParty, 'second-party-capital' : secondPartyCapital });

    });

    app.get('/confirm-transfer', function (req, res) {
      if (req.query["buyer-or-seller"] == 'seller') {
        var firstPartyResponsible="will no longer be";
        var firstPartyResponsibleVerb="give away";
      } else {
        var firstPartyResponsible="will be";
        var firstPartyResponsibleVerb="take on";
      }
      res.render('confirm-transfer', { 'fist-party-responsible' : firstPartyResponsible, 'fist-party-responsible-verb' : firstPartyResponsibleVerb });

    });

    app.get('/step-2', function (req, res) {
      if (req.query.knowsni == 'No') {
        res.render('step-2', {
          'name' : req.query.prop,
          'alert' : ' no ni ' });
      } else {
        res.render('step-2', {
          'name' : req.query.prop });
      }
  });

  app.get('/step-1', function (req, res) {
      res.render('step-1', { 'name' : 'Foo' });
    });

    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });


    // add your routes here

  }
};
