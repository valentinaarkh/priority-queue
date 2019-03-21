const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		let node = new Node(data,priority);
		this.insertNode( node );
		this.shiftNodeUp( node );
		this.heapSize++;
	}

	pop() {
		if ( !this.isEmpty() ){
			let detachedRoot = this.detachRoot();
			if ( this.parentNodes.length === 0 ){
				return detachedRoot.data;
			}
			this.restoreRootFromLastInsertedNode(detachedRoot);
			this.shiftNodeDown(this.root);
			return detachedRoot.data;
		}
	}

	detachRoot() {
		let root = this.root;
		this.root = null;
		if ( this.parentNodes[0] === root ){
			this.parentNodes.shift();
		}
		this.heapSize--;
		return root;
	}

	restoreRootFromLastInsertedNode(detached) {
		if ( this.parentNodes.length === 0 ){
			return;
		}else{
			let last = this.parentNodes[this.parentNodes.length -1];
			this.parentNodes.pop();
			this.root = last;
			if ( detached.left ){
				this.root.appendChild( detached.left );
			}
			if ( detached.right ){
				this.root.appendChild( detached.right );
			}
			if ( this.parentNodes.length <= 1 ){
				this.parentNodes.unshift(last);
			}else if ( last.parent.right === last ) {
				this.parentNodes.unshift( last.parent );
			}
			last.remove();
		}
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		if ( this.heapSize === 0 ){
			return true;
		}else{
			return false;
		}
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if ( !this.root ){
			this.root = node;
			this.parentNodes.push(node);
		}else{
			let nodeToInsert = this.parentNodes[0];
			nodeToInsert.appendChild(node);
			this.parentNodes.push(node);
			if ( nodeToInsert.right === node ){
				this.parentNodes.shift();
			}
		}
	}

	shiftNodeUp(node) {
		if ( node.parent ) {
			if ( node.priority > node.parent.priority ){
				let nodeIndex = this.parentNodes.indexOf ( node );
				let parentIndex = this.parentNodes.indexOf (node.parent );

				if ( parentIndex !== -1 ){
					this.parentNodes [ parentIndex ] = node;
				}
				this.parentNodes[ nodeIndex ] = node.parent;

				if ( node.parent === this.root ){
					this.root = node;
				}

				node.swapWithParent();
				this.shiftNodeUp( node );
			}
		}
	}

	shiftNodeDown(node) {
		if ( node.left && node.left.priority > node.priority ){
			let nodeToShift = node.left;
			if ( node.right && node.right.priority > node.left.priority ){
				nodeToShift = node.right;
			}

			if ( node === this.root ){
				this.root = nodeToShift;
			}

			let parentIndex = this.parentNodes.indexOf(node);
			let childIndex = this.parentNodes.indexOf(nodeToShift);
			if ( parentIndex !== -1 ){
				this.parentNodes[parentIndex] = nodeToShift;
			}
			this.parentNodes[childIndex] = node;

			nodeToShift.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
