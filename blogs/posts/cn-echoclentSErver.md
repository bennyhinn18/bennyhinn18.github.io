### **Experiment: TCP Echo Client-Server**

---

### **AIM**  
To write a Java program to implement a TCP Echo Client-Server system.

---

### **Algorithm**  
#### **Server**
1. **Start**: Begin the server program.  
2. **Declare Variables**: Define variables for the server socket and client socket.  
3. **Specify Configuration**: Set the IP address, port, and protocol.  
4. **Create Socket**: Use the `ServerSocket` class to create a server socket.  
5. **Bind**: Bind the socket to the IP address and port.  
6. **Listen and Accept**: Wait for and accept a connection request from the client.  
7. **Read Client's Message**: Receive the message sent by the client.  
8. **Display Message**: Print the received message to the console.  
9. **Echo Back**: Send the same message back to the client.  
10. **Close Socket**: Close the socket after communication.  
11. **Stop**: End the program.

---

#### **Client**
1. **Start**: Begin the client program.  
2. **Declare Variables**: Define variables for the client socket.  
3. **Specify Configuration**: Set the IP address, port, and protocol.  
4. **Create Socket**: Use the `Socket` class to create a client socket.  
5. **Connect**: Connect to the server using the IP address and port.  
6. **Read Input**: Take input from the user for the message to send.  
7. **Send Message**: Send the input message to the server.  
8. **Receive Echo**: Receive the echoed message from the server.  
9. **Display Echo**: Print the echoed message.  
10. **Close Socket**: Close the socket after communication.  
11. **Stop**: End the program.

---

### **Program**

#### **Server Program**
```java
import java.io.*;
import java.net.*;

class echos {
    public static void main(String args[]) throws Exception {
        try {
            // Create server socket and wait for client connection
            ServerSocket ss = new ServerSocket(2100);
            System.out.println("Server started and waiting for client...");
            Socket s = ss.accept();
            System.out.println("Client connected.");

            // Input and output streams
            DataInputStream in = new DataInputStream(s.getInputStream());
            DataOutputStream out = new DataOutputStream(s.getOutputStream());

            // Read message from client
            String msg = in.readUTF();
            System.out.println("Message from client: " + msg);

            // Echo the message back to the client
            out.writeUTF(msg);

            // Close the socket
            s.close();
            ss.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

#### **Client Program**
```java
import java.io.*;
import java.net.*;

class echoc {
    public static void main(String args[]) throws Exception {
        try {
            // Connect to the server
            Socket s = new Socket(InetAddress.getLocalHost(), 2100);
            System.out.println("Connected to the server.");

            // Input and output streams
            DataInputStream in = new DataInputStream(s.getInputStream());
            DataOutputStream out = new DataOutputStream(s.getOutputStream());
            BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

            // Read message from the user
            System.out.println("Enter the message:");
            String msg1 = br.readLine();

            // Send the message to the server
            out.writeUTF(msg1);

            // Receive and print the echoed message
            String msg2 = in.readUTF();
            System.out.println("Echoed message from server: " + msg2);

            // Close the socket
            s.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

---

### **Output**

#### **Server Output**
```plaintext
Server started and waiting for client...
Client connected.
Message from client: Hello, Server!
```

#### **Client Output**
```plaintext
Connected to the server.
Enter the message:
Hello, Server!
Echoed message from server: Hello, Server!
```

---

### **Result**  
Thus, the program for a TCP Echo Client-Server communication system was successfully implemented and tested.