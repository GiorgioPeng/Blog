---
title: C
---

# C

## 快速查找之用 C 实现哈希查找

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

---

## 使用 C 实现快速排序以及快速排序讲解

> 这里只讨论单主元的快速排序

**概述**
快速排序用的非常广泛，它可以说目前一种在时间和空间上都比较理想的排序算法，平均复杂度是 O(NlogN)
为什么快排比冒泡或者插入等排序方式要快呢？因为快排并不是逐位比较交换的，它的交换跨度很大。
主元位置选取一般有两种方式，一种是把主元放在第一位，另一种是把主元放在倒数第一位
:::tip
选取主元时，可以比较一下头，尾，中 三个元素的大小，选中间那个，因为主元选取和算法的时间关系非常大
:::
- 如果选择第一位作为主元位的话，则需要后面的指针先移动，因为要确保最终和主元位交换的元素是小于等于主元的
- 如果选择最后一位作为主元的话，则需要前面的指针先移动，因为要确保最终和主元位交换的元素是大于等于主元的

*这里使用第一位作为主元的方式来介绍一下*

有下面这样一个数组 arr
我们的想法是将这个数组中所有比主元大的都移动到主元的右边，比主元小的都移动到主元你的左边（也就是最终实现一个升序排列）

|   0   |  1  |  2  |  3  |  4  |  5  |
|:-----:|:---:|:---:|:---:|:---:|:---:|
|  57   |  20 |  32 |  69 | 124 |  38 |
|pivot,i|     |     |     |     |  j  |

1.
  选取主元为 arr[0] &nbsp; ( pivot = 57 )
  有一个左指针 i 指向该片段第一个元素 &nbsp; ( i = 0 )
  有一个右指针 j 指向该片段最后一个元素 &nbsp; ( j = 5 )
2.
  发现 j 指向的元素 (38) 比主元小，应该放在左边去，所以 j 就停在了这里  &nbsp; ( j = 5 )
  发现 i 的值比主元小，那么 i 就一直往后走，直到 i 指向元素 69 时发现该元素比主元大，应该放在右边去，所以 i 就停在了这里  &nbsp; ( i = 3 )
  此时交换 i, j 指向的元素值
  |  0  |  1  |  2  |  3  |  4  |  5  |
  |:---:|:---:|:---:|:---:|:---:|:---:|
  |  57 |  20 |  32 |  38 | 124 |  69 |
  |pivot|     |     |  i  |     |  j  |
3.
  这时候 又到 j 移动了，j 发现前一个元素比主元大，于是继续往前走，发现和 i 相遇了，这时候交换主元与 i, j 同时指向的这个元素
  |  0  |  1  |  2  |  3  |  4  |  5  |
  |:---:|:---:|:---:|:---:|:---:|:---:|
  |  57 |  20 |  32 |  38 | 124 |  69 |
  |pivot|     |     | i,j |     |     |

  得到
  |  0  |  1  |  2  |  3  |  4  |  5  |
  |:---:|:---:|:---:|:---:|:---:|:---:|
  |  38 |  20 |  32 |  57 | 124 |  69 |
  |pivot|     |     | i,j |     |     |

  这时候就发现元素 57 左边的都比 57 要小，右边的都比 57 要大
  这时候我们的第一轮排序就完成了（每次主元交换之后就算一轮排序完成）
4.
  我们第二轮排序从 57 的左边开始
  i = 0
  pivot = 38
  j = 3-2 = 2
  |   0   |  1  |  2  |  3  |  4  |  5  |
  |:-----:|:---:|:---:|:---:|:---:|:---:|
  |   38  |  20 |  32 |  57 | 124 |  69 |
  |pivot,i|     |  j  |     |     |     |

  j 发现 32 比 38 小，于是就不移动了
  然后 i 开始移动，发现 20 比 38 小，继续向后移动，发现走到了 j 指向的位置
  |   0   |  1  |  2  |  3  |  4  |  5  |
  |:-----:|:---:|:---:|:---:|:---:|:---:|
  |   38  |  20 |  32 |  57 | 124 |  69 |
  |pivot  |     | i, j|     |     |     |

  这时候我们又将主元和 i, j 指向的元素交换
  |   0   |  1  |  2  |  3  |  4  |  5  |
  |:-----:|:---:|:---:|:---:|:---:|:---:|
  |   32  |  20 |  38 |  57 | 124 |  69 |
  |pivot  |     | i, j|     |     |     |
5.
  依次类推，后面每一步的结果为
  |   0   |  1  |  2  |  3  |  4  |  5  |
  |:-----:|:---:|:---:|:---:|:---:|:---:|
  |   32  |  20 |  38 |  57 | 124 |  69 |
  |pivot,i|  j  |     |     |     |     |

  |   0   |  1  |  2  |  3  |  4  |  5  |
  |:-----:|:---:|:---:|:---:|:---:|:---:|
  |   32  |  20 |  38 |  57 | 124 |  69 |
  |pivot  | i, j|     |     |     |     |

  |   0   |  1  |  2  |  3  |  4  |  5  |
  |:-----:|:---:|:---:|:---:|:---:|:---:|
  |   20  |  32 |  38 |  57 | 124 |  69 |
  |pivot  | i, j|     |     |     |     |

  |   0   |  1  |  2            |  3  |  4  |  5  |
  |:-----:|:---:|:-------------:|:---:|:---:|:---:|
  |   20  |  32 |  38           |  57 | 124 |  69 |
  |       |     |  pivot,i ,i   |     |     |     |

  |   0   |  1  |  2  |  3  |  4          |  5  |
  |:-----:|:---:|:---:|:---:|:-----------:|:---:|
  |   20  |  32 |  38 |  57 | 124         |  69 |
  |       |     |     |     |  pivot, i   |  j  |

  |   0   |  1  |  2  |  3  |  4          |  5  |
  |:-----:|:---:|:---:|:---:|:-----------:|:---:|
  |   20  |  32 |  38 |  57 | 124         |  69 |
  |       |     |     |     |  pivot      | i, j|

  |   0   |  1  |  2  |  3  |  4          |  5  |
  |:-----:|:---:|:---:|:---:|:-----------:|:---:|
  |   20  |  32 |  38 |  57 | 69          | 124 |
  |       |     |     |     |  pivot      | i, j|

  到此为止，我们的排序就算完成了

