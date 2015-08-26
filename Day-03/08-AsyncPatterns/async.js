/* Sync */
function addSync(x,y){
    console.log("[SP] Processing ", x , " and ", y);
    var result = x + y;
    console.log("[SP] returning result");
    return result;
}

function addSyncClient(x,y){
    console.log("[SC] triggering add");
    var result = addSync(x,y);
    console.log("[SC] result = ", result);
}

/* Async - 1 (Callback)*/

function add(x,y, onResult){
    console.log("[SP] Processing ", x , " and ", y);
    setTimeout(function(){
        var result = x + y;
        console.log("[SP] returning result");
        onResult(result);
    },4000);
}

function addClient(x,y){
    console.log("[SC] triggering add");
    add(x,y, function(result){
        console.log("[SC] result = ", result);
    });
}

/* Async - 2 */

function getAdder(){
    var _callbacks = [];
    return {
        add : function(x,y){
            console.log("[SP] Processing ", x , " and ", y);
            setTimeout(function(){
                var result = x + y;
                console.log("[SP] returning result");
                _callbacks.forEach(function(callback){
                    callback(result);
                })
            },4000);
        },
        subscribe : function(callback){
            _callbacks.push(callback);
        }
    }
}

function addClient(x,y){
    var adder = getAdder();
    adder.subscribe(function(result){
        console.log("[SC] result = ", result);
    });
    console.log("[SC] triggering add");
    adder.add(100,200);
}

/* Async - 3 (Promises) */
function add(x,y){
    var promise = new Promise(function(resolve, reject){
        console.log("[SP] Processing ", x , " and ", y);
        setTimeout(function(){
            var result = x + y;
            console.log("[SP] returning result");
            resolve(result);
        },4000);
    });

    return promise;
}

function addClient(x,y){
    console.log("[SC] triggering add");
    var promise = add(x,y);
    promise.then(function(result){
        console.log("[SC] result = ", result);
    });
}




