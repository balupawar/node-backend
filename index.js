const express = require('express');
const con = require('./database/dbConfig');
const json = require('body-parser/lib/types/json');
const cors = require('cors');
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(cors())

//! crud operation for category
//display all category
app.get('/api/v1/category',(request,response)=>{
    // display all the category data
    con.query("SELECT * FROM category",(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})

// display perticular category by id
app.get('/api/v1/category/:id',(request,response)=>{
    // const id = request.params.id;
    con.query("SELECT * FROM category WHERE category_id ="+request.params.id,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    })
})

// update category
app.put("/api/v1/category/:id",(request,response)=>{
    const data = [request.body.category_name,request.params.id];
    con.query("UPDATE category SET category_name = ? WHERE category_id = ?",data,(err,result)=>{
      if(err){
        throw err;
      }
      response.send(result);
    });
  });

  // insert category
  app.post("/api/v1/category",(request,response)=>{
    const data = request.body;
    con.query("INSERT INTO category SET ?",data,(err,result)=>{
        if(err){
          throw err;
        }
        response.send(result);
      });
  });

  //delete category
  app.delete("/api/v1/category/:id",(request,response)=>{
    con.query("DELETE FROM category WHERE category_id ="+request.params.id,(err,result)=>{
        if(err){
          throw err;
        }
        response.send(result);
      });
  });

  // display product list with category
  app.get("/api/v1/productList",(request,response)=>{
    con.query("SELECT * FROM product NATURAL JOIN category",(err,result)=>{
        if(err){
            throw err;
        }
        response.send(result);
    });
  });

  // display product
  app.get('/api/v1/products',(request,response)=>{
    // display all the category data
    con.query("SELECT * FROM product",(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    });
});

// display perticular category by id
app.get('/api/v1/products/:id',(request,response)=>{
    // const id = request.params.id;
    con.query("SELECT * FROM product WHERE product_id ="+request.params.id,(error,result)=>{
        if(error){
            response.send(error);
        }
        else{
            response.send(result);
        }
    });
});

// insert category
app.post("/api/v1/products",(request,response)=>{
    const data = request.body;
    con.query("INSERT INTO product SET ?",data,(err,result)=>{
        if(err){
          throw err;
        }
        response.send(result);
      });
  });

  // update product
  app.put("/api/v1/products/:id",(request,response)=>{
    const data = [request.body,request.params.id];
    con.query("UPDATE product SET ? WHERE product_id = ?",data,(err,result)=>{
      if(err){
        throw err;
      }
      response.send(result);
    });
  });

  app.delete("/api/v1/products/:id",(request,response)=>{
    con.query("DELETE FROM product WHERE product_id ="+request.params.id,(err,result)=>{
        if(err){
          throw err;
        }
        response.send(result);
      });
  });


app.listen(PORT, (err) => {
    if(err)
    {
        console.log(err);
    }
    console.log(`Server running on port ${PORT}`);
});
