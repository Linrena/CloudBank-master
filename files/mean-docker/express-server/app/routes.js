var Banking = require('./models/Banking');
Banking.create({
				username: 'root',
				passwd: 'root',
				balance: 888888
				//done: false
			});	
Banking.create({
			username: 'root1',
			passwd: 'root1',
			balance: 8888
			//done: false
			});	
			Banking.create({
				username: 'root2',
				passwd: 'root2',
				balance: 888888
				//done: false
			});	

function VerifyAccount(res,User,Pass) {
    Banking.findOne({username:User,passwd:Pass},function (err, Account) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
		else if (!Account)
		{
			res.status(400).send('User name or password error!');
		}
		else{
		res.status(200).cookie('user',User,{'signed':true})
			.send('success!'); }
    });
};

function VerifyUsername(res,User,Pass) {
    Banking.findOne({username:User},function (err, UserInfo) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
		else if (!UserInfo)
		{
			Banking.create({
				username: User,
				passwd: Pass
				//done: false
			}, function (err, Banking) {
				if (err)
					res.send(err);
				else
				// get and return all the Bankings after you create another
				res.status(200).send('OK');
			});
		}
		else{
			res.status(400).send('User exists!');
		;}
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
	
	app.post('/api/New', function (req, res) {
		console.log("new:%s %s",req.body.username,req.body.passwd);
		if(req.body.username!=undefined&&req.body.passwd!=undefined)
		{	
			VerifyUsername(res,req.body.username,req.body.passwd);
			// create a Banking, information comes from AJAX request from Angular
		}
		
    });
	
	app.post('/api/login', function (req, res) {
		VerifyAccount(res,req.body.username,req.body.passwd);
	}, function( err, result){
		if(err)
		res.send(err);
	});
	app.get('/api/Accounts', function (req, res) {
        if(!req.signedCookies.user)
			res.status(400).send('Please login first!');
		else{
			Banking.find({},'username balance',
			function(err, user)
			{
				if(err)
					res.send(err);
				else res.status(200).jsonp(user);
			});}
		});
	
	 app.get('/api/Account', function (req, res) {
        if(!req.signedCookies.user)
			res.status(400).send('Please login first!');
		else{
			Banking.findOne({username:req.signedCookies.user},'username balance',
			function(err, user)
			{
				if(err)
					res.send(err);
				else res.status(200).jsonp(user);
			});
		}
        
    }); 
	
	app.post('/api/Transaction',function(req, res)	{
		if(!req.signedCookies.user)
			res.status(400).send('Please login first!');
		else if(!req.body.Tamount || parseFloat(req.body.Tamount) <= 0)
		{res.status(400).send('Please check the amount!');}
		else if(!req.body.object)
		{res.status(400).send('Please check the transaction object!');}
		else{
			var amount = parseFloat(req.body.Tamount);
			var obj = req.body.object;
			var user = req.signedCookies.user;
			var objbalance = 0 ;
			try{
					Banking.findOne({username:obj},'balance',
				function(err, result){if(err){throw(err);}
				if(!result)
					res.status(400).send('Please check the transaction object!');
				else{
					objbalance = parseFloat(result.balance);
					Banking.findOne({username:user},'balance',
					function(err,uresult){
						if(err) throw(err);
						else if(uresult.balance < amount) res.status(400).send('You don\'t have so much money!');
						else{
						Banking.updateOne({username:user},{$set:{'balance':parseFloat(uresult.balance) - amount}},
						function(err,result){if(err)throw(err);});
						Banking.updateOne({username:obj},{$set:{'balance':objbalance + amount}},
						function(err,result){if(err)throw(err);
						else res.status(200).send('Success');});
						}
					});
					}
				});
				
			}catch(err){
				res.status(400).send(err);
			}
			
		}
	});
	
    app.post('/api/deposit',function(req,res){
		var user = req.signedCookies.user;
		var amount = req.body.amount;
		if(!user)
			res.status(400).send('Please login first!');
		else if(!req.body.amount || parseFloat(req.body.amount) <= 0)
		{res.status(400).send('Please check the amount!');}
		else{
			try{
					Banking.findOne({username:user},'balance',
				function(err,result){
					if(err) throw(err);
					else
					Banking.updateOne({username:user},{$set:{'balance':parseFloat(result.balance) + parseFloat(amount)}},
					function(err,result){if(err)throw(err);
					else res.status(200).send('Success!');});
				});
			}catch(err){
				res.status(400).send(err);
			}
			
		}
	});
	
	app.post('/api/withdraw',function(req,res){
		var user = req.signedCookies.user;
		var amount = req.body.amount;
		if(!user)
			res.status(400).send('Please login first!');
		else if(!req.body.amount || parseFloat(req.body.amount) <= 0)
		{res.status(400).send('Please check the amount!');}
		else{
			Banking.findOne({username:user},'balance',
			function(err,result){
				if(err) res.send(err);
				else if(result.balance < amount) 
					res.status(400).send('You don\'t have so much money!');
				else{
				Banking.updateOne({username:user},{$set:{'balance':parseFloat(result.balance) - parseFloat(amount)}},
				function(err,result){if(err)res.status(400).send(err);
				else res.status(200).send('Success!');});
				}
			});
		}
	});

    // delete a Banking
    // app.delete('/api/Bankings/:Banking_id', function (req, res) {
        // Banking.remove({
            // _id: req.params.Banking_id
        // }, function (err, Banking) {
            // if (err)
                // res.send(err);

            // getBankings(res);
        // });
    // });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
