### **Ex. No: 5**  
**Date:**  

---

### **AIM**  
To write a C program to implement type checking.  

---

### **ALGORITHM**  

1. **Input Variables and Types:**  
   - Take the number of variables as input.  
   - For each variable, input the variable name and its type (`float` as `f` or `int` as `i`).  

2. **Input Expression:**  
   - Take an expression as input, ending with the `$` character.  

3. **Detect Division Operation:**  
   - Scan the expression for division (`/`).  
   - If a division is found, flag the need for a `float` type.  

4. **Check Type Validity:**  
   - Match the variable used in the expression with the declared type.  
   - If the variable is involved in division and is not `float`, report a semantic error.  
   - If all types are valid, confirm correct datatype usage.  

5. **Output Results:**  
   - Display appropriate messages for correct datatype or type mismatch.  

---

### **PROGRAM**  

```c
#include <stdio.h>
#include <stdlib.h>

int main() {
    int n, i, k, flag = 0; // Flag to check if a float type is required
    char vari[15], typ[15], b[15], c;

    // Input the number of variables
    printf("Enter the number of variables: ");
    scanf(" %d", &n);

    // Input variable names and their types
    for (i = 0; i < n; i++) {
        printf("Enter the variable[%d]: ", i);
        scanf(" %c", &vari[i]);
        printf("Enter the variable-type[%d] (float-f, int-i): ", i);
        scanf(" %c", &typ[i]);
        if (typ[i] == 'f') {
            flag = 1; // Track if a float variable is declared
        }
    }

    // Input the expression
    printf("Enter the Expression (end with $): ");
    i = 0;
    getchar(); // Consume the newline character
    while ((c = getchar()) != '$') {
        b[i] = c;
        i++;
    }
    k = i;

    // Check if the expression contains division
    for (i = 0; i < k; i++) {
        if (b[i] == '/') {
            flag = 1; // Division requires float type
            break;
        }
    }

    // Validate the datatype of the first variable in the expression
    for (i = 0; i < n; i++) {
        if (b[0] == vari[i]) { // Match the first variable with declared variables
            if (flag == 1) { // If division is present
                if (typ[i] == 'f') { // Correct datatype
                    printf("\nThe datatype is correctly defined..!\n");
                } else { // Mismatch
                    printf("Identifier %c must be a float type..!\n", vari[i]);
                }
            } else { // If division is not present
                printf("\nThe datatype is correctly defined..!\n");
            }
            break;
        }
    }

    return 0;
}
```

---

### **OUTPUT**  

#### **Example 1:**  

**Input:**  
```
Enter the number of variables: 2  
Enter the variable[0]: a  
Enter the variable-type[0] (float-f, int-i): i  
Enter the variable[1]: b  
Enter the variable-type[1] (float-f, int-i): f  
Enter the Expression (end with $): a / b $
```

**Output:**  
```
Identifier a must be a float type..!
```

---

#### **Example 2:**  

**Input:**  
```
Enter the number of variables: 2  
Enter the variable[0]: x  
Enter the variable-type[0] (float-f, int-i): f  
Enter the variable[1]: y  
Enter the variable-type[1] (float-f, int-i): i  
Enter the Expression (end with $): x + y $
```

**Output:**  
```
The datatype is correctly defined..!
```

---

### **CONCLUSION**  
Thus, a program to implement type checking was successfully executed. It validates type compatibility for operations like division and reports semantic errors for type mismatches.