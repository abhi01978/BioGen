// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const Package = require('./models/packageModel'); // ya jahan bhi tumhara model hai

// const app = express();
// const PORT = 3000;

// // MongoDB connect
// mongoose.connect('mongodb://localhost:27017/healthLab', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('✅ MongoDB Connected'))
//   .catch(console.error);

// // Multer Storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads');
//   },
//   filename: (req, file, cb) => {
//     const ext = path.extname(file.originalname);
//     const filename = `${Date.now()}-${file.originalname}`;
//     cb(null, filename);
//   }
// });
// const upload = multer({ storage: storage });

// // Middleware
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Routes

// // Healthpackage page
// app.get('/healthpackage', async (req, res) => {
//   const packages = await Package.find(); // MongoDB se fetch ho raha hai
//   res.render('healthpackage', { packages });
// });


// // Login
// app.get('/login', (req, res) => {
//   res.render('login');
// });


// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'admin' && password === '1234') {
//     res.redirect('/dashboard');
//   } else {
//     res.send('Invalid credentials');
//   }
// });

// // Dashboard
// app.get('/dashboard', async (req, res) => {
//   const packages = await Package.find(); // MongoDB se fetch ho raha hai
//   res.render('dashboard', { packages });
// });

// // Add package
// app.post('/add-package', upload.single('icon'), async (req, res) => {
//   const { title, badge, description, price } = req.body;
//   const iconPath = `/uploads/${req.file.filename}`;

//   await Package.create({
//     title,
//     icon: iconPath,
//     badge,
//     description,
//     price
//   });

//   res.redirect('/dashboard');
// });

// // Delete
// app.post('/delete-package/:id', async (req, res) => {
//   await Package.findByIdAndDelete(req.params.id);
//   res.redirect('/dashboard');
// });

// // Edit form
// app.get('/edit/:id', async (req, res) => {
//   const pkg = await Package.findById(req.params.id);
//   res.render('edit', { pkg });
// });

// // Save edit (without image change)
// app.post('/edit-package/:id', async (req, res) => {
//   await Package.findByIdAndUpdate(req.params.id, req.body);
//   res.redirect('/dashboard');
// });

// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));



// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const Package = require('./models/packageModel'); // model ka path sahi hona chahiye

// const app = express();
// const PORT = 3000;

// // MongoDB connect
// mongoose.connect('mongodb://localhost:27017/healthLab', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('✅ MongoDB Connected'))
//   .catch(console.error);

// // Multer Storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'public/uploads');
//   },
//   filename: (req, file, cb) => {
//     const filename = `${Date.now()}-${file.originalname}`;
//     cb(null, filename);
//   }
// });
// const upload = multer({ storage: storage });

// // Middleware
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Routes

// // Show packages on Health Package Page
// app.get('/healthpackage', async (req, res) => {
//   const packages = await Package.find();
//   res.render('healthpackage', { packages });
// });

// // Login Page
// app.get('/login', (req, res) => {
//   res.render('login');
// });

// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'admin' && password === '1234') {
//     res.redirect('/dashboard');
//   } else {
//     res.send('Invalid credentials');
//   }
// });

// // Admin Dashboard
// app.get('/dashboard', async (req, res) => {
//   const packages = await Package.find();
//   res.render('dashboard', { packages });
// });

// // Add Package (with Image)
// app.post('/add-package', upload.single('icon'), async (req, res) => {
//   const { title, badge, description, price } = req.body;
//   const iconPath = `/uploads/${req.file.filename}`;

//   await Package.create({
//     title,
//     icon: iconPath,
//     badge,
//     description,
//     price
//   });

//   res.redirect('/dashboard');
// });

// // Delete Package
// app.post('/delete-package/:id', async (req, res) => {
//   const pkg = await Package.findById(req.params.id);
//   if (pkg && pkg.icon) {
//     const filePath = path.join(__dirname, 'public', pkg.icon);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   }
//   await Package.findByIdAndDelete(req.params.id);
//   res.redirect('/dashboard');
// });

// // Show Edit Form
// app.get('/edit/:id', async (req, res) => {
//   const pkg = await Package.findById(req.params.id);
//   res.render('edit', { pkg });
// });

// // Save Edited Package (with or without image)
// app.post('/edit-package/:id', upload.single('icon'), async (req, res) => {
//   const pkg = await Package.findById(req.params.id);

