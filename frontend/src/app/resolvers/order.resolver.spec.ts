import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';

import { OrderResolver } from './order.resolver';

describe('OrderResolver', () => {
  let resolver: OrderResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrderResolver);
  });

  //it('should be created', () => {
   // expect(resolver).toBeTruthy();
 // });
});
