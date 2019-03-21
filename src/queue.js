const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize) {
		this.maxSize = maxSize || 30;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if ( this.size() >= this.maxSize ){
			throw new Error ( "Heap has maximum size" );
		}else{
			this.heap.push(data,priority);
		}
	}

	shift() {
		if ( this.isEmpty() ){
			throw new Error("This heap is empty");
		}else{
			let removedNodeValue = 	this.heap.pop();
			return removedNodeValue;
		}
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return this.heap.isEmpty();
	}
}

module.exports = PriorityQueue;
