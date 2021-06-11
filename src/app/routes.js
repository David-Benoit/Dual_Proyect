//
const {Router} = require('express');

// const router = Router();

const Location = require('./models/Location');
//

module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index');
	});

	//login view
	app.get('/login', (req, res) => {
		res.render('login.ejs', {
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/profile',
		failureRedirect: '/login',
		failureFlash: true
	}));

	// signup view
	app.get('/signup', (req, res) => {
		res.render('signup', {
			message: req.flash('signupMessage')
		});
	});

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/profile',
		failureRedirect: '/signup',
		failureFlash: true // allow flash messages
	}));

	//profile view
	app.get('/profile', isLoggedIn, (req, res) => {
		res.render('profile', {
			user: req.user
		});
	});

	// logout
	app.get('/logout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	//see alll documents
app.get('/api/locs', async (req, res) => {
    const Locations = await Location.find();
    res.json({Locations});
});

//crete a new document onto the collection
app.get('/api/locs/create/:id/:lat/:lon',async (req, res) => {
    await Location.create({
        id: req.params.id,
        Latitude: req.params.lat,
        Longitude: req.params.lon
    });
     res.json({message:'location created'});
});

//find and update one documento into the collection
app.get('/api/locs/update/:id/:lat/:lon', async (req, res)=>{
    await Location.updateOne({id: req.params.id},{
        $set:{
            Latitude: req.params.lat,
            Longitude: req.params.lon
        }
    },
    function(error, info){
        if(error){
            res.json({
                resultado: false,
                msg: 'no se pudo actualizar',
                err
            });
        } else{
            res.json({
                resultado:true,
                info: info
            });
        }
    }
    );
});

};

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}
