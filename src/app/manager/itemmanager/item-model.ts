export class Item {
  testStem: string;
  testType: string;
  choice: string;
  bresult: Array<string>;
  // cpaOptionDtos: Array<CpaOption> 这种方式也可以成为泛型
  cpaOptionDtos: CpaOption[];

  constructor() {
    // this.cpaOptionDtos.push(new CpaOption());
    this.cpaOptionDtos =  [new CpaOption(),new CpaOption(),new CpaOption(),new CpaOption()];
  }
}

export class CpaOption {
  selectData: string;
  optionData: string;
}

