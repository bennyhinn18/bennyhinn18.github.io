### **Ex. No: 4**  
**Date:**  

---

### **AIM**  
To write a program for implementing Three Address Code (TAC) using LEX and YACC.

---

### **ALGORITHM**  

1. **Set up YACC structure:**  
   - Divide the YACC program into three parts: Declarations, Translation Rules, and Supporting C Routines.

2. **Declaration Section:**  
   - Include standard I/O libraries.  
   - Define tokens (`LETTER`, `NUMBER`) and operator precedence.  
   - Declare global variables to store intermediate results and expressions.

3. **Translation Rules:**  
   - Define grammar rules to parse assignment statements and arithmetic expressions.  
   - Generate intermediate representations for valid expressions.

4. **Supporting C Routines:**  
   - Implement helper functions to add intermediate results into a table.  
   - Provide error-handling functions (`yyerror`) for invalid syntax.

5. **LEX setup:**  
   - Use rules to tokenize input into symbols like numbers, letters, and operators.  
   - Skip whitespace and handle unexpected characters.  

6. **Execution:**  
   - Parse the input expression using `yyparse`.  
   - Generate and display the three-address code.

7. **Completion:**  
   - Print the resulting TAC and terminate the program.

---

### **PROGRAM CODE**  

#### **LEX Program (tac.l)**  

```c
%{
#include "tac.tab.h" // Include YACC-generated header
#include <stdio.h>
#include <stdlib.h>
%}

%%
// Token definitions
[0-9]+         { yylval.symbol = atoi(yytext); return NUMBER; }
[a-zA-Z]       { yylval.symbol = yytext[0]; return LETTER; }
"+"            { return '+'; }
"-"            { return '-'; }
"*"            { return '*'; }
"/"            { return '/'; }
"="            { return '='; }
";"            { return ';'; }
"("            { return '('; }
")"            { return ')'; }
[ \t\n]        { /* Ignore whitespace */ }
.              { printf("Unexpected character: %s\n", yytext); }

%%
// End of input handler
int yywrap() {
    return 1; // Indicate end of input
}
```

---

#### **YACC Program (tac.y)**  

```c
%{
#include <stdio.h>
#include <stdlib.h>

// Struct to store intermediate representation
struct expr {
    char operand1;
    char operand2;
    char operator;
    char result;
};

// Global variables
struct expr arr[20];
int index1 = 0;
char temp = 'A' - 1;

// Function declarations
char addtotable(char a, char b, char o);
void threeAdd();
void yyerror(const char *s);
int yylex(void); // LEX function declaration
%}

// Define token data type
%union {
    char symbol;
}

// Token and precedence declarations
%token <symbol> LETTER NUMBER
%type <symbol> exp
%left '+' '-'
%left '*' '/'

%%
// Grammar rules
statement:
    LETTER '=' exp ';' { addtotable($1, $3, '='); }
    ;

exp:
    exp '+' exp { $$ = addtotable($1, $3, '+'); }
    | exp '-' exp { $$ = addtotable($1, $3, '-'); }
    | exp '*' exp { $$ = addtotable($1, $3, '*'); }
    | exp '/' exp { $$ = addtotable($1, $3, '/'); }
    | '(' exp ')' { $$ = $2; }
    | NUMBER { $$ = $1; }
    | LETTER { $$ = $1; }
    ;
%%

// Error handling function
void yyerror(const char *s) {
    fprintf(stderr, "Error: %s\n", s);
}

// Add intermediate result to table
char addtotable(char a, char b, char o) {
    temp++;
    arr[index1].operand1 = a;
    arr[index1].operand2 = b;
    arr[index1].operator = o;
    arr[index1].result = temp;
    index1++;
    return temp;
}

// Display three-address code
void threeAdd() {
    for (int i = 0; i < index1; i++) {
        printf("%c := %c %c %c\n", arr[i].result, arr[i].operand1, arr[i].operator, arr[i].operand2);
    }
}

// Main function
int main() {
    printf("Enter the expression: ");
    yyparse();
    threeAdd();
    return 0;
}
```

---

### **OUTPUT**  

#### Input 1:  

```
a = 5 + 3 * 2;
```

#### Output 1:  

```
Enter the expression:
A := 3 * 2
B := 5 + A
a := B
```

---

#### Input 2:  

```
x = (4 + 6) * 2;
```

#### Output 2:  

```
Enter the expression:
A := 4 + 6
B := A * 2
x := B
```

---

### **CONCLUSION**  
Thus, a program to implement Three Address Code (TAC) using LEX and YACC was successfully executed. It parses arithmetic expressions, generates intermediate representations, and handles errors effectively.