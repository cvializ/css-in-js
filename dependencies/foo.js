(function (global, execute) {
    console.log(global);
    execute();
})(this, () => console.log('lol'))

console.log('this', this)
