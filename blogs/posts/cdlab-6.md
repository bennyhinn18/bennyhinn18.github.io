### **Ex. No: 6**  
**Date:**  

---

### **AIM**  
To write C programs to implement simple code optimization techniques, including:  
1. **Dead Code Elimination**  
2. **Loop-Invariant Code Motion**  
3. **Strength Reduction**

---

### **a) Dead Code Elimination**  

**ALGORITHM:**  
1. Start the program.  
2. Input the intermediate code with left-hand (`L`) and right-hand (`R`) values.  
3. Display the intermediate code.  
4. Remove redundant or dead code by eliminating unused or unnecessary assignments.  
5. Identify and eliminate common subexpressions.  
6. Display the optimized code.  
7. End the program.  

---

**PROGRAM:**  

```c
#include <stdio.h>
#include <string.h>

struct op {
    char l;
    char r[20];
} op[10], pr[10];

int main() {
    int n, i, k, z = 0, m, j;
    char *p, temp, t;

    // Input the number of statements
    printf("Enter the Number of Values: ");
    scanf("%d", &n);

    // Input intermediate code
    for (i = 0; i < n; i++) {
        printf("Left: ");
        scanf(" %c", &op[i].l);
        printf("\tRight: ");
        scanf("%s", op[i].r);
    }

    // Display intermediate code
    printf("\nIntermediate Code\n");
    for (i = 0; i < n; i++) {
        printf("%c = %s\n", op[i].l, op[i].r);
    }

    // Dead code elimination
    for (i = 0; i < n - 1; i++) {
        temp = op[i].l;
        for (j = 0; j < n; j++) {
            p = strchr(op[j].r, temp);
            if (p) {
                pr[z].l = op[i].l;
                strcpy(pr[z].r, op[i].r);
                z++;
            }
        }
    }

    pr[z].l = op[n - 1].l;
    strcpy(pr[z].r, op[n - 1].r);
    z++;

    // Display code after dead code elimination
    printf("\nAfter Dead Code Elimination\n");
    for (k = 0; k < z; k++) {
        printf("%c = %s\n", pr[k].l, pr[k].r);
    }

    // Eliminate common subexpressions
    for (i = 0; i < z; i++) {
        for (j = i + 1; j < z; j++) {
            if (strcmp(pr[i].r, pr[j].r) == 0) {
                t = pr[j].l;
                pr[j].l = pr[i].l;
                for (k = 0; k < z; k++) {
                    p = strchr(pr[k].r, t);
                    if (p) {
                        int pos = p - pr[k].r;
                        pr[k].r[pos] = pr[i].l;
                    }
                }
            }
        }
    }

    // Display optimized code
    printf("\nOptimized Code\n");
    for (i = 0; i < z; i++) {
        printf("%c = %s\n", pr[i].l, pr[i].r);
    }

    return 0;
}
```

---

### **b) Loop-Invariant Code Motion**  

**ALGORITHM:**  
1. Start the program.  
2. Create a loop with operations inside the loop body.  
3. Identify expressions that do not change during loop iterations.  
4. Move such expressions outside the loop.  
5. Compare the outputs before and after optimization.  
6. End the program.  

---

**PROGRAM:**  

```c
#include <stdio.h>
#define MAX 6

int main() {
    int n = 1, s = 0;

    printf("Output without Code Movement Technique:\n");
    while (n <= MAX - 1) {
        s = s + n; // Sum calculated in each iteration
        n++;
    }
    printf("Sum of First 5 Numbers: %d\n", s);

    printf("Output with Code Movement Technique:\n");
    int constant = MAX - 1; // Move invariant calculation outside loop
    s = constant * (constant + 1) / 2;
    printf("Sum of First 5 Numbers: %d\n", s);

    return 0;
}
```

---

### **c) Strength Reduction**  

**ALGORITHM:**  
1. Start the program.  
2. Use a loop to perform an expensive operation, such as multiplication.  
3. Replace the expensive operation with a less costly equivalent operation.  
4. Compare the outputs before and after optimization.  
5. End the program.  

---

**PROGRAM:**  

```c
#include <stdio.h>

int main() {
    int i, s;

    // Without Strength Reduction
    printf("Output without Strength Reduction:\n");
    for (i = 1; i <= 10; i++) {
        s = i * 2; // Multiplication
        printf("%d ", s);
    }

    // With Strength Reduction
    printf("\nOutput with Strength Reduction:\n");
    int result = 0; // Start from 0
    for (i = 1; i <= 10; i++) {
        result += 2; // Replace multiplication with addition
        printf("%d ", result);
    }

    return 0;
}
```

---

### **OUTPUT**  

#### **a) Dead Code Elimination**  
**Input:**  
```
Intermediate Code:  
a = b + c  
d = a + e  
f = d + g  
```
**Output:**  
```
Optimized Code:  
a = b + c  
d = a + e  
f = d + g  
```

---

#### **b) Loop-Invariant Code Motion**  
**Without Optimization:**  
```
Sum of First 5 Numbers: 15  
```
**With Optimization:**  
```
Sum of First 5 Numbers: 15  
```

---

#### **c) Strength Reduction**  
**Without Optimization:**  
```
2 4 6 8 10 12 14 16 18 20  
```
**With Optimization:**  
```
2 4 6 8 10 12 14 16 18 20  
```

---

### **CONCLUSION**  
Thus, the programs to implement simple code optimization techniques like dead code elimination, loop-invariant code motion, and strength reduction were successfully executed.