### **Ex. No: 3.b**  
**Date:**  

### **AIM**  
To write a program for implementing a calculator that computes given expressions using semantic rules of the `YACC` and `LEX` tools.  

---

### **ALGORITHM**  

1. **Start the program.**  
2. Include necessary header files for token definitions and semantic analysis.  
3. Define a function to handle and print error messages.  
4. Read input expressions from the user.  
5. Parse the input to check if it is a valid arithmetic expression.  
6. Implement separate operations for addition, subtraction, multiplication, and division using YACC grammar rules.  
7. Validate and evaluate parentheses to handle expression precedence.  
8. Provide error messages for invalid inputs or unsupported operations.  
9. Compute and print the output of valid expressions.  
10. Terminate the program.  

---

### **PROGRAM CODE**  

#### **LEX Program (Calc.l)**  

```c
%{
#include "calc.tab.h" // Include YACC-generated header for token definitions
%}

%%
// Define tokens for numbers, operators, and parentheses
[0-9]+         { yylval = atoi(yytext); return NUMBER; }
[ \t]+         { /* Ignore whitespace */ }
"+"            { return PLUS; }
"-"            { return MINUS; }
"*"            { return MULT; }
"/"            { return DIV; }
"("            { return LPAREN; }
")"            { return RPAREN; }
\n             { return '\n'; } // Recognize newline as a token
.              { printf("Unexpected character: %s\n", yytext); }
<<EOF>>        { return 0; }
```

---

#### **YACC Program (Calc.y)**  

```c
%{
#include <stdio.h>
#include <stdlib.h>

// Error handling function
void yyerror(const char *s);
int yylex();
%}

// Define tokens
%token NUMBER
%token PLUS MINUS MULT DIV LPAREN RPAREN

// Operator precedence
%left PLUS MINUS
%left MULT DIV

%%

// Grammar rules
input:
    /* empty */
    | input line
    ;

line:
    '\n'
    | expression '\n' { printf("Result: %d\n", $1); }
    ;

expression:
    NUMBER              { $$ = $1; }
    | expression PLUS expression   { $$ = $1 + $3; }
    | expression MINUS expression  { $$ = $1 - $3; }
    | expression MULT expression   { $$ = $1 * $3; }
    | expression DIV expression    { 
        if ($3 == 0) {
            yyerror("Division by zero");
            $$ = 0; 
        } else {
            $$ = $1 / $3; 
        }
    }
    | LPAREN expression RPAREN     { $$ = $2; }
    ;

%%

// Main function
int main(void) {
    printf("Enter expressions to calculate (Ctrl+C to exit):\n");
    yyparse();
    return 0;
}

// Error handling function
void yyerror(const char *s) {
    fprintf(stderr, "Error: %s\n", s);
}
```

---

### **OUTPUT**  

#### Input and Output Examples:  

1. **Input:**  
   ```
   5 + 3 * 2
   ```  
   **Output:**  
   ```
   Result: 11
   ```

2. **Input:**  
   ```
   (10 + 20) / 2
   ```  
   **Output:**  
   ```
   Result: 15
   ```

3. **Input:**  
   ```
   15 / 0
   ```  
   **Output:**  
   ```
   Error: Division by zero
   Result: 0
   ```

4. **Input:**  
   ```
   5 + a
   ```  
   **Output:**  
   ```
   Unexpected character: a
   Error: syntax error
   ```

---

### **CONCLUSION**  
Thus, a program to implement a calculator using `LEX` and `YACC` was successfully executed. It validates input expressions, evaluates results based on operator precedence, and handles errors effectively.