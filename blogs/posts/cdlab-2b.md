### **Ex. No: 2.b**  
**Date:**  
### **AIM**  
To write a `Yacc` program to recognize a valid variable name that starts with a letter and is followed by any number of letters or digits.  

---

### **ALGORITHM**  

1. **Start the program.**  
2. **Read an expression.**  
3. Validate the expression according to the rules:  
   - A valid variable must start with a letter (`a-z`, `A-Z`).  
   - It can then contain any number of letters or digits (`a-z`, `A-Z`, `0-9`).  
4. Use `Yacc` rules to check if the variable is valid or invalid.  
5. **Print the result** indicating whether the variable is valid.  
6. **Stop the program.**  

---

### **PROGRAM CODE**  

#### **LEX Program (Valid_identifier.l)**  

```c
%{
#include "valid_identifier.tab.h"
%}

%%
// Match valid identifiers
[a-zA-Z][a-zA-Z0-9]*   { return IDENTIFIER; }

// Handle invalid characters
.                      { return 0; }

%%

int yywrap() {
    return 1; // Indicate end of input
}
```

---

#### **YACC Program (Valid_identifier.y)**  

```c
%{
#include <stdio.h>
#include <ctype.h>

// Declaration of yylex function
int yylex(void);

// Declaration of yyerror function
int yyerror(const char *s);
%}

// Token definitions
%token IDENTIFIER

%%
// Grammar rules
start:
    identifier_check
;

identifier_check:
    IDENTIFIER { printf("It is a valid identifier!\n"); }
    | /* Error handling for invalid input */
    { printf("It is not a valid identifier!\n"); }
;

%%

int yyerror(const char *s) {
    printf("It is not a valid identifier!\n");
    return 0;
}

int main() {
    printf("Enter a name to be tested for identifier: ");
    yyparse();
    return 0;
}
```

---

### **Output**  

#### Input Examples:  
1. **Input:** `var123`  
   **Output:** It is a valid identifier!  

2. **Input:** `123var`  
   **Output:** It is not a valid identifier!  

3. **Input:** `!invalid`  
   **Output:** It is not a valid identifier!  

---

### **CONCLUSION**  
Thus, a program to check if a variable name is valid, starting with a letter and followed by letters or digits, was successfully executed.