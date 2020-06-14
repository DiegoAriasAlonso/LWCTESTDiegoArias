import { LightningElement, wire, track } from 'lwc';
import getAccs from '@salesforce/apex/RestMockApi.getAccs';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';



export default class CustomerParenTile extends LightningElement {


    @track customer;
    @track customerFound= false;
    @track selectedCustomer;



    @wire(getAccs) 
    wiredAccs({data, error}){
        if(data){
            this.customer=data;
            this.customerFound= true;

        }else if(error){
           this.showToast('ERROR', error.body.message, 'error');
        } 
    }


    handleSelection(event){

        this.selectedCustomer=event.detail; 
    }


    showToast(title, message, variant){
        const evt= new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,

        });
        this.dispatchEvent(evt);

    }



}