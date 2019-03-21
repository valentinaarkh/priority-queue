class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if ( !this.left ){
			this.left = node;
			this.left.parent = this;
		}else if ( !this.right ){
			this.right = node;
			this.right.parent = this;
		}else{
			return;
		}
	}

	removeChild(node) {
		if ( node === this.left ){
			this.left.parent = null;
			this.left = null;
		}else if ( node === this.right ){
			this.right.parent = null;
			this.right = null;
		}else{
			throw new Error ("Passed node is not a child of this.parent ");
		}
	}

	remove() {
		if ( !this.parent ){
			return;
		}else{
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if ( this.parent ){
			let parent = this.parent;
			let leftChild = this.left;
			let rightChild = this.right;
			let parentRightChild = this.parent.right;
			let parentLeftChild = this.parent.left;
			let parentParent = this.parent.parent;


			if ( leftChild ){
				leftChild.remove();
			}
			if ( rightChild ){
				rightChild.remove();
			}

			parent.removeChild(this);

			if ( parentParent ){
				parent.remove();
				parentParent.appendChild(this);
			}

			if ( this === parentLeftChild ){
				this.appendChild(parent);
				if ( parentRightChild ){
					parentRightChild.remove();
					this.appendChild( parentRightChild);
				}
			}
			if ( this === parentRightChild){
				parentLeftChild.remove();
				this.appendChild(parentLeftChild);
				this.appendChild(parent);
			}

			if ( leftChild ){
				parent.appendChild(leftChild)
			}
			if ( rightChild ){
				parent.appendChild(rightChild);
			}

		}else{
			return;
		}
	}
}

module.exports = Node;
