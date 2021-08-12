const rankcardService = require('../services/rankcard.service')
// const notifService = require('../')
module.exports = {
    getRanks
};


function getRanks(req,res,next){
//TODOc: return all ranks from the database and send to the client.
    console.log('getting all records in controller');
    rankcardService.getRanks(req.body)
        .then((mes)=>res.json(mes))
        .catch(err => next(err));
}


function decode(jwt) {
    const base64 = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const buff = new Buffer(base64, "base64");
    return JSON.parse(buff.toString("ascii"));
}
