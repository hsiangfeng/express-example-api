var express = require('express');
var router = express.Router();

const firebaseDB = require('../connections/firebase_admin_connect');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({
    title: 'shopping'
  });
});

// HTTP Methods
// 新增產品 API
router.post('/admin/product', function(req, res, next) {
  const reqData = req.body.data || {};
  const productsRef = firebaseDB.ref('shopping/products');
  const productRef = productsRef.push(); // 生成 key

  reqData.id = productRef.key;
  productRef.set(reqData).then(() => {
    res.send({
      success: true,
      message: '建立產品成功'
    });
  }).catch(() => {
    res.status(400).send({
      success: false,
      message: '建立產品失敗'
    });
  })
});
// 取得全部產品 API
router.get('/admin/products', function(req, res, next) {
  const productsRef = firebaseDB.ref('shopping/products');

  // .on = 持續
  // .once = 只跑一次
  productsRef.once('value').then((snapshot) => {
    const products = [];
    // 這是 Firebase 的 forEach
    // firebase noSQL
    snapshot.forEach((item) => {
      products.push(item.val());
    });
    res.send({
      success: true,
      products
    })
  })
});

// 取得單一商品 API
router.get('/admin/product/:id', function(req, res, next) {
  const id = req.params.id;
  const productsRef = firebaseDB.ref(`shopping/products/${id}`);
  productsRef.once('value').then((snapshot) => {
    res.send({
      success: true,
      product: snapshot.val(),
    })
  })
});

// 刪除單一商品 API
router.delete('/admin/product/:id', function(req, res, next) {
  const id = req.params.id;
  const productsRef = firebaseDB.ref(`shopping/products/${id}`);
  productsRef.remove().then(() => {
    res.send({
      success: true,
      message: '刪除成功'
    })
  })
});

module.exports = router;