//   const updatedData = {
//     title: req.body.title,
//     badge: req.body.badge,
//     description: req.body.description,
//     price: req.body.price
//   };

//   if (req.file) {
//     // Delete old image
//     const oldImagePath = path.join(__dirname, 'public', pkg.icon);
//     if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);

//     // Add new image
//     updatedData.icon = `/uploads/${req.file.filename}`;
//   }

//   await Package.findByIdAndUpdate(req.params.id, updatedData);
//   res.redirect('/dashboard');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const session = require('express-session');
// const path = require('path');
// const fs = require('fs');
// const Package = require('./models/packageModel');

// const app = express();
// const PORT = 3000;

// // Connect MongoDB
// mongoose.connect('mongodb://localhost:27017/healthLab', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log('✅ MongoDB Connected'))
//   .catch(console.error);

// // Multer Setup
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'public/uploads'),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });
// const upload = multer({ storage });

// // Session Config
// app.use(session({
//   secret: 'healthlab_secret_key',
//   resave: false,
//   saveUninitialized: false
// }));


// // Middleware
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// // Auth Middleware
// const isAuthenticated = (req, res, next) => {
//   if (req.session && req.session.admin) next();
//   else res.redirect('/login');
// };

// // Routes

// // Public Health Package Page
// app.get('/healthpackage', async (req, res) => {
//   const packages = await Package.find();
//   res.render('healthpackage', { packages });
// });

// // Login Page
// app.get('/login', (req, res) => {
//   res.render('login');
// });

// app.get('/AboutBiogen.html', (req, res) => {
//   res.render('AboutBiogen.html');
// });

// app.get('/booktest', (req, res) => {
//   res.render('booktest');
// });

// app.get('/Career', (req, res) => {
//   res.render('Career');
// });

// app.get('/homecollection', (req, res) => {
//   res.render('homecollection');
// });// Login Page
// app.get('/', (req, res) => {
//   res.render('index');
// });// Login Page
// app.get('/locateus', (req, res) => {
//   res.render('locateus');
// });// Login Page
// app.get('/OurTeam', (req, res) => {
//   res.render('OurTeam');
// });
// app.get('/PartnerWithUs', (req, res) => {
//   res.render('PartnerWithUs');
// });
// app.get('/sign-in', (req, res) => {
//   res.render('sign-in');
// });
// app.get('/sign-up', (req, res) => {
//   res.render('sign-up');
// });
// // Login Logic
// app.post('/login', (req, res) => {
//   const { username, password } = req.body;
//   if (username === 'admin' && password === '1234') {
//     req.session.admin = true;
//     res.redirect('/dashboard');
//   } else {
//     res.send('Invalid credentials');
//   }
// });

// // Logout
// app.get('/logout', (req, res) => {
//   req.session.destroy(() => {
//     res.redirect('/login');
//   });
// });

// // Admin Dashboard (Protected)
// app.get('/dashboard', isAuthenticated, async (req, res) => {
//   const packages = await Package.find();
//   res.render('dashboard', { packages });
// });

// // Add Package (Protected)
// app.post('/add-package', isAuthenticated, upload.single('icon'), async (req, res) => {
//   const { title, badge, description, price } = req.body;
//   const iconPath = `/uploads/${req.file.filename}`;
//   await Package.create({ title, icon: iconPath, badge, description, price });
//   res.redirect('/dashboard');
// });

// // Delete Package (Protected)
// app.post('/delete-package/:id', isAuthenticated, async (req, res) => {
//   const pkg = await Package.findById(req.params.id);
//   if (pkg && pkg.icon) {
//     const filePath = path.join(__dirname, 'public', pkg.icon);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
//   }
//   await Package.findByIdAndDelete(req.params.id);
//   res.redirect('/dashboard');
// });

// // Show Edit Form (Protected)
// app.get('/edit/:id', isAuthenticated, async (req, res) => {
//   const pkg = await Package.findById(req.params.id);
//   res.render('edit', { pkg });
// });

// // Save Edited Package (Protected)
// app.post('/edit-package/:id', isAuthenticated, upload.single('icon'), async (req, res) => {
//   const pkg = await Package.findById(req.params.id);

//   const updatedData = {
//     title: req.body.title,
//     badge: req.body.badge,
//     description: req.body.description,
//     price: req.body.price
//   };

//   if (req.file) {
//     const oldImagePath = path.join(__dirname, 'public', pkg.icon);
//     if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
//     updatedData.icon = `/uploads/${req.file.filename}`;
//   }

