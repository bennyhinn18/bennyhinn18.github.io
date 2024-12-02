Here's a clear representation of **Ex. No. 7: Implementing the Back End of the Compiler**, designed to translate intermediate code into assembly-like instructions using the provided program.

---

### **Code Breakdown**

#### **Aim**
To implement the back end of a compiler that converts three-address intermediate code into 8086 assembly instructions.

#### **Algorithm**
1. **Start the program.**
2. **Include the necessary header files** (`stdio.h` and `string.h`).
3. Declare an array to store intermediate code and necessary variables.
4. **Input the intermediate code**, terminated by the keyword `exit`.
5. Use **switch-case logic** to determine the corresponding assembly instruction for each operator (`+`, `-`, `*`, `/`).
6. Generate target assembly code for each input intermediate instruction.
7. Print the output.
8. **End the program.**

---

### **C Program Code**

```c
#include <stdio.h>
#include <string.h>

void main() {
    char icode[10][30], str[20], opr[10];
    int i = 0;

    printf("\nEnter the set of intermediate code (terminated by 'exit'):\n");
    do {
        scanf("%s", icode[i]);
    } while (strcmp(icode[i++], "exit") != 0);

    printf("\nTarget Code Generation");
    printf("\n************************\n");
    i = 0;
    do {
        strcpy(str, icode[i]);

        // Determine the operation
        switch (str[3]) {
            case '+':
                strcpy(opr, "ADD");
                break;
            case '-':
                strcpy(opr, "SUB");
                break;
            case '*':
                strcpy(opr, "MUL");
                break;
            case '/':
                strcpy(opr, "DIV");
                break;
            default:
                printf("\nInvalid operator detected.");
                continue;
        }

        // Generate assembly-like instructions
        printf("\n\tMov %c, R%d", str[2], i);
        printf("\n\t%s %c, R%d", opr, str[4], i);
        printf("\n\tMov R%d, %c", i, str[0]);
    } while (strcmp(icode[++i], "exit") != 0);
}
```

---

### **Sample Input and Output**

#### **Input**
```
a=b+c
d=a-b
exit
```

#### **Output**
```
Enter the set of intermediate code (terminated by 'exit'):
a=b+c
d=a-b
exit

Target Code Generation
************************

	Mov b, R0
	ADD c, R0
	Mov R0, a

	Mov a, R1
	SUB b, R1
	Mov R1, d
```

---

### **Explanation**
1. **Input Processing**: The intermediate code is entered line by line. When `exit` is encountered, the input stops.
2. **Switch Logic**: The third character of each string (operator) is analyzed:
   - `+` → `ADD`
   - `-` → `SUB`
   - `*` → `MUL`
   - `/` → `DIV`
3. **Assembly Translation**:
   - The operands are moved to registers (`R0`, `R1`).
   - The operation is performed between operands.
   - The result is stored in the destination variable.

---

### **Conclusion**
The program successfully implements a basic backend compiler that translates three-address intermediate code into equivalent 8086 assembly instructions.