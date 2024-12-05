### **Experiment: TCP Chat Application**

---

### **AIM**  
To implement a chat application where the client establishes a connection with the server, and both can send and receive messages simultaneously.

---

### **Algorithm**  
#### **Server**  
1. **Start**: Initialize the server program.  
2. **Create Server and Client Sockets**: Use `ServerSocket` to listen for incoming client connections.  
3. **Initialize Streams**: Set up input and output streams to exchange messages.  
4. **Read and Write**: Continuously read messages from the client and send responses.  
5. **Terminate**: End the session when the client sends an "end" message.  
6. **Close Connections**: Properly close sockets and streams.  

---

#### **Client**  
1. **Start**: Initialize the client program.  
2. **Create Socket**: Establish a connection to the server using its IP address and port.  
3. **Initialize Streams**: Set up input and output streams to exchange messages.  
4. **Read and Write**: Continuously read messages from the server and send responses.  
5. **Terminate**: End the session by sending an "end" message.  
6. **Close Connections**: Properly close sockets and streams.  

---

### **Program**

#### **TCP Chat Server (`tcpchatserver.java`)**
```java
import java.io.*;
import java.net.*;

class tcpchatserver {
    public static void main(String args[]) throws Exception {
        PrintWriter toClient;
        BufferedReader fromUser, fromClient;

        try {
            ServerSocket serverSocket = new ServerSocket(5555);
            System.out.println("\nServer started");
            Socket clientSocket = serverSocket.accept();
            System.out.println("Client connected");

            toClient = new PrintWriter(new BufferedWriter(new OutputStreamWriter(clientSocket.getOutputStream())), true);
            fromClient = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            fromUser = new BufferedReader(new InputStreamReader(System.in));

            String clientMessage, serverMessage;
            while (true) {
                clientMessage = fromClient.readLine();
                if (clientMessage.equals("end"))
                    break;
                else {
                    System.out.println("\nServer <<< " + clientMessage);
                    System.out.print("Message to Client: ");
                    serverMessage = fromUser.readLine();
                    toClient.println(serverMessage);
                }
            }
            System.out.println("\nClient Disconnected");
            fromClient.close();
            toClient.close();
            fromUser.close();
            clientSocket.close();
            serverSocket.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```

---

#### **TCP Chat Client (`tcpchatclient.java`)**
```java
import java.io.*;
import java.net.*;

class tcpchatclient {
    public static void main(String args[]) throws Exception {
        Socket clientSocket;
        PrintWriter toServer;
        BufferedReader fromUser, fromServer;

        try {
            if (args.length > 1) {
                System.out.println("Usage: java tcpchatclient <hostipaddr>");
                System.exit(-1);
            }

            if (args.length == 0)
                clientSocket = new Socket(InetAddress.getLocalHost(), 5555);
            else
                clientSocket = new Socket(InetAddress.getByName(args[0]), 5555);

            toServer = new PrintWriter(new BufferedWriter(new OutputStreamWriter(clientSocket.getOutputStream())), true);
            fromServer = new BufferedReader(new InputStreamReader(clientSocket.getInputStream()));
            fromUser = new BufferedReader(new InputStreamReader(System.in));

            String clientMessage, serverMessage;
            System.out.println("Type \"end\" to Quit");

            while (true) {
                System.out.print("\nMessage to Server: ");
                clientMessage = fromUser.readLine();
                toServer.println(clientMessage);
                if (clientMessage.equals("end"))
                    break;

                serverMessage = fromServer.readLine();
                System.out.println("Client <<< " + serverMessage);
            }

            fromServer.close();
            toServer.close();
            fromUser.close();
            clientSocket.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }
}
```

---

### **Output**

#### **Server Output**
```plaintext
Server started
Client connected

Server <<< Hello, Server!
Message to Client: Hi, Client!

Server <<< How are you?
Message to Client: I'm good. How about you?

Server <<< end
Client Disconnected
```

#### **Client Output**
```plaintext
Type "end" to Quit

Message to Server: Hello, Server!
Client <<< Hi, Client!

Message to Server: How are you?
Client <<< I'm good. How about you?

Message to Server: end
```

---

### **Result**  
The TCP chat application was successfully implemented, allowing the server and client to exchange messages in real-time.