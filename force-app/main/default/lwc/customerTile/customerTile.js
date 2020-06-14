import { LightningElement, api, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

export default class CustomerTile extends LightningElement {

    @api customer;
    @api customerSelected;
    @wire(CurrentPageReference) pageRef;
    

    handleViewCustomer(event){
        event.preventDefault();   
        
        console.log('datossss1 ' +  this.customer.Id); 
        const customerEdited = new CustomEvent('editcustomer', {detail: this.customer.Id});
        this.dispatchEvent(customerEdited);  
        fireEvent(this.pageRef, 'editcustomer', this.customer);
    }

    get isContactSelected(){

        console.log('datossss ' +  this.customerSelected);
        if(this.customerSelected === this.customer.Id){

            return 'tile selected';
        }

        return 'tile';

    }


}

