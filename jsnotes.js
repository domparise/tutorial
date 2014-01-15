var banner = (function() {
	var cols = process.stdout.getWindowSize()[0];
	return function(msg) {
		var side = new Array((cols-cols%2-msg.length%2-msg.length)/2+1).join('/');
		console.log(side+msg+side);
	}
})();

/////////////////////////////////////////////OOP////////////////////////////////////////
banner('OOP');
// using object notation for calling member functions (apparently doesnt scale well due to greating a new object for each instance)
//	may only be in reference to returning the functions 
var yolo = {
	// anonymous functions can be called from the original object, but not given to others
	solo: function(msg) {
		console.log("helo "+msg);
	}, 
	// this can now be passed to another variable as a function to use
	// but without name, hidden like a protected class
	dolo: function dolo(msg) {
		console.log("helo from yololand "+msg);
	}
}

var sup = {brolo:yolo.dolo};
sup.brolo("yo");

//////////////////////////////////CLOSURES///////////////////////////////
banner('CLOSURES');

function closure(msg) {
	// when this function is set to a variable, but passed in a value, 
	// this value will be closed within the scope of the function 
	var counter = 0;
	var blah = "you once said: " + msg + ":" + counter;
	function changeBlah() {
		// even keep track of original msg argument from scope
		blah = 'you once said: ' + msg + ':' + counter;
	}

	// by returning a function, we can set our function to do something when called
	return function() {
		counter++;
		if( !(counter%2) ) {		
			// without this, you would always once have just said 0 for the count in blah
			changeBlah();
		}
		console.log(counter+':'+blah);
	}
}

var theClosure = closure('sup');
theClosure();
var otherClosure = closure('yolo');
otherClosure();
theClosure();
console.log(theClosure);


function counter() {
	var privateCounter = 0;
	function changeBy(val) {
		privateCounter += val;
	}
	return {
		increment: function() {
			privateCounter++;
			changeBy(1);
		},
		decrement: function() {
			changeBy(-1);
		},
		value: function() {
			return privateCounter;
		}
	};   
};

var counter1 = counter();
var counter2 = counter();
console.log(counter1);

counter1.increment();
counter2.increment();
counter2.increment();
console.log(counter1.value());
console.log(counter2.value());

////////////////////////////////////////////////PROTOTYPES////////////////////////////////////////////////
banner('PROTOTYPES');

var proto_obj = {
	safe: 3, 
	name: "obj",
	modifiable: {
		num: 4,
		chname: "sup"
	}
}

var fn = function(vals){this.constructd = 'first';this.vals = vals;};
fn.prototype = proto_obj;
var other = new fn();
var other2 = new fn(3);

other.safe = 5;
other.modifiable.num = 1;
other2.modifiable.num = 10;
other2.constructd = 'second';

console.log(proto_obj);
console.log(other);
console.log(other2);
console.log(other.modifiable);
console.log(other2.modifiable);


////////////////////////////////////////////////Complex object structures////////////////////////////////////////////////
banner("COMPLEX OBJECTS");
var ctr = function(val,name) {
	// this value is constructed as part of the object
	this.init_val = val;
	// this value is hidden due to closure
	var closed_val = val+2;
	this.closure = function(arg) {
		switch(typeof(arg)) {
			// if argument is a function, ie callback, 
			// this lets us see the closed value in a very specific context
			case "function":
				arg(closed_val);
				break;
			// or we can set this closed value with an argument
			case "number":
				closed_val = arg;
				break;
		}
		closed_val--;
		console.log(closed_val);
	};
	if(name){
		this.get_name = function() {
			return name;
		};
	}
};
ctr.prototype = {
	data: {
		num: 1,
		str: "we can all change this",
	},
	showme: function() {
		// displays context of the prototype caller
		console.log(this);
	},
	showus: function() {
		// displays context of shared prototype
		if(this.last) console.log("last shown by " + this.last);
		else console.log("first to show");
		console.log(this.data);	
		this.__proto__.last = this.get_name();
		// this.last = this.get_name();
	},
	chngval: function(val) {
		if(this.last_to_val) console.log("last changed by " +(this.last_to_val===this.get_name()?"you":this.last_to_val)+ " to " + this.value);
		else console.log("setting value");
		// by using __proto__ you ensure that this is shared
		this.__proto__.value = val;
		this.__proto__.last_to_val = this.get_name(); 
	},
	ptr: function() {
		var ptr = this;
		return function() {
			return ptr;
		};
	}
}

var obj1 = new ctr(10,"obj1");
var obj2 = new ctr(3,"obj2");

// here the value is undefined, because its only closed in the scope
// of the function defined in the constructor
console.log(obj1.closed_val);
// but calling the closure lets us do something to it
obj1.closure();

// and calling the closure with a callback lets us retrieve (capture?) a closed variable
obj1.closure( function(val) {
	// this value is 'passed by value' to our function
	console.log(val++);
	console.log(val);
	console.log('called back');
});
// or set the value
obj1.closure(50);

obj1.showme();
obj2.showus();
obj2.data.str = "ya i know";
obj1.showus();

// the value set within the prototype, not shared, is unique to the object instance if you use this.last (visited)
// but this value is shared if you use this.__proto__.last
// one person setting a this.last as opposed to this.__proto__.last will disallow sharing of the variable (within a prototype function)

obj1.chngval(10);
obj2.chngval(2);
obj1.chngval(10);
obj1.chngval(3);

// as if prototyped objects are implicit, but not described by functions like console.log()

// here we emulate a pointer with a closure within the prototype
// this has access to the 'private' members of obj1
var obj1ptr = obj1.ptr();
var obj2ptr = obj2.ptr();
console.log(obj2ptr().get_name());
console.log(obj1ptr().get_name());


/*////////////////ENCAPSULATION////////////////////
// modularize files with 
module.exports = yolo; 
// and then in another file 
var yolo = require('./filename.js');*/



////////////////closure calculus////////////////

function derivative(f, dx) {
	return function(x) {
		return (f(x + dx) - f(x)) / dx;
	};
}

function integral(f,dx) {
	return function(a,b) {
		var sum = 0;
		for(var x = a; x < b; x += dx){
			sum += f(x);
		}
		return sum / ((b-a)/dx);
	};
}

function f_sq(x){
	return x*x;
}

function f_cub(x){
	return x*x*x;
}


/////////////////////////////////////////others////////////////////////////////

// prototypes allow encapsulating global variables within a set of functions
//

var params = {
	name1: "value1",
	name2: "value2"
}
var count = 1,
	str,
	options = {};
for (var name in params) {
	str = 'HitLayoutParameter.'+count+'.Name';
	options[str] = name;
	str = 'HitLayoutParameter.'+(count++)+'.Value';
	options[str] = params[name];
}
console.log(options);