### **Experiment: Implementing Reverse Address Resolution Protocol (RARP) in Java**

---

### **AIM**  
To write a Java program to implement the Reverse Address Resolution Protocol (RARP) to resolve a MAC address to its corresponding IP address.

---

### **Objectives**  
Reverse Address Resolution Protocol (RARP) allows a physical machine in a local area network to request and learn its IP address from a gateway server's ARP table or cache.

---

### **Algorithm**

#### **Client**  
1. Start the program.  
2. Establish a socket connection to the server.  
3. Get the MAC address (physical address) from the user.  
4. Send this MAC address to the server.  
5. Receive the corresponding IP address from the server.  
6. Display the IP address.  
7. Close the socket.  

---

#### **Server**  
1. Start the program.  
2. Wait for a connection from the client.  
3. Maintain a table mapping MAC addresses to IP addresses.  
4. Read the MAC address sent by the client.  
5. Search for the corresponding IP address in the table.  
6. Send the IP address back to the client.  
7. Repeat for subsequent requests.  
8. Close the socket when done.  

---

### **Program**

#### **RARP Client (`Clientrarp.java`)**
```java
import java.io.*;
import java.net.*;

class Clientrarp {
    public static void main(String args[]) {
        try {
            BufferedReader in = new BufferedReader(new InputStreamReader(System.in));
            Socket clientSocket = new Socket("127.0.0.1", 139);
            DataInputStream din = new DataInputStream(clientSocket.getInputStream());
            DataOutputStream dout = new DataOutputStream(clientSocket.getOutputStream());

            System.out.println("Enter the Physical Address (MAC):");
            String macAddress = in.readLine();
            dout.writeBytes(macAddress + '\n');

            String ipAddress = din.readLine();
            System.out.println("The Logical Address (IP) is: " + ipAddress);

            clientSocket.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
```

---

#### **RARP Server (`Serverrarp.java`)**
```java
import java.io.*;
import java.net.*;

class Serverrarp {
    public static void main(String args[]) {
        try {
            ServerSocket serverSocket = new ServerSocket(139);
            System.out.println("Server is running... Waiting for client requests...");
            Socket clientSocket = serverSocket.accept();
            System.out.println("Connection established with client.");

            String[] ipAddresses = { "165.165.80.80", "165.165.79.1" };
            String[] macAddresses = { "6A:08:AA:C2", "8A:BC:E3:FA" };

            while (true) {
                DataInputStream din = new DataInputStream(clientSocket.getInputStream());
                DataOutputStream dout = new DataOutputStream(clientSocket.getOutputStream());

                String clientRequest = din.readLine();
                System.out.println("Received MAC address: " + clientRequest);

                boolean found = false;
                for (int i = 0; i < macAddresses.length; i++) {
                    if (clientRequest.equals(macAddresses[i])) {
                        dout.writeBytes(ipAddresses[i] + '\n');
                        found = true;
                        System.out.println("Resolved to IP: " + ipAddresses[i]);
                        break;
                    }
                }

                if (!found) {
                    dout.writeBytes("IP Address not found\n");
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
```

---

### **Sample Output**

#### **Server Output**
```plaintext
Server is running... Waiting for client requests...
Connection established with client.
Received MAC address: 6A:08:AA:C2
Resolved to IP: 165.165.80.80
```

#### **Client Output**
```plaintext
Enter the Physical Address (MAC):
6A:08:AA:C2
The Logical Address (IP) is: 165.165.80.80
```

---

### **Result**  
Thus, the IP address was successfully retrieved for the given MAC address using the Reverse Address Resolution Protocol (RARP) simulation in Java.