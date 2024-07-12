public with sharing class LeadExtension {
    private ApexPages.StandardController stdController;
    public lead__c lead { get; set; }

    public LeadExtension(ApexPages.StandardController controller) {
        stdController = controller;
        lead = (lead__c)stdController.getRecord();
    }

    public PageReference saveLead() {
        try {
            // Perform any additional validation or processing here
            // Save the lead record
            stdController.save();
            // Redirect the user to the lead detail page after saving
            return new PageReference('/' + lead.Id);
        } catch (Exception e) {
            // Handle any exceptions
            ApexPages.addMessages(e);
            return null;
        }
    }
}