//   await Package.findByIdAndUpdate(req.params.id, updatedData);
//   res.redirect('/dashboard');
// });

// // Server Start
// app.listen(PORT, () => {
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const Package = require('./models/packageModel');

const app = express();
const PORT = 3000;

// MongoDB Connect
mongoose.connect('mongodb+srv://abhishek:QaBYoGubKnvd3B6h@cluster0.qzdid.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(console.error);

// Multer Setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Session Config
app.use(session({
  secret: 'healthlab_secret_key',
  resave: false,
  saveUninitialized: false
}));

// Set session status to use in views
app.use((req, res, next) => {
  res.locals.isAuthenticated = !!req.session.admin;
  next();
});

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Authentication Middleware
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.admin) next();
  else res.redirect('/login');
};

// -------- ROUTES -------- //

// Static Pages
app.get('/', (req, res) => res.render('index'));
app.get('/AboutBiogen', (req, res) => res.render('AboutBiogen'));
app.get('/booktest', (req, res) => res.render('booktest'));
app.get('/Career', (req, res) => res.render('Career'));
app.get('/homecollection', (req, res) => res.render('homecollection'));
app.get('/locateus', (req, res) => res.render('locateus'));
app.get('/OurTeam', (req, res) => res.render('OurTeam'));
app.get('/PartnerWithUs', (req, res) => res.render('PartnerWithUs'));
app.get('/sign-in', (req, res) => res.render('sign-in'));
app.get('/sign-up', (req, res) => res.render('sign-up'));
app.get('/book', (req, res) => res.render('book'));
app.get('/test-details', (req, res) => res.render('test-details'));
app.get('/Radiology', (req, res) => res.render('Radiology'));
app.get('/Corporate-health', (req, res) => res.render('Corporate-health'));

// Health Package Page (public)
app.get('/healthpackage', async (req, res) => {
  const packages = await Package.find();
  res.render('healthpackage', { packages });
});

// -------- Admin Auth -------- //
app.get('/login', (req, res) => res.render('login'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === '1234') {
    req.session.admin = true;
    res.redirect('/dashboard');
  } else {
    res.send('Invalid credentials');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// -------- Admin Panel -------- //
app.get('/dashboard', isAuthenticated, async (req, res) => {
  const packages = await Package.find();
  res.render('dashboard', { packages });
});

app.post('/add-package', isAuthenticated, upload.single('icon'), async (req, res) => {
  try {
    const { title, badge, reportDelivery, parameterCount, priceActual, priceOriginal } = req.body;

    if (!req.file) {
      return res.status(400).send("Icon image is required.");
    }

    const iconData = fs.readFileSync(req.file.path);
    const icon = {
      data: iconData,
      contentType: req.file.mimetype
    };

    const packageData = {
      title,
      icon,
      badge,
      description: {
        reportDelivery,
        parameterCount
      },
      price: {
        actual: parseFloat(priceActual),
        original: parseFloat(priceOriginal),
      }
    };

    await Package.create(packageData);
    fs.unlinkSync(req.file.path);

    res.redirect('/dashboard');
  } catch (err) {
    console.error("Error adding package:", err);
    res.status(500).send("Something went wrong while adding the package.");
  }
});



app.post('/delete-package/:id', isAuthenticated, async (req, res) => {
  try {
    await Package.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error deleting package:', err);
    res.status(500).send('Failed to delete package');
  }
});


app.get('/edit/:id', isAuthenticated, async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  res.render('edit', { pkg });
});

app.post('/edit-package/:id', isAuthenticated, upload.single('icon'), async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  
  const updatedData = {
    title: req.body.title,
    badge: req.body.badge,
    description: {
      reportDelivery: req.body.reportDelivery,
      parameterCount: req.body.parameterCount
    },
    price: {
      actual: Number(req.body.actual),
      original: Number(req.body.original)
    }
  };

  if (req.file) {
    const iconData = fs.readFileSync(req.file.path);
    updatedData.icon = {
      data: iconData,
      contentType: req.file.mimetype
    };
    fs.unlinkSync(req.file.path);
  }

  await Package.findByIdAndUpdate(req.params.id, updatedData);
  res.redirect('/dashboard');
});

// In your Express server file (e.g., app.js or routes.js)
app.get('/api/packages', async (req, res) => {
  try {
    const packages = await Package.find(); // Replace with your model
    res.json(packages);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
