import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from '../../models/Client';
import { ClientService } from '../../services/client.service';
import { Router,ActivatedRoute,Params} from '@angular/router';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance: boolean = false;
  showBalanceUpdateInput: boolean=false;
  
  constructor(
    private clientService:ClientService,
    private router:Router,
    private route:ActivatedRoute,
    private flashMessage: FlashMessagesService
  
  ) { }

  ngOnInit() {
    // get id from url
    this.id = this.route.snapshot.params['id'];
    // get client
    this.clientService.getClient(this.id).subscribe(client=>{
      
      this.client = client;
      //  console.log(client);
    });
  }


  onSubmit({value,valid}:{value: Client,valid:boolean}){
    // console.log('value--');
    // console.log(value);
    // console.log(this.id);
    if(!valid){
      this.flashMessage.show('Please fill out the form correctly',{
        cssClass:'alert-danger',timeout:3000
      });
    }else{
      // add Id
      value.id=this.id;
      //update client
      this.clientService.updateClient(value);
      this.flashMessage.show('Client updated',{
        cssClass:'alert-success',timeout:3000
      });
      this.router.navigate(['/client/'+this.id]);
    }
  }
}
