export class Item {
  id: number;
  testStem: string;
  testType: string;
  choice: string;
  insertDate: string;

  // cpaOptionDtos: Array<CpaOption> 这种方式也可以成为泛型
  // cpaOptionDtos: CpaOption[];

  constructor() {

  }
}

export class CpaOption {
  selectData: string;
  optionData: string;

  constructor() {

  }
}

export class CpaSolution {
  result: string;

  constructor() {

  }
}
