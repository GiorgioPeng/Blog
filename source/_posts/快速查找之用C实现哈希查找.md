---
title: 快速查找之用C实现哈希查找
date: 2020-03-11 16:12:00
tags: 算法
category: C
---

>在一堆数据中查找其是否包含一个特定的数据，最常用的有线性搜索，哨兵搜索，二分搜索（如果排序了的话）, 但是这些查找方法至少都是 O(logN) 的复杂度。
如果你的内存足够大，且哈希函数构建合理的话，使用哈希查找可以秒杀其余查找算法，时间复杂度只有 O(1).
---

**概述**
一般而言，我们有一堆数据（比如所一堆整数）, 我们通常查找的时候是通过它们其中的一个属性（它的值大小）去判断我们想找的（整数）是否存在于这对整数之中。
但是一个变量我们应该有三个可以关注的属性：
- 变量名
- 存放的地址
- 变量的值

比如说线性查找，一个循环，不断的判断每个变量名对应的值是否与我们想要找的值相等，也就是说我们不能知道这个值存放的位置，需要有顺序且不重复的一个一个的遍历直到找到为止
但是哈希查找是从这些数据的存放地址入手，也就是说，你已经知道每个数据需要存放在哪，你要做的只是过去看看内存中的这个位置有没有东西就行了，有就说明找到了，没有就说明这堆数据中没有我们想找的数据
比如（内存位置不一定正确，仅仅只是为了说明简洁）:
我这里有一堆数据：1,2,3,34,36,23,4,12,654,8732
那么我可以这样存放

|      1     |      2     |      3     |     34     |     36     |
| :--------- | :--------- | :--------- | :--------- | :--------- |
| 0x00000010 | 0x00000014 | 0x0000001E | 0x00000154 | 0x00000168 |
|   **23**   |    **4**   |   **12**   |   **654**  |  **8732**  |
| 0x000000E6 | 0x00000028 | 0x00000078 | 0x0000198C | 0x00015518 |

每一个变量存储的地址都是它值的十倍
当我们想要找一个变量的时候，就直接将它的值乘十，将结果赋给一个指针，然后判断这个指针指向的值是否为我们想找的值，如果是就说明这堆数据中存在，如果不是就说明这堆数据中没有

---

对于如何获取一个值的哈希值的方法，这里不再赘述，下面是一个例子，例子中使用的数组模拟内存中的地址，获取哈希值使用取余法
> 因为用的 C++ 的编译器，所以是一个 c++ 的项目，但是核心语法都是用 C 写的，并没有涉及太多 C++ 的部分，本例子中使用的是一个链表结构，每个节点中包含着指向下一个节点的指针和一个唯一的正整数

```C
#include "pch.h"
#include <iostream>
using namespace std;
#define Length 10 // the number of the node

struct node
{
  int value;
  struct node* next;
};//the node

struct hash_map {
  struct node** link_list; // use a pointer which point a pointer to ensure its a link list
  int count;
};//the hash_map


void init(hash_map *hashmap) {
  hashmap->link_list = (node**)malloc(Length * sizeof(node*));
  hashmap->count = Length;

  for (int i = 0; i < Length; i++) {
    hashmap->link_list[i] = (node*)malloc(Length * sizeof(node));

  }
  for (int i = 0; i < Length; i++) {
    hashmap->link_list[i]->value = NULL; // give a inital value of every node
    if (i != Length - 1)				//make the node array become a link list
      hashmap->link_list[i]->next = hashmap->link_list[i + 1];
    else
      hashmap->link_list[i]->next = nullptr;
  }
}//init the hash_map

int get_hash(int value,hash_map* hashmap) {
  return value % hashmap->count;
}// get the hash value of a node


void enlargeSpace(hash_map* hashmap) {
  hashmap->count = 2 * hashmap->count;
  int *arr = (int*)malloc(hashmap->count * sizeof(int));
  for (int i = 0; i < hashmap->count; i++) {
    arr[i] = NULL;
  }
  int hash;
  for (int i = 0; i < hashmap->count / 2; i++) {
    hash = get_hash(hashmap->link_list[i]->value, hashmap);
    while (arr[hash] != NULL) {
      hash = get_hash(++hash, hashmap);
    }
    arr[hash] = hashmap->link_list[i]->value;
  }
  hashmap->link_list = (node**)malloc(hashmap->count*sizeof(node*));
  for (int i = 0; i < hashmap->count; i++) {
    hashmap->link_list[i] = (node*)malloc(sizeof(node));
    hashmap->link_list[i]->value = arr[i];
  }
  for (int i = 0; i < hashmap->count; i++) {
    if (i != hashmap->count - 1)				//make the node array become a link list
      hashmap->link_list[i]->next = hashmap->link_list[i + 1];
    else
      hashmap->link_list[i]->next = nullptr;
  }

}// enlarge the space of the array

int createHashMap(int data,hash_map* hashmap) {
  for(int i = 0;i<hashmap->count;i++)
    if(hashmap->link_list[i]->value==NULL)
      goto a;
  enlargeSpace(hashmap);//if there is no more space
a:
  int hash_value = get_hash(data,hashmap); // get the hash value of the node's value
  while (hashmap->link_list[hash_value]->value != NULL) { // if there is a value in the address, re-hash it
    hash_value = get_hash(++hash_value,hashmap);
  }
  hashmap->link_list[hash_value]->value = data; // store the value of the node in to the hash_map
  return 0;
}//create Hash Map


int find(hash_map* hashmap,int data) {
  int hash_value = get_hash(data,hashmap);
  int tempData = data;
  int first_hash_value = hash_value;
  while (hashmap->link_list[hash_value]->value != data) {
    tempData++;
    hash_value = get_hash(tempData,hashmap);
    if (hashmap->link_list[hash_value]->value == NULL || first_hash_value == hash_value)// if we do not find the data, return -1
      return -1;
  }
  return hash_value;

}

void removeNode(hash_map* hashmap, int hash_value) {
  if (hash_value == -1) // if the value is not in the link list
    return;
  hashmap->link_list[hash_value - 1]->next = hashmap->link_list[hash_value]->next;
  hashmap->link_list[hash_value] = nullptr;
}

int main()
{
  int arr[10] = { 1, 3, 4, 23, 64, 423,5643,543, 21, 123 };
  hash_map hashmap;
  node* head;

  head = (node*)malloc(sizeof(node));

  init(&hashmap);
  int j = 0;
  while (j < Length) {
    if (hashmap.link_list[j] != nullptr) {

      head = hashmap.link_list[j];
      break;
    }
    j++;
  }//ensure the head is the first one of the link list

  for (int i = 0; i < Length; i++)
    createHashMap(arr[i],&hashmap);
  for (int i = 300000; i < 300020; i++)
    createHashMap(i,&hashmap);
  printf("the init link list is:\n");

  while (head != nullptr) {
    printf("%d\t", head->value);
    head = head->next;
  }//print the link list before we remove anyone
  j = 0;

  while (j < Length) {
    if (hashmap.link_list[j] != nullptr) {

      head = hashmap.link_list[j];
      break;
    }
    j++;
  }//ensure the head is the first one of the link list


  removeNode(&hashmap, find(&hashmap, 423));
  removeNode(&hashmap, find(&hashmap, 1));

  printf("\n After remove a node:\n");
  while (head != nullptr) {
    if(head->value!=NULL)
      printf("%d\t", head->value);
    head = head->next;
  }//print the result of the link list after we remove 423 and 1

}



```
