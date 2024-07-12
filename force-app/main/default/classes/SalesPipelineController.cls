// SalesPipelineController.cls
public with sharing class SalesPipelineController {
    public List<SelectOption> getLeadStatusOptions() {
        List<SelectOption> options = new List<SelectOption>();
        options.add(new SelectOption('Prospecting', 'Prospecting'));
        options.add(new SelectOption('Initial Contact', 'Initial Contact'));
        options.add(new SelectOption('Qualification', 'Qualification'));
        options.add(new SelectOption('Proposal/Quote', 'Proposal/Quote'));
        options.add(new SelectOption('Negotiation', 'Negotiation'));
        options.add(new SelectOption('Closing', 'Closing'));
        options.add(new SelectOption('Follow-up', 'Follow-up'));
        return options;
    }

    public PageReference saveLeadStatus() {
        try {
            update (List<Lead__c>)ApexPages.StandardController.getRecords();
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.INFO, 'Lead status updated successfully.'));
        } catch (Exception e) {
            ApexPages.addMessage(new ApexPages.Message(ApexPages.Severity.ERROR, 'Error updating lead status: ' + e.getMessage()));
        }
        return null;
    }
}
