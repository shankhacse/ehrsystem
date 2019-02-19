import { DivisionlistModule } from "./divisionlist.module";


describe('DivisionlistModule', () => {
  let divisionlist: DivisionlistModule;

  beforeEach(() => {
    divisionlist = new DivisionlistModule();
  });

  it('should create an instance', () => {
    expect(DivisionlistModule).toBeTruthy();
  });
});
