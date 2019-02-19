import { IpdlistModule } from "./ipdlist.module";

describe('IpdlistModule', () => {
  let ipdlistModule : IpdlistModule;

  beforeEach(() => {
    ipdlistModule = new IpdlistModule();
  });

  it('should create an instance', () => {
    expect(ipdlistModule).toBeTruthy();
  });
});
