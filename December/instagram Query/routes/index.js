var express = require('express');
var router = express.Router();
let  userModel = require('../model/users');
let  postModel = require('../model/posts');
const async = require('hbs/lib/async');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/pieChart', async function(req, res, next) {
  let users = await userModel.aggregate([
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'postBy',
        as: 'posts'
      }
    },
        {
        $addFields : {
            totalPost : {
                $size : "$posts"
            }
        }
    },                  
    ]);
    // console.log(users)
  res.json({users});
});

router.get('/highChart/:unit', async function(req, res, next) {
  console.log(req.params.unit)
  let users;
  if(req.params.unit == "monthly"){
     users = await postModel.aggregate([
      {
        $match: {
            postOn: {
                $gt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30  * 7),
            },
        },
    },
    {
      $sort : {
        _id : -1
      }
    },
    {
        $group: {
            _id: {
                month: { $month: { date: "$postOn", timezone: "Asia/Kolkata" } }
               
            },
            postOn: {
                $first: { $dateToString: { format: "%Y", date: "$postOn" } },
            },
            totalPosts: { $sum: 1 },
        }   
    }
    ])

  }else if(req.params.unit == "yearly") {
    users = await postModel.aggregate([
      {
        $match: {
            postOn: {
                $gt: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30  * 7),
            },
        },
    },
    {
      $sort : {
        _id : -1
      }
    },
    {
        $group: {
            _id: {
                month: { $month: { date: "$postOn", timezone: "Asia/Kolkata" } }
               
            },
            postOn: {
                $first: { $dateToString: { format: "%Y", date: "$postOn" } },
            },
            totalPosts: { $sum: 1 },
        }   
    }
    ])
  }
  res.json({users})
});
module.exports = router;
