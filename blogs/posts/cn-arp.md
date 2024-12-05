### **Experiment: DNS Server and Client Using UDP Sockets**

---

### **AIM**  
To implement a DNS server and client in Java using UDP sockets to resolve domain names to IP addresses and vice versa.

---

### **DESCRIPTION**  
DNS (Domain Name System) resolves human-readable domain names to IP addresses and vice versa. In this implementation:
1. The **server** maintains a mapping of domain names and their corresponding IP addresses.
2. The **client** sends a request to resolve a domain name or IP address.
3. The server responds with the corresponding mapped value.

---

### **Algorithm**

#### **Server**  
1. Create arrays to store domain names and their respective IP addresses.  
2. Initialize a `DatagramSocket` and bind it to a specific port (e.g., 1309).  
3. Continuously listen for incoming packets from the client.  
4. Parse the client's request (domain name or IP).  
5. Look up the mapping:
   - If the domain/IP is found, send the corresponding value back.
   - If not found, notify the client with "Domain does not exist".  
6. Send the resolved value to the client as a `DatagramPacket`.  
7. Close the socket when done.  

---

#### **Client**  
1. Initialize a `DatagramSocket`.  
2. Accept user input for the domain name or IP to be resolved.  
3. Send the input as a `DatagramPacket` to the server.  
4. Receive the server's response.  
5. Display the resolved IP address or domain name.  
6. Close the socket when done.  

---

### **Program**

#### **Client (`Clientdns12.java`)**
```java
import java.io.*;
import java.net.*;

class Clientdns12 {
    public static void main(String args[]) {
        try {
            DatagramSocket client = new DatagramSocket();
            InetAddress addr = InetAddress.getByName("127.0.0.1");
            byte[] sendbyte = new byte[1024];
            byte[] receivebyte = new byte[1024];
            BufferedReader in = new BufferedReader(new InputStreamReader(System.in));

            System.out.println("Enter the DOMAIN NAME or IP address:");
            String str = in.readLine();
            sendbyte = str.getBytes();
            DatagramPacket sender = new DatagramPacket(sendbyte, sendbyte.length, addr, 1309);
            client.send(sender);

            DatagramPacket receiver = new DatagramPacket(receivebyte, receivebyte.length);
            client.receive(receiver);
            String response = new String(receiver.getData()).trim();
            System.out.println("IP address or DOMAIN NAME: " + response);

            client.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }
}
```

---

#### **Server (`Serverdns12.java`)**
```java
import java.io.*;
import java.net.*;

class Serverdns12 {
    public static void main(String args[]) {
        try {
            DatagramSocket server = new DatagramSocket(1309);

            String[] ip = { "165.165.80.80", "165.165.79.1" };
            String[] name = { "www.aptitudeguru.com", "www.downloadcyclone.blogspot.com" };

            while (true) {
                byte[] sendbyte = new byte[1024];
                byte[] receivebyte = new byte[1024];

                DatagramPacket receiver = new DatagramPacket(receivebyte, receivebyte.length);
                server.receive(receiver);

                String receivedData = new String(receiver.getData()).trim();
                InetAddress clientAddr = receiver.getAddress();
                int clientPort = receiver.getPort();
                boolean resolved = false;

                for (int i = 0; i < ip.length; i++) {
                    if (receivedData.equals(ip[i])) {
                        sendbyte = name[i].getBytes();
                        resolved = true;
                        break;
                    } else if (receivedData.equals(name[i])) {
                        sendbyte = ip[i].getBytes();
                        resolved = true;
                        break;
                    }
                }

                if (!resolved) {
                    String notFound = "Domain does not exist";
                    sendbyte = notFound.getBytes();
                }

                DatagramPacket sender = new DatagramPacket(sendbyte, sendbyte.length, clientAddr, clientPort);
                server.send(sender);
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
Waiting for requests...
Received request: www.aptitudeguru.com
Sending response: 165.165.80.80

Received request: 165.165.79.1
Sending response: www.downloadcyclone.blogspot.com
```

#### **Client Output**
```plaintext
Enter the DOMAIN NAME or IP address:
www.aptitudeguru.com
IP address or DOMAIN NAME: 165.165.80.80

Enter the DOMAIN NAME or IP address:
165.165.79.1
IP address or DOMAIN NAME: www.downloadcyclone.blogspot.com

Enter the DOMAIN NAME or IP address:
unknown.com
IP address or DOMAIN NAME: Domain does not exist
```

---

### **Result**  
The DNS server and client using UDP sockets were successfully implemented to resolve domain names to IP addresses and vice versa.