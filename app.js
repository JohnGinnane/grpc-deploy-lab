var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = __dirname + "/protos/calc.proto";
var packageDefinition = protoLoader.loadSync(PROTO_PATH);

var calc_proto = grpc.loadPackageDefinition(packageDefinition).calc;

function err(callback, msg) {
    callback(null, {
        message: msg,
        result:  undefined
    });
}

// Naming the server-side functions
// with the prefix "srv" to help 
// distinguish them from the proto
// service functions
function srvAdd(call, callback) {
    try {
        var A = parseInt(call.request.A);
        var B = parseInt(call.request.B);
    
        if (!isNaN(A) && !isNaN(B)) {
            var result = A + B;

            callback(null, {
                message: undefined,
                result: result
            })
        } else {
            err(callback, "Please specify two numbers");
        }
    } catch (ex) {
        err("An error occurred");
        console.log("An error occurred: ");
        console.log(ex);
    }
}

function srvSubtract(call, callback) {
    try {
        var A = parseInt(call.request.A);
        var B = parseInt(call.request.B);
    
        if (!isNaN(A) && !isNaN(B)) {
            var result = A - B;

            callback(null, {
                message: undefined,
                result: result
            })
        } else {
            err("Please specify two numbers");
        }
    } catch (ex) {
        err("An error occurred");
        console.log("An error occurred: ");
        console.log(ex);
    }
}

function srvDivide(call, callback) {
    try {
        var A = parseInt(call.request.A);
        var B = parseInt(call.request.B);
    
        if (!isNaN(A) && !isNaN(B)) {
            var result = A / B;

            callback(null, {
                message: undefined,
                result: result
            })
        } else {
            err("Please specify two numbers");
        }
    } catch (ex) {
        err("An error occurred");
        console.log("An error occurred: ");
        console.log(ex);
    }
}

function srvMultiply(call, callback) {
    try {
        var A = parseInt(call.request.A);
        var B = parseInt(call.request.B);
    
        if (!isNaN(A) && !isNaN(B)) {
            var result = A * B;

            callback(null, {
                message: undefined,
                result: result
            })
        } else {
            err("Please specify two numbers");
        }
    } catch (ex) {
        err("An error occurred");
        console.log("An error occurred: ");
        console.log(ex);
    }
}

var server = new grpc.Server();
server.addService(calc_proto.CalcService.service, {
    add:      srvAdd,
    subtract: srvSubtract,
    divide:   srvDivide,
    multiply: srvMultiply
});

server.bindAsync("0.0.0.0:40000", grpc.ServerCredentials.createInsecure(), function() {
    // This is apparently deprecated, server starts automatically now
    //server.start();
});