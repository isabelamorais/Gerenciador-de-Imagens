import { Component } from '@angular/core';
import { FotoComponent } from '../foto/foto.component';
import { Http, Headers } from '@angular/http';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'cadastro',
    templateUrl: './cadastro.component.html'
})
export class CadastroComponent {

    foto: FotoComponent = new FotoComponent();
    http: Http;
    meuForm: FormGroup;

    constructor(http: Http, fb: FormBuilder){
        this.http = http;
        this.meuForm = fb.group({ //cria um grupo de validação
            titulo: ['', Validators.compose(
                [Validators.required, Validators.minLength(4)]
            )],
            url: ['', Validators.required],
            descricao: [''] //é obrigatório colocar a descrição mesmo que ela não tenha validação
        });
    }

    cadastrar(event) {
        event.preventDefault();
        let headers = new Headers();
        headers.append('Content-Type','application/json');
        this.http.post('v1/fotos', JSON.stringify(this.foto), {headers: headers}) //garante que o objeto está no formato texto
                 .subscribe(()=>{
                     this.foto = new FotoComponent(); //apaga os dados da view
                     console.log("Foto salva com sucesso");
                 }, erro => console.log(erro)); 
    }
}