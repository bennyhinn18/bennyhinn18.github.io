### **Ex. No: 3.a**  
**Date:**  
### **AIM**  
To write a `Yacc` program to recognize a `while` loop.  

---

### **ALGORITHM**  

1. **Start the program.**  
2. **Read the input expression** to identify a `while` loop structure.  
3. **Validate the syntax** of the `while` loop using `Yacc` rules.  
4. If the loop matches the grammar rules, **print a success message**.  
5. If the loop is invalid, display an **error message**.  
6. **Stop the program.**  

---

### **PROGRAM CODE**  

#### **LEX Program (wh.l)**  

```c
%{
#include "wh.tab.h" 
%}
%option noyywrap 
%option nounput 

%%
// Match tokens for while loop
"while"         { return WHILE; }
"("             { return LPAREN; }
")"             { return RPAREN; }
"{"             { return LBRACE; }
"}"             { return RBRACE; }
"="             { return ASSIGN; }
"<"             { return LT; }
">"             { return GT; }
"=="            { return EQ; }
"+"             { return PLUS; }
"-"             { return MINUS; }
"*"             { return MULT; }
"/"             { return DIV; }
";"             { return ';'; }  // Allow semicolon without error
[0-9]+          { yylval = atoi(yytext); return NUMBER; }
[a-zA-Z][a-zA-Z0-9]* { return IDENTIFIER; }
[ \t\n]+        { /* Skip whitespace */ }
.               { printf("Unexpected character: %s\n", yytext); return yytext[0]; }
<<EOF>>         { return 0; }
```

---

#### **YACC Program (wh.y)**  

```c
%{
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function prototypes
void yyerror(const char *s);
int yylex(void);
%}

/* Define tokens */
%token WHILE LPAREN RPAREN LBRACE RBRACE SEMICOLON IDENTIFIER NUMBER
%token ASSIGN LT GT EQ PLUS MINUS MULT DIV

// Precedence rules
%left PLUS MINUS
%left MULT DIV
%left LT GT EQ
%right ASSIGN

%%
// Grammar rules
program:
    statement
;

statement:
    WHILE LPAREN condition RPAREN LBRACE statements RBRACE
    {
        printf("Valid 'while' loop recognized.\n");
    }
;

statements:
    statement
    | assignment ';'
    | statements statement
    | /* empty */
;

assignment:
    IDENTIFIER ASSIGN expression
;

condition:
    expression LT expression
    | expression GT expression
    | expression EQ expression
;

expression:
    IDENTIFIER 
    | NUMBER
    | expression PLUS expression
    | expression MINUS expression
    | expression MULT expression
    | expression DIV expression
;

%%

// Error handling
void yyerror(const char *s) {
    fprintf(stderr, "Error: %s\n", s);
}

int main(void) {
    printf("Enter a 'while' loop to check:\n");
    yyparse();
    return 0;
}
```

---

### **OUTPUT**  

#### Input Examples:  

1. **Input:**  
```c
while (x < 10) {
    x = x + 1;
}
```  
**Output:**  
```
Valid 'while' loop recognized.
```

2. **Input:**  
```c
while (x 10) {
    x = x + 1;
}
```  
**Output:**  
```
Error: syntax error
```

---

### **CONCLUSION**  
Thus, a program to recognize a `while` loop was successfully executed. It validates the loop's structure based on grammar rules and provides feedback on the input's validity.