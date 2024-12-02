### Ex. No: 2.a  
**Date:**  
### **AIM**  
To write a C program to recognize a valid arithmetic expression using `Lex` and `Yacc`.  

---

### **ALGORITHM**  

1. **Start the program.**  
2. **Read the arithmetic expression.**  
3. Validate the expression using `Yacc` based on grammar rules:  
   - Match operators (`+`, `-`, `*`, `/`, `%`), variables, and numbers.  
   - Ensure proper usage of parentheses.  
4. Use the rules to determine the validity of the expression.  
5. **Print the result** as valid or invalid based on the validation.  
6. **Stop the program.**  

---

### **PROGRAM**  

#### **LEX Program (Validarith.l)**  

```c
%{
#include <stdio.h>
#include "Validarith.tab.h"
%}

%%
// Match variables
[a-zA-Z]+      return VARIABLE;

// Match numbers
[0-9]+         return NUMBER;

// Ignore tabs
[\t]           ;

// Handle end of input
[\n]           return 0;

// Match any other character
.              return yytext[0];

%%

int yywrap() {
    return 1; // Indicate end of input
}
```

---

#### **YACC Program (Validarith.y)**  

```c
%{
#include <stdio.h>
#include <stdlib.h>

// Function prototypes
int yylex();
void yyerror(const char *s);
%}

// Token definitions
%token NUMBER
%token VARIABLE

// Operator precedence
%left '+' '-'
%left '*' '/' '%'
%left '(' ')'

%%
// Grammar rules
S: E {
    printf("\nEntered arithmetic expression is valid.\n");
    return 0;
}
;

E: E '+' E
 | E '-' E
 | E '*' E
 | E '/' E
 | E '%' E
 | '(' E ')'
 | NUMBER
 | VARIABLE
;

%%

int main() {
    printf("\nEnter any arithmetic expression: \n");
    yyparse();
    return 0;
}

void yyerror(const char *s) {
    printf("\nEntered arithmetic expression is invalid: %s\n", s);
}
```

---

### **Output**  

#### Input Examples:  
1. **Input:** `(a + b) * 2`  
   **Output:** Entered arithmetic expression is valid.  

2. **Input:** `12 + / 4`  
   **Output:** Entered arithmetic expression is invalid.  

---

### **CONCLUSION**  
Thus, a program to recognize a valid arithmetic expression using `Lex` and `Yacc` was successfully executed.
