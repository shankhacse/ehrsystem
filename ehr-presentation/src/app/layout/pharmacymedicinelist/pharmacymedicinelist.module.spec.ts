import { PharmacymedicinelistModule } from "./pharmacymedicinelist.module";



describe('PharmacymedicinelistModule', () => {
  let pharmacymedicinelistModule : PharmacymedicinelistModule;

  beforeEach(() => {
    pharmacymedicinelistModule = new PharmacymedicinelistModule();
  });

  it('should create an instance', () => {
    expect(pharmacymedicinelistModule).toBeTruthy();
  });
});
