public with sharing class OrderEmail {
  @AuraEnabled
  public static void sendOrderEmail(
    List<OrderItem> orderItem,
    String name,
    String phoneNumber,
    String address
  ) {
    try {
      String emailBody = 'Order Details:\n';
      for (OrderItem item : orderItems) {
        emailBody += 'Item: ' + item.name + ',Quantity' + item.quantity + '\n';
      }
      emailBody +=
        'Name: ' +
        name +
        '\nPhone Number: ' +
        phoneNumber +
        '\nAddress:' +
        address;

      Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
      String[] toAddress = new List<String>{ 'aakashk2540@gmail.com' };

      mail.setToAddresses(toAddress);
      mail.setSubject('Order Details');
      mail.setPlainTextBody(emailBody);
      Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{ mail });
    } catch (Exception e) {
      throw new AuraHandledException(
        'Failed to send order email',
        e.getMessage()
      );
    }
  }

  @AuraEnabled
  public static void insertOrderData(
    List<OrderItem> orderItem,
    String name,
    String phoneNumber,
    String address
  ) {
    try {
      List<Order__c> Order = new List<Order__c>();
      for (OrderItem item : orderItem) {
        Order__c newOrder = new Order__c(
          Name__c = name,
          Phone_Number__c = phoneNumber,
          Address__c = address,
          Item_Name__c = item.name,
          Quantity__c = item.quantity
        );
        Order.add(newOrder);
      }
      insert Order;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }




  public class OrderItem {
    @AuraEnabled
    public String name { get; set; }
    @AuraEnabled
    public Integer quantity { get; set; }
  }
}
