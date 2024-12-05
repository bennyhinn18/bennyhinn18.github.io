Here's a reformatted and better-structured version of your lab exercise for improved readability:

---

### **Experiment No: 2**  
**Title:** Download a Web Page Using TCP Sockets  

---

### **AIM**  
To write an HTTP web client program in Java to download a web page using TCP sockets.

---

### **Problem Statement**  
Develop a client program to:  
1. Get the file name (URL) from the user.  
2. Connect to an HTTP server to resolve the file and display its contents.  

---

### **Concept**  
The Hypertext Transfer Protocol (HTTP) is a protocol primarily used to access data on the World Wide Web (WWW).  

1. HTTP functions as a combination of FTP (File Transfer Protocol) and SMTP (Simple Mail Transfer Protocol).  
2. Unlike SMTP, which stores and forwards messages, HTTP delivers messages immediately.  
3. HTTP communication consists of **request messages** from the client and **response messages** from the server.  

---

### **Algorithm**  
1. **Set a Server Port:** Use port `80` (default HTTP port).  
2. **Establish a Socket Connection:** Create a socket to connect the client with the server using the specified port.  
3. **Send HTTP Request:** Use output streams to send an HTTP GET request to the server.  
4. **Retrieve Response:** Use input streams to read the server's response and display the web page content.  
5. **Handle Exceptions:** Use `MalformedURLException` and `IOException` to handle errors during communication.  
6. **Close Connection:** Once the request is serviced, close the connection.

---

### **Program**  
```java
import java.io.*;
import java.net.*;

public class SocketHTTPClient {
    public static void main(String[] args) {
        // Hostname of the server to connect
        String hostName = "www.gmail.com";
        int portNumber = 80; // HTTP default port

        try {
            // Establish a connection to the server
            Socket socket = new Socket(hostName, portNumber);

            // Output stream to send a request to the server
            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

            // Input stream to read the server's response
            BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            // Send HTTP GET request
            out.println("GET / HTTP/1.1\nHost: www.gmail.com\n\n");

            // Print the server's response
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println(inputLine);
            }

            // Close the socket
            socket.close();
        } catch (UnknownHostException e) {
            System.err.println("Unknown host: " + hostName);
            System.exit(1);
        } catch (IOException e) {
            System.err.println("I/O error with host: " + hostName);
            System.exit(1);
        }
    }
}
```

---

### **Sample Output**  
The response would display the HTML content of the Gmail homepage:  
```html
HTTP/1.1 200 OK
Content-Type: text/html; charset=UTF-8
...

<!doctype html>
<html>
    <head>
        <title>Gmail</title>
        ...
    </head>
    <body>
        ...
    </body>
</html>
```

---

### **Conclusion**  
Thus, the program for creating a socket to download a web page using TCP was successfully implemented and executed.

---