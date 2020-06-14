import { LightningElement, wire, track } from 'lwc';
import getAdujstments from '@salesforce/apex/RestMockApi.getAdujstments';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class AdjustmentView extends LightningElement {

    @track adjustmentPre;
    @track customer;
    customerSelected= false;
    @track adjustment;



    val = 1500;
    @track value;


    @wire(CurrentPageReference) pageRef;

    @wire(getAdujstments) 
    wiredAdjustments({data, error}){
        if(data){

            this.adjustmentPre=data;
        

        }else if(error){
           this.showToast('ERROR', error.body.message, 'error');
        } 
    }

    connectedCallback(){

        registerListener('editcustomer', this.callBackMethod, this);
        
    }


    callBackMethod(payload){
        this.customer= payload;
        if(this.customer){
            this.customerSelected= true;
            this.showToast('SUCCESS', 'Customer cargado', 'success');
            console.log('customerid ---> ' + this.customer.Id);
            for (const i of this.adjustmentPre) {
                if(i.accountId__c===this.customer.Id){
                    this.adjustment=i;
                    break;
                }
            }
            console.log('despues adjust--> ' + this.adjustment);
        }
    }


    get options() {
        return [
            { label: 'CLOSED', value: 'CLOSED' },
            { label: 'IN_PROGRESS', value: 'IN_PROGRESS' },
            { label: 'PENDING_ACCEPTED', value: 'PENDING_ACCEPTED' },
        ];
    }



    showToast(title, message, variant){
        const evt= new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,

        });
        this.dispatchEvent(evt);

    }


    handleChange(event) {
        this.value = event.detail.value;
    }

    handleSliderChange(event){
        if(event.target.value < 1000){

            this.value='CLOSED';

        }else{

            this.value='IN_PROGRESS';

        }


    }

}