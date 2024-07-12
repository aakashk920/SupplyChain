trigger OrderTrigger on Order__c (after update) {
    List<Order__c> deliveredOrders = new List<Order__c>();
    
    // Collect delivered orders
    for (Order__c updatedOrder : Trigger.new) {
        Order__c oldOrder = Trigger.oldMap.get(updatedOrder.Id);
        if (updatedOrder.Status__c == 'Shipped' && oldOrder.Status__c != 'Shipped') {
            deliveredOrders.add(updatedOrder);
        }
    }
    
    if (!deliveredOrders.isEmpty()) {
        // Call method to generate invoice PDF and send email
        OrderTriggerHandler.generateInvoiceAndSendEmail(deliveredOrders);
    }
}