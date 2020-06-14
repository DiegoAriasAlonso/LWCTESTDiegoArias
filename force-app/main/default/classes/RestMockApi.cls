global class RestMockApi{



    @AuraEnabled(cacheable=true)
    public static List<Account> getAccs() {
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('[{"Name":"Fernando Suarez","id":"01","accountStatus__c":"enabled","iban__c":"ES4700759339324669344918"},{"Name":"Steve Sanchez","id":"02","accountStatus__c":"enabled","iban__c":"ES4700759339324669344932"}]');
        response.setStatusCode(200);

        List<Account> results = (List<Account>)JSON.deserialize(response.getBody(), List<Account>.class);

        return results;

     }



     @AuraEnabled(cacheable=true)
     public static List<Adjustment__c> getAdujstments(){
         
        HttpResponse response = new HttpResponse();
        response.setHeader('Content-Type', 'application/json');
        response.setBody('[{"Name":"Fernando Suarez","accountId__c":"01","amountValue__c":"850","currencyCode__c":"EUR","adjustmentStatus__c":"IN_PROGRESS"},{"Name":"Steve Sanchez","accountId__c":"02","amountValue__c":"1500","currencyCode__c": "EUR","adjustmentStatus__c":"IN_PROGRESS"}]');
        response.setStatusCode(200);

        List<Adjustment__c> results = (List<Adjustment__c>)JSON.deserialize(response.getBody(), List<Adjustment__c>.class);


        return results;


     }





}










