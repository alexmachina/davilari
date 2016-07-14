var categoryDAO= require('../../models/data/mysql/categoryDAO');

function CategoryModel () {
  this.api = {};

  this.api.get = function (req, res) {
    categoryModel.find(function(err, cats) {
      res.status(200).json(cats);
    });
  }
   var renderPage = function (res, page, data) {

      res.render(page, data);

    };

//Render Categories
  this.get = function (req, res) {
    categoryDAO.findAll(function(err, categories) {
      if (err) {
        return res.status(500).send(err);
      }

      renderPage(res, 'admin/pages/category', {categories : categories});
    });
    /*
  categoryModel.find(function(err, data) {
    if (err)
      return res.status(500).send(err);

    renderPage(res, 'admin/pages/category', {"categories" : data});
  });
  */
  };
//Render Form
  this.getForm = function (req, res) {
    res.render('admin/pages/category/form', {category: {}});
  };

  //Render form with category
  this.getOne = function (req, res) {
    categoryDAO.findOne(req.param('id'), function(err, category) {
      if (err){ 
        console.log(err);
        return res.status(500).send(err); }

      renderPage(res, 'admin/pages/category/form', {category : category});
        
    });
    /*
    var _id = req.param('id');

    categoryModel.findOne({"_id" : _id}, function(err, data) {
      renderPage(res, 'admin/pages/category/form', {"category" : data});
    });
    */
  };

  //Update category
  this.put = function (req, res) {
    var _id = req.param('id');
    categoryDAO.update(_id, req.body, function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      return res.status(200).send("OK");

      
    });

      /*
    categoryModel.update({"_id" : _id} , req.body, function (err, data) {
      console.log(req.body);
      if (err)
        return res.status(500).send(err);

      return res.status(200).send("OK");
    });
    */
  };

  this.post = function (req, res) {
    categoryDAO.insert(req.body, function (err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }

      return res.status(200).send("OK");

    });
    /*
    categoryModel.create(req.body, function (err, data) {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      } else {
        console.log("Category inserted");
        return res.status(200).send("OK");
      }
    });
    */
  };
}

module.exports = new CategoryModel();
