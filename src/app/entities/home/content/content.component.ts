import { Component, OnInit } from '@angular/core';

interface Car {
  value: string;
  viewValue: string;
}

interface Transport {
  value: string;
  viewValue: string;
}

interface Region {
  value: string;
  viewValue: string;
}

interface Country {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {

  selectedCar: string;
  selectedTransport: string;
  selectedCountry: string;
  selectedRegion: string;

  cars: Car[] = [
    {value: 'volvo', viewValue: 'Volvo'},
    {value: 'bmw', viewValue: 'BMW'},
    {value: 'mercedes', viewValue: 'Mercedes'},
    {value: 'audi', viewValue: 'Audi'},
    {value: 'chevrolet', viewValue: 'Chevrolet'},
    {value: 'ford', viewValue: 'Ford'},
    {value: 'mazda', viewValue: 'Mazda'},
    {value: 'toyota', viewValue: 'Toyota'},
    {value: 'ваз', viewValue: 'ВАЗ'}
  ];
  countrys: Country[] = [
    {value: 'Австрия', viewValue: 'Австрия'},
    {value: 'Англия', viewValue: 'Англия'},
    {value: 'Аргентина', viewValue: 'Аргентина'},
    {value: 'Беларусь', viewValue: 'Беларусь'},
    {value: 'Бельгия', viewValue: 'Бельгия'},
    {value: 'Болгария', viewValue: 'Болгария'},
    {value: 'Бразилия', viewValue: 'Бразилия'},
    {value: 'Венгрия', viewValue: 'Венгрия'},
    {value: 'Германия', viewValue: 'Германия'},
    {value: 'Корея', viewValue: 'Корея'},
    {value: 'Чехия', viewValue: 'Чехия'},
    {value: 'Украина', viewValue: 'Украина'},
    {value: 'Франция', viewValue: 'Франция'},
    {value: 'США', viewValue: 'США'},
    {value: 'Италия', viewValue: 'Италия'},
    {value: 'Швеция', viewValue: 'Швеция'},
    {value: 'Китай', viewValue: 'Китай'},
    {value: 'Япония', viewValue: 'Япония'},
  ];
  transports: Transport[] = [
    {value: 'легковые', viewValue: 'Легковые'},
    {value: 'мото', viewValue: 'Мото'},
    {value: 'грузовики', viewValue: 'Грузовики'},
    {value: 'прицепы', viewValue: 'Прицепы'},
    {value: 'спецтехника', viewValue: 'Спецтехника'},
    {value: 'сельхозтехника', viewValue: 'Сельхозтехника'},
    {value: 'автобусы', viewValue: 'Автобусы'},
    {value: 'водный транспорт', viewValue: 'Водный транспорт'},
    {value: 'воздушный транспорт', viewValue: 'Воздушный транспорт'},
    {value: 'автодома', viewValue: 'Автодома'}
  ];

  regions: Region[] = [
    {value: 'Киев', viewValue: 'Киев'},
    {value: 'Винница', viewValue: 'Винница'},
    {value: 'Днепр', viewValue: 'Днепр (Днепропетровск)'},
    {value: 'Донецкая обл.', viewValue: 'Донецкая обл.'},
    {value: 'Житомир', viewValue: 'Житомир'},
    {value: 'Запорожье', viewValue: 'Запорожье'},
    {value: 'Ивано-Франковск', viewValue: 'Ивано-Франковск'},
    {value: 'Кропивницкий', viewValue: 'Кропивницкий (Кировоград)'},
    {value: 'Луганская обл.', viewValue: 'Луганская обл.'},
    {value: 'Луцк', viewValue: 'Луцк'},
    {value: 'Львов', viewValue: 'Львов'},
    {value: 'Николаев', viewValue: 'Николаев'},
    {value: 'Одесса', viewValue: 'Одесса'},
    {value: 'Полтава', viewValue: 'Полтава'},
    {value: 'Ровно', viewValue: 'Ровно'},
    {value: 'Сумы', viewValue: 'Сумы'},
    {value: 'Тернополь', viewValue: 'Тернополь'},
    {value: 'Ужгород', viewValue: 'Ужгород'},
    {value: 'Харьков', viewValue: 'Харьков'},
    {value: 'Херсон', viewValue: 'Херсон'},
    {value: 'Хмельницкий', viewValue: 'Хмельницкий'},
    {value: 'Черкассы', viewValue: 'Черкассы'},
    {value: 'Чернигов', viewValue: 'Чернигов'},
    {value: 'Черновцы', viewValue: 'Черновцы'}
  ];

}
