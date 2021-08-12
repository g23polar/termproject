const parecordService = require('../services/parecord.service')
// const notifService = require('../')
module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord
};


function createPArecord(req, res, next) {
  //TODOc: via parecordSerice you should add a PA record and respond to the client confirming that the record was successfully added.
    console.log('creating record in controller');
    const jwttemp = req.headers["authorization"].split(" ")[1];
    const user = decode(jwttemp)["sub"];

    console.log(req.body ,user);
    parecordService.addPArecord(req.body, user)
        .then((mes) => res.json(mes))
        .catch(err =>next(err));
}

function getPArecords(req,res,next){
//TODOc: return all parecords from the database and send to the client.
    console.log('getting all records in controller');
    parecordService.getAllPArecords(req.body)
        .then((mes)=>res.json(mes))
        .catch(err => next(err));
}


function deletePArecord(req,res,next){

//TODOc: delete parecord from the database and respond to the client by conforming the action.
    const jwttemp = req.headers["authorization"].split(" ")[1];
    const user = decode(jwttemp)["sub"];
    console.log('deleting record in controller: ', req.body);
    parecordService.deletePArecord(user, req.params.date)
        .then((mes) => res.json(mes))
        .catch(err => next(err));

}

function decode(jwt) {
    const base64 = jwt.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    const buff = new Buffer(base64, "base64");
    return JSON.parse(buff.toString("ascii"));
}