---
下面贴上这个方法的 C 语言代码：

```C
#include <stdio.h>
#define LEN 100 //定义一个数组的长度
void quickSort(int *arr,int left,int right){
  if(left>=right)
    return; //这个情况说明 这个片段中没有需要排的数了,所以直接退出
  int pivot = arr[left];
  int i = left;
  int j = right;
  while(i<j){
    while(i<j&&arr[j]>=pivot)
      j--;//一直移动 j 直到找到一个比主元小的元素
    while(i<j&&arr[i]<=pivot)
      i++;//一直移动 i 直到找到一个比主元大的元素
    if(i<j){
      arr[i] = arr[i]^arr[j];
      arr[j] = arr[i]^arr[j];
      arr[i] = arr[i]^arr[j];
    }//交换i j 指向的元素
  }
  arr[left] = arr[j];
  arr[j] = pivot;
  //如果i和j 相等,while循环便会退出,我们再这里交换 主元 和 i , j 共同指向的元素
  quickSort(arr,left,j-1);//对左边进行排序
  quickSort(arr,j+1,right);//对右边进行排序

}
void main(){
  int arr[LEN];
  for(int i = 0;i<LEN;i++){
    arr[i] =rand()/100;
  }  //生成一些随机数,我懒得想数据了
  quickSort(arr,0,LEN-1);
  for(int i = 0;i<LEN;i++){
    printf("%d ",arr[i] );
  }
}
```

当然啦，懒得写的同学可以直接调用 algorithm 头文件中的 sort（数组起始位置，数组结束位置） 来进行排序

## 连续自然数之和
> 如何求一个自然数等于多个连续自然数之和呢? 例如 10 可以写成 1+2+3+4, 在这里提供两种方法
- 方法一: 优化后的暴力枚举法
优化过程:   
假设 x1+x2+x3+....+xn = s, 其中 s 为给定的自然数  
由等差数列求和公式可得:    
(x1+xn)\*n/2 = s  
=> (x1+xn)(xn-x1+1) = 2s 因为xn-x1+1就是项数  
假设 x1+xn = a, xn-x1+1 = b, 联立解得 xn=(a+b-1)/2    x1 = (a-b+1)/2  
因为 xn 和 x1都为整数,那么 a+b-1 和 a-b+1 都应该为偶数  
那么a+b和a-b都应该为奇数
那么a,b必然一奇一偶
如果s为奇数, 那么 s 可以写成 2\*i+1, 即 i+(i+1), 那么 s 必然能够拆成两个自然数之和  
如果s为偶数, 那么 s 可以写成 2^i\*3^j\*4^k..... 如果 除了 i  之外全部都是0 ,那么s 是2 的幂, 必然不可能出现两个因数一奇一偶的情况  

```c
#include <iostream>
using namespace std;
int main(){
  int n;//给定的数
  cin>>n;
  int sum;
  if(n&(n-1)==0){//如果是2的幂,直接退出
    return 0;
  }
  for(int i = 1;i<n/2;i++){
    sum = 0;
    for(int j = i;i<n/2;j++){
      sum += j;
      if(sum==n){
        cout<<i<<' '<<j<<endl;
      }
      else{
        if(sum>n){
          break;
        }
      }
    }
  }
  return 0;
}
```

- 方法二: 有限制的简化算法
假设 x1+x2+x3+....+xn = s, 其中 s 为给定的自然数  
可知: n\*x1+(1+n-1)(n-1)/2=s  
=> 2n\*x1+n^2-n-2s=0  
=> n^2+(2\*x1-1)n-2s=0  
因为n时连续项数的个数,那么它必然是一个正整数, 根据求根公式:  
Δ = 4\*x1^2+1-4\*x1+8s  
n = ((1-2\*x1)+sqrt(Δ))/2  
因此可以获得d两个约束条件:  
  1. sqrt(Δ)为整数, 因为这样才有可能使得n为整数
  2. ((1-2\*x1)+sqrt(Δ)) 为 偶数
:::danger
因为出现了乘法,当数值较大的时候可能导致溢出范围,这也就是"限制"
:::
```c
#include <math.h>
#include <iostream>
using namespace std;
int main(){
  int n; //n为给定的数
  cin>>n;
  int der;
  int fenzi;
  double temp;
  for(int i = 1;i<n/2;i++){//因为起始数不可能大于n/2, 不然随便一加就超过给定数了
    temp = sqrt(4*i*i+1-4*i+8*n);
    der = (int)temp==temp?temp:0;//判断Δ是否为整数
    if(der!=0){
      fenzi = 1-2*i+der;
      if(fenzi>0&&fenzi%2==0){
        cout<<i<<' '<<i+fenzi/2-1<<endl;
      }
      else{
        continue;
      }
    }
    else{
      continue;
    }
  }
  return 0;
}
```