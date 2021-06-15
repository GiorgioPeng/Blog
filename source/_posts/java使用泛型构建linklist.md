---
title: java使用泛型构建linklist
date: 2020-03-16 13:50:21
tags: 算法
category: Java
---
[这里是泛型介绍](https://blog.csdn.net/s10461/article/details/53941091)
## linklist构成
一个个节点,每个节点除了保存自身的数据还指向下一个节点,最后一个节点指向为空(null)
## 节点创建
• 特殊模式
```java
//假设这里的节点的数据是一个个姓名
public class Node{
    public String name; //数据
    public Node next;   //指向下一个节点的指针
    public Node(String name){
    	this.name = name;
    	this.next = null;
    }
}
```
如果我们想要创建其他类型的节点(比如包含数字的等等), 按照这种写法, 我们需要写很多个不同的Node版本.这时候可以使用泛型来做一个通用版本
• 一般模式
```java
public class Node<T>{
    public T data;         //需要指定这个泛型的实际类型(比如类,字符串,数等),可以兼容多种类型
    /*
    比如
    根据传入的T不同,可以视为
    public String data;
    public int data;
    public ClassName data;
    ....
    */
    public Node<T> next;   //因为使用了泛型通配,这里的指针也需要指向下一个使用这个泛型的节点
    public Node(T data){
    	this.data = data;
    	this.next = null;
    }
}
```

## linklist常见方法
• remove
• add
• search
• ....
我们理应需要一个类来包括所有这些方法,管理好这个链表
> 为什么?
> 如果不这么做,其他类想要使用这些方法就需要重写一遍,这么做是为了提高可复用性和简洁性

## Linklist管理类创建
• 特殊模式
```java
public class Linklist{
    Node head;          //这个链表的头部指针
    //重载构造函数
    public Linklist(){  
    }
    public Linklist(Node node){
    	this.head = node;
    }
    public Linklist(Node[] node){
    	this.head = node[0];	//
    	Node tempHead = head;	//始终保证头部指针不移动,创建一个零时的头部指针
    	for(int i = 1;i<node.length;i++){
    		tempHead.next = node[i];
    		tempHead = tempHead.next;
    	}
    }

	//以下方法都是随便写了一种最简单的方式,如果需要重载,请自己添加
    public void add(Node newNode){
        if(head==null) head = newNode;
        else{
	    	Node tempHead = head;
	    	while(tempHead.next !=null){
	    		tempHead = tempHead.next;
	    	}
	    	tempHead.next = newNode;
    	}
    }
    public Node remove(Node node){
    	if(head == null) return null;
    	Node tempHead = head;
    	if(head.equals(node)){
    		head = head.next;
    		return tempHead;
    	}
    	else{
    		while(tempHead.next!=null){
    			if(tempHead.next.equals(node)){	//因为前面的if方法特殊的实现方式,所以这里可以错位比较类,方便删除
    				Node tempNode = tempHead.next;
    				tempHead = tempHead.next.next;
    				return tempNode;
    			}
    			else{
    				tempHead = tempHead.next;
    			}
    		}
    		return null;
    	}
    }
    public boolean search(Node node){
    	Node tempHead = head;
    	while(tempHead!=null){
    		if(tempHead.equals(node)) return true;
    		else tempHead = tempHead.next;
    	}
    	return false;
    }
    public void print(){
    	Node tempHead = head;
    	while(tempHead!=null){
    		System.out.println(tempHead.name);
    		tempHead = tempHead.next;
    	}
    }
    public static void main(String[] args){
        Linklist ll = new Linklist();
        Node L = new Node("Leo");
        Node T = new Node("Tom");
        ll.add(L);
        ll.add(T);
        ll.add(new Node("Ashe"));
        ll.print();
        ll.remove(L);
        ll.print();
        System.out.println(ll.search(T));
    }
}
```
· 一般模式
```java
public class Linklist<T>{
	Node<T> head;	//一个泛型节点头部指针
	public Linklist(){
	}
	public Linklist(Node<T> node){
		this.head = node;
	}
	public Linklist(Node<T> node[]){
		this.head = node[0];
		Node<T> tempHead = head;
		for(int i = 1;i<node.length;i++){
			tempHead.next = node[i];
			tempHead = tempHead.next;
		}
	}
	public void add(Node<T> newNode){
		if(head == null){
			head = newNode;
			return;
		}
		else{
			Node<T> tempHead = head;
			while(tempHead.next!=null){
				tempHead = tempHead.next;
			}
			tempHead.next = newNode;
		}
	}
	public Node<T> remove(Node<T> node){
		if(head == null) return null;
		Node<T> tempHead = head;
		if(head.equals(node)){
			head = head.next;
			return tempHead;
		}
		else{
			while(tempHead.next!=null){
				if(tempHead.next.equals(node)){
					Node<T> tempNode = tempHead;
					tempHead.next = tempHead.next.next;
					return tempNode;
				}
				else
					tempHead = tempHead.next;
			}
			return null;
		}
	}
	public boolean search(Node<T> node){
		Node<T> tempHead = head;
		while(tempHead!=null){
			if(tempHead.equals(node)){
				return true;
			}
			tempHead = tempHead.next;
		}
		return false;
	}
	public void print(){
		Node<T> tempHead = head;
		while(tempHead!=null){
	   		System.out.println(tempHead.data);
			tempHead = tempHead.next;
		}
	}
	public static void main(String[] args){		
       Linklist ll = new Linklist<Node>();
       Node L = new Node<String>("Leo");
       Node T = new Node<String>("Tom");
       ll.add(L);
       ll.add(T);
       ll.add(new Node<String>("Ashe"));
       ll.print();
       ll.remove(L);
       ll.print();
       System.out.println(ll.search(T));
	}
}
```

## 参考
https://blog.csdn.net/tuke_tuke/article/details/50253791
https://blog.csdn.net/s10461/article/details/53941091