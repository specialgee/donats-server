const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const uuid = require('uuid');

const DIR = './public/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, uuid() + '-' + fileName)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    },
    limits: 1024 * 1024 * 5
});

const router = express.Router();


// // User model
// let User = require('../models/User');

// router.post('/user-profile', upload.single('profileImg'), (req, res, next) => {
//     const url = req.protocol + '://' + req.get('host')
//     const user = new User({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         profileImg: url + '/public/' + req.file.filename
//     });
//     user.save().then(result => {
//         res.status(201).json({
//             message: "User registered successfully!",
//             userCreated: {
//                 _id: result._id,
//                 profileImg: result.profileImg
//             }
//         })
//     }).catch(err => {
//         console.log(err),
//             res.status(500).json({
//                 error: err
//             });
//     })
// })

// router.get("/", (req, res, next) => {
//     User.find().then(data => {
//         res.status(200).json({
//             message: "User list retrieved successfully!",
//             users: data
//         });
//     });
// });

// module.exports = router;






























// const express = require('express');

// const CategoryCtrl = require('../controllers/category-ctrl');

// const router = express.Router();

// router.post('/category', CategoryCtrl.createCategory);
// router.put('/category/:id', CategoryCtrl.updateCategory);
// router.delete('/category/:id', CategoryCtrl.deleteCategory);
// router.get('/category/:id', CategoryCtrl.getCategoryById);
// router.get('/categories', CategoryCtrl.getCategories);

// module.exports = router;


// const multer = require("multer");

// const storage = multer.diskStorage({
//     destination: "./public/uploads/",
//     filename: function(req, file, cb){
//        cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
//     }
//  });
 
// const upload = multer({
//     storage: storage,
//     limits:{fileSize: 1000000},
// }).single("myImage");
 
// const router = express.Router();
 
// router.post("/upload",
//     upload.single('photo'), (req, res, next) => {
//         return res.json({
//             image: req.file.path
//     });
// });

 



// // uploads
// const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads')
//   },
//   filename: function (req, file, cb) {
//       // rename the file name
//       // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))

//       // or use the original name
//       cb(null, file.originalname)
//   }
// });

// const upload = multer({storage: storage})

// app.use(express.static('public'));

// // upload image
// app.post('/upload', upload.single('image'), (req, res) => {
//     if(req.file) {
//         res.json(req.file);
//     }
//     else throw 'error';
// });

// app.post("/img", upload.single('photo'), (req, res, next) => {
//   return res.json({
//       image: req.file.path
//   });
// });





// var express = require('express');
// var Image = require('../models/image');
// var ImageRouter = express.Router();
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + file.originalname);
//     }
// });

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//         cb(null, true);
//     } else {
//         // rejects storing a file
//         cb(null, false);
//     }
// }

// const upload = multer({
//     storage: storage,
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter: fileFilter
// });

// /* 
//     stores image in uploads folder
//     using multer and creates a reference to the 
//     file
// */
// ImageRouter.route("/uploadmulter")
//     .post(upload.single('imageData'), (req, res, next) => {
//         console.log(req.body);
//         const newImage = new Image({
//             imageName: req.body.imageName,
//             imageData: req.file.path
//         });

//         newImage.save()
//             .then((result) => {
//                 console.log(result);
//                 res.status(200).json({
//                     success: true,
//                     document: result
//                 });
//             })
//             .catch((err) => next(err));
//     });

// /*
//     upload image in base64 format, thereby,
//     directly storing it in mongodb datanase
//     along with images uploaded using firebase
//     storage
// */    
// ImageRouter.route("/uploadbase")
//     .post((req, res, next) => {
//         const newImage = new Image({
//             imageName: req.body.imageName,
//             imageData: req.body.imageData
//         });

//         newImage.save()
//             .then((result) => {
//                 res.status(200).json({
//                     success: true,
//                     document: result
//                 });
//             })
//             .catch((err) => next(err));
//     });

// module.exports = ImageRouter;