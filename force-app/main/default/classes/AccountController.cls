public with sharing class AccountController {
    @AuraEnabled(cacheable=true)
    public static List<IndustryCount> getAccountIndustryData() {
        List<IndustryCount> result = new List<IndustryCount>();
        List<AggregateResult> groupedResults = [
            SELECT Industry, COUNT(Id) cnt
            FROM Account
            WHERE Industry != null
            GROUP BY Industry
        ];

        for (AggregateResult ar : groupedResults) {
            result.add(new IndustryCount((String)ar.get('Industry'), (Integer)ar.get('cnt')));
        }

        return result;
    }

    public class IndustryCount {
        @AuraEnabled public String Industry { get; set; }
        @AuraEnabled public Integer Count { get; set; }

        public IndustryCount(String industry, Integer count) {
            this.Industry = industry;
            this.Count = count;
        }
    }
}
