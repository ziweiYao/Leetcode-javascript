class LinkedList {
    constructor() {
        this.head = null;
    }
    
    // 遍历
    traverse() {
        let current = this.head;
        const result = [];
        while (current !== null) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }
    
    // 头部插入
    insertAtHead(val) {
        const newNode = new ListNode(val);
        newNode.next = this.head;
        this.head = newNode;
    }
    
    // 尾部插入
    insertAtTail(val) {
        const newNode = new ListNode(val);
        
        if (this.head === null) {
            this.head = newNode;
            return;
        }
        
        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        current.next = newNode;
    }
    
    // 删除指定值
    deleteByValue(val) {
        if (this.head === null) return;
        
        if (this.head.val === val) {
            this.head = this.head.next;
            return;
        }
        
        let current = this.head;
        while (current.next !== null) {
            if (current.next.val === val) {
                current.next = current.next.next;
                return;
            }
            current = current.next;
        }
    }
    
    // 查找
    find(val) {
        let current = this.head;
        while (current !== null) {
            if (current.val === val) {
                return current;
            }
            current = current.next;
        }
        return null;
    }
}
function updateValue(head, index, newVal) {
    let current = head;
    let position = 0;
    
    // 找到指定位置的节点
    while (current !== null && position < index) {
        current = current.next;
        position++;
    }
    
    // 如果节点存在，修改其值
    if (current !== null) {
        current.val = newVal;
    }
    
    return head;
}

// 使用示例
const list = new LinkedList();
list.insertAtTail(1);
list.insertAtTail(2);
list.insertAtTail(3);
list.insertAtHead(0);
console.log(list.traverse()); // [0, 1, 2, 3]
list.deleteByValue(1);
console.log(list.traverse()); // [0, 2, 3]
list.insertAtTail(1);
console.log(list.traverse()); // [0, 2, 3, 1]
console.log(list.find(2)); // { val: 2, next: null }
console.log(updateValue(list.head, 2, 4)); // { val: 0, next: { val: 2, next: { val: 4, next: { val: 3, next: null } } } }