import { Test, TestingModule } from '@nestjs/testing';
import { WalletResourceService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletResourceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletResourceService],
    }).compile();

    service = module.get<WalletResourceService>(WalletResourceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
