public with sharing class DashboardController {
    
    @AuraEnabled(cacheable=true)
    public static List<InventorySummary> getInventorySummary() {
        // Aggregate by Name field is not allowed. We will use a different field for aggregation.
        List<AggregateResult> results = [SELECT SUM(Quantity_Available__c) totalQuantity
                                         FROM inventory_Item__c];
        List<InventorySummary> inventoryData = new List<InventorySummary>();
        // Just one result since we are not grouping by Name
        for (AggregateResult ar : results) {
            inventoryData.add(new InventorySummary('Total Inventory', (Decimal)ar.get('totalQuantity')));
        }
        return inventoryData;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<OrderSummary> getOrderSummary() {
        List<AggregateResult> results = [SELECT Status__c, COUNT(Id) orderCount
                                         FROM Order__c
                                         GROUP BY Status__c];
        List<OrderSummary> orderData = new List<OrderSummary>();
        for (AggregateResult ar : results) {
            orderData.add(new OrderSummary((String)ar.get('Status__c'), (Integer)ar.get('orderCount')));
        }
        return orderData;
    }
    
    public class InventorySummary {
        @AuraEnabled public String name { get; set; }
        @AuraEnabled public Decimal totalQuantity { get; set; }

        public InventorySummary(String name, Decimal totalQuantity) {
            this.name = name;
            this.totalQuantity = totalQuantity;
        }
    }

    public class OrderSummary {
        @AuraEnabled public String status { get; set; }
        @AuraEnabled public Integer orderCount { get; set; }

        public OrderSummary(String status, Integer orderCount) {
            this.status = status;
            this.orderCount = orderCount;
        }
    }
}
