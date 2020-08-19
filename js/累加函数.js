function sum(...args) {
    console.log(args)

    let result = 0;

    result = args.reduce(function (pre, item) {
        return pre + item;
    }, 0);

    let add = function (...args) {

        console.log('add', args)

        result = args.reduce(function (pre, item) {
            return pre + item;
        }, result);

        return add;
    };

    add.valueOf = function () {
        console.log(result);
    }

    return add;
}
sum(1,2,3)(2,1)(1).valueOf()
