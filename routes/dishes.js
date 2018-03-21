var express=require('express');
var dishRouter = express.Router();
dishRouter.route('/')
    .all(function (req,res,next) {
        res.status(200);
        res.setHeader('Content-Type','text/plain');
        next();
    })
    .get(function (request, response) {
        response.write("This will return all dishes");
        response.end();
    })
    .put(function (request, response) {
        response.status(403).
        response.write('You cannot do PUT operation on this endpoint');
        response.end();
    })
    .post(function (request, response) {
        response.status(201).
        response.json('Dish created successfully');
        // response.end();
    })
    .delete(function (request, response) {
        response.write("OK");
        response.end();
    });

dishRouter.route('/:id')
    .get(function (request, response) {
        var id = request.params.id;
        response.write('dishes retrieved id:'+id);
        response.end();
    })
    .post(function (request, response) {
        response.status(403);
        response.write('Cannot make POST request on this end point');
        response.end();
    })
    .put(function (request, response) {
        response.write('Updated Dish Successfully');
        response.end();
    })
    .delete(function (request, response) {
        response.write('Deleted Dish Successfully');
        response.end();
    });
module.exports= dishRouter;