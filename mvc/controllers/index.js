let getIndex = function(req, res) {
  res.render('index', { title: 'Countries API' });
}

let getExample = function(req,res) {
    res.render('example',{title:'Example HTTP Requests'});
}

let getReqExample = function(req,res) {
    res.statusJson(200,{message:'User Made a Get Request'});
}

let postReqExample = function(req,res) {
    res.statusJson(201,{message:'User Made a POST Request'});
}

let putReqExample = function(req,res) {
    res.statusJson(400,{message:'User Made a PUT Request'});
}

let deleteReqExample = function(req,res) {
    res.statusJson(500,{message:'User Made a DELETE Request'});
}

let getStatusCode = (req,res)=>{
    res.render("status-code",{ title : "Status Code" });
}

module.exports = {
    getIndex,
    getExample,
    getReqExample,
    postReqExample,
    putReqExample,
    deleteReqExample,
    getStatusCode
}
